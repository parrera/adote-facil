'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '@/components/Button';
import { AnimalCard } from '@/components/AnimalCard';
import { EmptyAnimals } from '@/components/EmptyAnimals';
import { DefaultDialog } from '@/components/DefaultDialog';

import * as S from './AvailableAnimalsPage.styles';
import { useContext, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { getAvailableAnimals } from '@/api/get-available-animals';
import { AnimalsContext } from '@/contexts/animals';

// TODO add loader to display while fetching animals
export function AvailableAnimalsPage() {
  const { availableAnimals, setAvailableAnimals } = useContext(AnimalsContext);

  useEffect(() => {
    const fetchAvailableAnimals = async () => {
      const token = getCookie('token');

      const response = await getAvailableAnimals(token || '');

      console.log(response);

      if (response.status === 200) {
        setAvailableAnimals(response.data.animals);
      }
    };

    fetchAvailableAnimals();
  }, [setAvailableAnimals]);

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Animais disponíveis para adoção</h1>
        {!!availableAnimals.length && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button>Filtrar</Button>
            </Dialog.Trigger>
            <DefaultDialog>
              <Dialog.Close asChild>
                {/* <button className="IconButton" aria-label="Close">
                    <h1>sadasdsa</h1>
                  </button> */}
              </Dialog.Close>
              {/* <AnimalForm location="modal" /> */}
            </DefaultDialog>
          </Dialog.Root>
        )}
      </S.TitleWrapper>
      {availableAnimals.length ? (
        <S.AnimalsListWrapper>
          {availableAnimals.map(animal => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              listType="animals-available-to-adopt"
            />
          ))}
        </S.AnimalsListWrapper>
      ) : (
        <EmptyAnimals page="animals-available-to-adopt" />
      )}
    </S.Wrapper>
  );
}
