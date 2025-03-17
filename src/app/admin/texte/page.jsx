'use client';
import { useEffect } from "react";
import qz from "qz-tray"; // Importa o QZ Tray para impressão

export default function PrinterClient() {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080"); // Conecta ao back-end

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.action === "print") {
        console.log("Recebido pedido de impressão:", message.data);
        await printWithQZTray(message.data);
      }
    };

    return () => socket.close();
  }, []);

  async function printWithQZTray(text) {
    try {
      await qz.websocket.connect();
      const printer = await qz.printers.getDefault(); // Pegando a impressora padrão
      const config = qz.configs.create(printer);
      await qz.print(config, [text]);
      console.log("Impressão enviada!");
    } catch (err) {
      console.error("Erro ao imprimir:", err);
    }
  }

  return <h1>Cliente WebSocket para Impressão</h1>;
}

