import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { router } from './routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

// Health endpoint para checks de container/orquestrador
app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'ok' })
})

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
