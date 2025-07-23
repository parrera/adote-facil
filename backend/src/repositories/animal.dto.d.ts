import { Animal } from '@prisma/client'

export namespace CreateAnimalRepositoryDTO {
  export type Params = {
    name: string
    type: string
    gender: 'Macho' | 'Fêmea'
    race?: string
    description?: string
    userId: string
  }

  export type Result = Animal
}

export namespace UpdateAnimalStatusRepositoryDTO {
  export type Params = {
    id: string
    status: AnimalStatus
    userId: string
  }

  export type Result = Animal | null
}
