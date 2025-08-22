'use client';

import * as S from './MyAnimalsPage.styles';
import { AnimalCard } from '@/components/AnimalCard';
import { EmptyAnimals } from '@/components/EmptyAnimals';
import { useContext, useEffect } from 'react';
import { AnimalsContext } from '@/contexts/animals';
import { getCookie } from 'cookies-next';
import { getUserAnimals } from '@/api/get-user-animals';

export function MyAnimalsPage() {
  const { userAnimals, setUserAnimals } = useContext(AnimalsContext);

  useEffect(() => {
    const fetchAvailableAnimals = async () => {
      const token = getCookie('token');

      const response = await getUserAnimals(token || '');

      if (response.status === 200) {
        setUserAnimals(response.data.animals);
      }
    };

    fetchAvailableAnimals();
  }, [setUserAnimals]);

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Meus animais disponíveis para adoção</h1>
      </S.TitleWrapper>
      {userAnimals.length ? (
        <S.AnimalsListWrapper>
          {userAnimals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} listType="my-animals" />
          ))}
        </S.AnimalsListWrapper>
      ) : (
        <EmptyAnimals page="my-animals" />
      )}
    </S.Wrapper>
  );
}
