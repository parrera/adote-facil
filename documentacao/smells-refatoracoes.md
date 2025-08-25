*Trecho original:*
typescript
export namespace CreateAnimalDTO {
  export type Params = {
    name: string
    type: string
    gender: 'Macho' | 'Fêmea'
    race?: string
    description?: string
    userId: string
    pictures: Buffer[]
  }

  export type Failure = { message: string }

  export type Success = { animal: Animal }

  export type Result = Either<Failure, Success>
}


*Smell detectado:* Leaking Implementation Details / Over-engineering
Uso de namespace para tipos DTO, não é mais uma prática recomendada em projetos modernos TypeScript/ESM. Ele aumenta a complexidade e dificulta a manutenção

*Código refatorado:* Substituído por tipos e interfaces exportados individualmente, eliminando o uso de namespace
typescript
export type CreateAnimalParams = {
  name: string
  type: string
  gender: 'Macho' | 'Fêmea'
  race?: string
  description?: string
  userId: string
  pictures: Buffer[]
}

export type CreateAnimalFailure = { message: string }
export type CreateAnimalSuccess = { animal: Animal }
export type CreateAnimalResult = Either<CreateAnimalFailure, CreateAnimalSuccess>


---

## 2. Refatoração no UserLoginService

*Trecho original:*
typescript
export namespace UserLoginDTO {
  export type Params = { email: string; password: string }
  export type Failure = { message: string }
  export type Success = {
    user: { id: string; email: string; name: string }
    token: string
  }
  export type Result = Either<Failure, Success>
}


*Smell identificado:* Uso de namespace para DTO, prejudicando clareza

*Código refatorado:*
typescript
export type UserLoginParams = { email: string; password: string }
export type UserLoginFailure = { message: string }
export type UserLoginSuccess = {
  user: { id: string; email: string; name: string }
  token: string
}
export type UserLoginResult = Either<UserLoginFailure, UserLoginSuccess>


---

## 3. Refatoração no app.ts

*Trecho original:*
typescript
import express, { NextFunction, Response, Request } from 'express'

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err)
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)


*Smell identificado:* Unused Parameter (Dead Code) 
Parâmetro next declarado mas não utilizado (no-unused-vars).

*Código refatorado:* Removido o parâmetro não utilizado para eliminar o aviso/lint error
typescript
import express, { Response, Request } from 'express'

app.use(
  (err: Error, request: Request, response: Response) => {
    console.error(err)
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)