// src/index.ts
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('API Adote-Fácil rodando com sucesso!');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
export default app;