const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuração do CORS
app.use(
  cors({
    origin: "*", // Permitir todas as origens (você pode restringir a origem se necessário)
    methods: "GET, POST, PUT, DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type, Authorization, token", // Cabeçalhos permitidos
  })
);

// Configuração do body-parser
app.use(bodyParser.json());

// Definindo as rotas da API e passando o WebSocket para elas
app.use("/api", routes(wss));

wss.on("connection", (ws) => {
  console.log("Conectado ao WebSocket");

  ws.on("close", () => {
    console.log("Desconectado do WebSocket");
  });
});

// Iniciando o servidor WebSocket e o servidor HTTP
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
