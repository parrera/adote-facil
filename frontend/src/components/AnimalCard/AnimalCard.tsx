import Image from 'next/image'
import { Trash } from '@phosphor-icons/react'
import { Button } from '@/components/Button'
import * as S from './AnimalCard.styles'

import Link from 'next/link'
import { AnimalStatus } from '@/enums/animal-status'
import { updateAnimalStatus } from '@/api/update-animal-status'
import { getCookie } from 'cookies-next'

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
  const { id, name, type, gender, images } = animal

  const animalImageBase64 = images[0]

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
          src={`data:image/jpeg;base64,${animalImageBase64}`}
          alt="Animal"
          fill={true}
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
            <Button type="button" onClick={handleConfirmAnimalAdoption}>
              Confirmar adoção
            </Button>
            <S.MyAnimalsButton
              type="button"
              $buttonType="delete"
              onClick={handleRemoveAnimal}
            >
              <Trash size={24} />
            </S.MyAnimalsButton>
          </S.MyAnimalsButtonsWrapper>
        ) : (
          <Link href={`/area_logada/animais_disponiveis/${id}`}>
            <Button>Saiba mais</Button>
          </Link>
        )}
      </S.Content>
    </S.Wrapper>
  )
}
