const app = require('express')();

const PORT = process.env.PORT || 7300;

app.use((req, res) => {
  res.send({
    msg: 'Hello world',
    method: req.method,
    path: req.path
  });
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
})
