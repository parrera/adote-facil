'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/PasswordInput'

import * as S from './styles'
import logo from '../../assets/logo-with-name.png'
import { registerUser } from '@/api/register-user'

const createUserFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'O nome é obrigatório' })
      .regex(/^[A-Za-z]+$/i, 'O nome deve conter apenas letras'),
    email: z
      .string()
      .min(1, { message: 'O email é obrigatório' })
      .email('Email inválido'),
    password: z
      .string()
      .min(1, { message: 'A senha é obrigatória' })
      .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'A confirmação da senha é obrigatória' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function Page() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const handleSubmitForm = async (data: CreateUserFormData) => {
    const response = await registerUser(data)

    if (response.status !== 201) {
      const message =
        response.data.message ||
        'Falha ao cadastrar! Por favor tente novamente!'
      alert(message)
      router.push('/cadastro')
      return
    }

    alert(
      'Cadastro efetuado com sucesso! Faça login para acessar nossa plataforma!',
    )
    router.push('/login')
  }

  return (
    <S.Wrapper>
      <S.Header>
        <Image src={logo} alt="Logo" width={145} height={42} />
      </S.Header>
      <S.Aside>
        <Image src={logo} alt="Logo" width={145} height={42} />
      </S.Aside>
      <S.Content>
        <S.RegisterForm onSubmit={handleSubmit(handleSubmitForm)}>
          <h1>Preencha seus dados para se cadastrar em nossa plataforma</h1>
          <S.RegisterFormInputsWrapper>
            <label>
              Nome
              <input type="text" {...register('name')} />
              {errors.name && <span>{errors.name.message}</span>}
            </label>
            <label>
              Email
              <input type="email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </label>
            <label>
              Senha
              <PasswordInput zodRegister={register} fieldName="password" />
              {errors.password && <span>{errors.password.message}</span>}
            </label>
            <label>
              Confirme a senha
              <PasswordInput
                zodRegister={register}
                fieldName="confirmPassword"
              />
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </label>
          </S.RegisterFormInputsWrapper>

          <S.RegisterFormButtonWrapper>
            <Button type="submit">Cadastrar</Button>
          </S.RegisterFormButtonWrapper>
        </S.RegisterForm>
        <S.RegisterFormFooter>
          <span>
            Já possui uma conta? <a href="/login">Faça login</a>
          </span>
        </S.RegisterFormFooter>
      </S.Content>
    </S.Wrapper>
  )
}
