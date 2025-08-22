import { Animal } from '@/@types/animal';
import { createContext, ReactNode, useState } from 'react';

interface AnimalsContextType {
  availableAnimals: Animal[];
  setAvailableAnimals: (animals: Animal[]) => void;
  getAnimalById: (id: string) => Animal | null;
  userAnimals: Animal[];
  setUserAnimals: (animals: Animal[]) => void;
}

export const AnimalsContext = createContext({} as AnimalsContextType);

export function AnimalsContextProvider({ children }: { children: ReactNode }) {
  const [availableAnimals, setAvailableAnimals] = useState<Animal[]>([]);
  const [userAnimals, setUserAnimals] = useState<Animal[]>([]);

  const getAnimalById = (id: string) => {
    return availableAnimals.find(animal => animal.id === id) || null;
  };

  return (
    <AnimalsContext.Provider
      value={{
        availableAnimals,
        setAvailableAnimals,
        getAnimalById,
        userAnimals,
        setUserAnimals,
      }}
    >
      {children}
    </AnimalsContext.Provider>
  );
}
