'use client';

import * as S from './RegisterAnimalPage.styles';
import { AnimalRegisterForm } from '@/components/AnimalRegisterForm';

export function RegisterAnimalPage() {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Cadastrar animal para adoção</h1>
      </S.TitleWrapper>

      <AnimalRegisterForm />
    </S.Wrapper>
  );
}
