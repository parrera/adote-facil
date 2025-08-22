import { AnimalImage } from '@prisma/client';

export namespace CreateAnimalImageRepositoryDTO {
  export type Params = {
    imageData: Buffer;
    animalId: string;
  };

  export type Result = AnimalImage;
}
