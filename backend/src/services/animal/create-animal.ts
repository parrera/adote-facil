import { Animal } from "@prisma/client";
import { Either, Failure, Success } from "../../utils/either.js";
import {
  AnimalRepository,
  animalRepositoryInstance,
} from "../../repositories/animal.js";
import {
  AnimalImageRepository,
  animalImageRepositoryInstance,
} from "../../repositories/animal-image.js";

export type CreateAnimalParams = {
  name: string;
  type: string;
  gender: "Macho" | "FÃªmea";
  race?: string;
  description?: string;
  userId: string;
  pictures: Buffer[];
};

export type CreateAnimalFailure = { message: string };

export type CreateAnimalSuccess = { animal: Animal };

export type CreateAnimalResult = Either<
  CreateAnimalFailure,
  CreateAnimalSuccess
>;

export class CreateAnimalService {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalImageRepository: AnimalImageRepository
  ) {}

  async execute(params: CreateAnimalParams): Promise<CreateAnimalResult> {
    const { name, type, gender, race, description, userId, pictures } = params;

    const animal = await this.animalRepository.create({
      name,
      type,
      gender,
      race,
      description,
      userId,
    });

    if (!animal) {
      return Failure.create({ message: "Erro ao criar o animal." });
    }

    await Promise.all(
      pictures.map((picture) =>
        this.animalImageRepository.create({
          animalId: animal.id,
          imageData: picture,
        })
      )
    );

    return Success.create({ animal });
  }
}

export const createAnimalServiceInstance = new CreateAnimalService(
  animalRepositoryInstance,
  animalImageRepositoryInstance
);
