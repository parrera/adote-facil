//server.ts
import { app } from './app.js';

const port = 8080;

app.listen(port, () => {
  console.info('server running on port', port);
});

// import { app } from './app.js'; // Com extensão explícita

// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);

//   // Debug: Mostra todas as rotas registradas
//   console.log('Rotas registradas:');
//   app._router.stack.forEach((layer: any) => {
//     if (layer.route) {
//       const path = layer.route.path;
//       const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
//       console.log(`${methods} ${path}`);
//     }
//   });
// });
