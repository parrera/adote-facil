import * as S from './AnimalCard.styles'
const Trash = () => <span>🗑️</span>;
const Link = ({ href, children }: { href: string; children: any }) => <a href={href}>{children}</a>;
const Image = (props: any) => <img {...props} />;
const getCookie = () => '';
const AnimalStatus = { ADOPTED: 'adopted', REMOVED: 'removed' };
const updateAnimalStatus = async () => ({ status: 200, data: {} });

interface AnimalCardProps {
  animal: {
    id: string
    name: string
    type: string
    gender: 'macho' | 'fêmea'
    race: string
    description: string
    images: Array<{
      id: string
      base64: string
    }>
  }
  listType: 'my-animals' | 'animals-available-to-adopt'
}

export function AnimalCard({ animal, listType }: AnimalCardProps) {
  const { id, name, type, gender, images } = animal;
  // Corrige acesso ao base64
  const animalImageBase64 = images[0]?.base64;

  const handleConfirmAnimalAdoption = async () => {
    try {
      const token = getCookie('token')

      const response = await updateAnimalStatus({
        animalId: id,
        data: { status: AnimalStatus.ADOPTED },
        token: token || '',
      })

      if (response.status === 200) {
        alert('Confirmada a adoção do animal!')
        window.location.href = '/area_logada/meus_animais'
      } else {
        alert(
          response.data.message ||
            'Ocorreu um erro ao confirmar a adoção do animal.',
        )
      }
    } catch (err) {
      const error = err as Error
      console.error('Erro na confirmação de adoção do animal:', error)
      alert(
        error.message || 'Ocorreu um erro na confirmação de adoção do animal.',
      )
    }
  }

  const handleRemoveAnimal = async () => {
    try {
      const token = getCookie('token')

      const response = await updateAnimalStatus({
        animalId: id,
        data: { status: AnimalStatus.REMOVED },
        token: token || '',
      })

      if (response.status === 200) {
        alert('Animal removido com sucesso!')
        window.location.href = '/area_logada/meus_animais'
      } else {
        alert(response.data.message || 'Ocorreu um erro ao remover o animal.')
      }
    } catch (err) {
      const error = err as Error
      console.error('Erro na remoção do animal:', error)
      alert(error.message || 'Ocorreu um erro na remoção do animal.')
    }
  }

  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <Image
          src={animalImageBase64 ? `data:image/jpeg;base64,${animalImageBase64}` : '/default-image.png'}
          alt="Animal"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </S.ImageWrapper>
      <S.Content>
        <S.AnimalInfo>
          <span>{name}</span>
          <span>
            {type} | {gender}
          </span>
        </S.AnimalInfo>
        {listType === 'my-animals' ? (
          <S.MyAnimalsButtonsWrapper>
            <button type="button" onClick={handleConfirmAnimalAdoption}>
              Confirmar adoção
            </button>
            <S.MyAnimalsButton
              $buttonType="delete"
              onClick={handleRemoveAnimal}
            >
              <Trash />
            </S.MyAnimalsButton>
          </S.MyAnimalsButtonsWrapper>
        ) : (
          <Link href={`/area_logada/animais_disponiveis/${id}`}>
            <button type="button">Saiba mais</button>
          </Link>
        )}
      </S.Content>
    </S.Wrapper>
  )
}
