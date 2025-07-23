import { animalTypesForSelect } from '@/constants/animal-types-for-select'
import { DefaultSelect } from '../DefaultSelect'
import * as S from './AnimalFilterForm.styles'
import { animalGenderForSelect } from '@/constants/animal-gender-for-select'
import { z } from 'zod'

import { Button } from '../Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimalTypeEnum } from '@/enums/animal-type'
import { AnimalGenderEnum } from '@/enums/animal-gender'

const animalFilterFormSchema = z.object({
  name: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  type: z.nativeEnum(AnimalTypeEnum).optional(),
  gender: z.nativeEnum(AnimalGenderEnum).optional(),
  race: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

export type AnimalFilterFormData = z.infer<typeof animalFilterFormSchema>

interface AnimalFilterFormProps {
  handleFilterAvailableAnimals: (data: AnimalFilterFormData) => void
  closeDialog?: () => void
}

export function AnimalFilterForm({
  handleFilterAvailableAnimals,
  closeDialog,
}: AnimalFilterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AnimalFilterFormData>({
    resolver: zodResolver(animalFilterFormSchema),
  })

  const onSubmit = async (data: AnimalFilterFormData) => {
    if (data.name || data.type || data.gender || data.race) {
      handleFilterAvailableAnimals(data)
      if (closeDialog) closeDialog()
    }
  }

  return (
    <>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormContent>
          <S.FormRow>
            <S.AnimalNameInputWrapper>
              <label>
                <S.InputLabel $hasError={!!errors.name}>
                  <span>Nome</span>
                  {errors.name && <span>{errors.name.message}</span>}
                </S.InputLabel>

                <input type="text" {...register('name')} />
              </label>
            </S.AnimalNameInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalTypeInputWrapper>
              <S.InputLabel $hasError={!!errors.type}>
                <span>Tipo</span>
                {errors.type && <span>{errors.type.message}</span>}
              </S.InputLabel>

              <DefaultSelect
                placeholder="Selecione um tipo"
                items={animalTypesForSelect}
                {...register('type')}
                onValueChange={(value) =>
                  setValue('type', value as AnimalTypeEnum)
                }
              />
            </S.AnimalTypeInputWrapper>
          </S.FormRow>

          <S.FormRow>
            <S.AnimalGenderInputWrapper>
              <S.InputLabel $hasError={!!errors.gender}>
                <span>Gênero</span>
                {errors.gender && <span>{errors.gender.message}</span>}
              </S.InputLabel>

              <DefaultSelect
                placeholder="Selecione um gênero"
                items={animalGenderForSelect}
                {...register('gender')}
                onValueChange={(value) =>
                  setValue('gender', value as AnimalGenderEnum)
                }
              />
            </S.AnimalGenderInputWrapper>

            <S.AnimalRaceInputWrapper>
              <label>
                Raça
                <input type="text" {...register('race')} />
              </label>
            </S.AnimalRaceInputWrapper>
          </S.FormRow>
        </S.FormContent>

        <S.FormButton>
          <Button type="submit">Filtrar</Button>
        </S.FormButton>
      </S.Form>
    </>
  )
}
