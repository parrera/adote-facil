'use client';

import * as S from './UpdateUserInfoPage.styles';
import { UpdateUserInfoForm } from '@/components/UpdateUserInfoForm';

export default function UpdateUserInfoPage() {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Editar dados pessoais</h1>
      </S.TitleWrapper>

      <UpdateUserInfoForm />
    </S.Wrapper>
  );
}
