//app.ts
import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { router } from './routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err)
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)

export { app }





// import express, { NextFunction, Response, Request } from 'express';
// import cors from 'cors';
// import 'express-async-errors';
// import { router } from './routes.js'; // Remova a extensão .js

// const app = express();

// // Configurações básicas
// app.use(cors());
// app.use(express.json());

// // Adicione um endpoint de health check
// app.get('/api/health', (req: Request, res: Response) => {
//   res.status(200).json({ status: 'API funcionando' });
// });

// // Todas as rotas serão prefixadas com /api
// app.use('/api', router);

// // Error handler
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);
//   return res.status(500).json({
//     status: 'error',
//     message: `Internal server error - ${err.message}`,
//   });
// });

// export { app };
