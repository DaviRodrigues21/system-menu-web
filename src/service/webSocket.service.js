// const ws = new WebSocket("ws://SEU_BACKEND_IP:8080"); // Substitua pelo IP do servidor
const ws = new WebSocket("ws://localhost:8080");


ws.onopen = () => {
    console.log("Conectado ao WebSocket!");
};

ws.onerror = (error) => {
    console.error("Erro no WebSocket:", error);
};

function enviarPedidoParaImpressao(pedido, endereco) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ pedido, endereco }));
    } else if (ws.readyState === WebSocket.CONNECTING) {
        setTimeout(() => {
            enviarPedidoParaImpressao(pedido, endereco);
        }, 500); // Tenta novamente após 500ms
    } else {
        console.error("Erro: WebSocket não está conectado.");
    }
}


export default enviarPedidoParaImpressao