import { SmileySad } from '@phosphor-icons/react';
import * as S from './EmptyAnimals.styles';

interface EmptyAnimalsProps {
  page: 'my-animals' | 'animals-available-to-adopt';
}

export function EmptyAnimals({ page }: EmptyAnimalsProps) {
  return (
    <S.Wrapper>
      {page === 'my-animals' ? (
        <>
          <SmileySad size={144} />
          <span>
            Você ainda não cadastrou nenhum animal para adoção. Clique{' '}
            <a href="/area_logada/disponibilizar_animal">aqui</a> para
            cadastrar.
          </span>
        </>
      ) : (
        <>
          <SmileySad size={144} />
          <span>
            Desculpe, no momento não temos nenhum animal disponível para adoção
          </span>
        </>
      )}
    </S.Wrapper>
  );
}
