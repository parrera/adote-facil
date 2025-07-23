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
import { userLogin } from '@/api/user-login'

import { setCookie } from 'cookies-next'

const userLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O email é obrigatório' })
    .email('Email inválido'),
  password: z
    .string()
    .min(1, { message: 'A senha é obrigatória' })
    .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
})

export type UserLoginFormData = z.infer<typeof userLoginFormSchema>

export default function Page() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginFormSchema),
  })

  const handleSubmitForm = async (data: UserLoginFormData) => {
    const response = await userLogin(data)

    if (response.status !== 201) {
      const message =
        response.data.message ||
        'Erro ao logar, por favor tente novamente mais tarde!'
      alert(message)
      router.push('/login')
      return
    }

    setCookie('token', response.data.token, {
      httpOnly: false,
      // TODO em um ambiente de produção isso deve ser true
      secure: false,
      path: '/',
    })

    localStorage.setItem('user', JSON.stringify(response.data.user))

    router.push('/area_logada/animais_disponiveis')
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
        <S.LoginForm onSubmit={handleSubmit(handleSubmitForm)}>
          <h1>Faça login em nossa plataforma</h1>
          <S.LoginFormInputsWrapper>
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
          </S.LoginFormInputsWrapper>

          <S.LoginFormButtonWrapper>
            <Button type="submit">Login</Button>
          </S.LoginFormButtonWrapper>
        </S.LoginForm>
        <S.LoginFormFooter>
          <span>
            Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a>
          </span>
        </S.LoginFormFooter>
      </S.Content>
    </S.Wrapper>
  )
}
