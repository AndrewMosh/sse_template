const express = require("express");
const app = express();

// Установка статической папки для доступа к файлам клиента
app.use(express.static("public"));

// Маршрут для открытия страницы клиента
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Маршрут для установки соединения SSE
app.get("/sse", (req, res) => {
  // Установка заголовков SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Отправка событий на клиент каждую секунду
  setInterval(() => {
    const data = {
      message: "Новое событие",
      timestamp: new Date().toLocaleTimeString(),
    };

    // Отправка события в формате SSE
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);
});

// Прослушивание порта 3000
app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
