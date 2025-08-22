import * as S from './UpdateUserInfoForm.styles';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '../PasswordInput';
import { getCookie } from 'cookies-next';
import { updateUser } from '@/api/update-user';

const updateUserInfoFormSchema = z
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
      .optional()
      .refine(val => !val || val.length >= 8, {
        message: 'A senha deve conter no mínimo 8 caracteres',
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine(val => !val || val.length >= 8, {
        message: 'A confirmação da senha deve conter no mínimo 8 caracteres',
      }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type UpdateUserInfoFormData = z.infer<typeof updateUserInfoFormSchema>;

export function UpdateUserInfoForm() {
  const [displayPasswordFields, setDisplayPasswordFields] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserInfoFormData>({
    resolver: zodResolver(updateUserInfoFormSchema),
    defaultValues: {
      password: undefined,
      confirmPassword: undefined,
    },
  });

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      setValue('name', parsedUser.name);
      setValue('email', parsedUser.email);
    }
  }, [setValue]);

  const onSubmit = async (data: UpdateUserInfoFormData) => {
    try {
      const token = getCookie('token');

      console.log({ data });

      const response = await updateUser(data, token);

      if (response.status === 200) {
        alert('Dados editados com sucesso!');
      } else {
        alert(response.data.message || 'Ocorreu um erro ao editar os dados.');
      }

      window.location.reload();
    } catch (err) {
      const error = err as Error;
      console.error('Erro na edição de dados do usuário:', error);
      alert(error.message || 'Ocorreu um erro ao editar os dados.');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.FormContent>
        <S.FormRow>
          <S.InputWrapper>
            <label>
              <S.InputLabel $hasError={!!errors.name}>
                <span>Nome</span>
                {errors.name && <span>{errors.name.message}</span>}
              </S.InputLabel>

              <input type="text" {...register('name')} />
            </label>
          </S.InputWrapper>
        </S.FormRow>

        <S.FormRow>
          <S.InputWrapper>
            <label>
              <S.InputLabel $hasError={!!errors.email}>
                <span>Email</span>
                {errors.email && <span>{errors.email.message}</span>}
              </S.InputLabel>

              <input type="text" {...register('email')} />
            </label>
          </S.InputWrapper>
        </S.FormRow>

        <S.FormRow>
          <Button
            buttonStyle="green-outlined"
            type="button"
            onClick={() => setDisplayPasswordFields(!displayPasswordFields)}
          >
            {displayPasswordFields ? 'Cancelar' : 'Alterar senha'}
          </Button>
        </S.FormRow>

        {displayPasswordFields && (
          <>
            <S.FormRow>
              <S.InputWrapper>
                <label>
                  <S.InputLabel $hasError={!!errors.password}>
                    <span>Nova Senha</span>
                    {errors.password && <span>{errors.password.message}</span>}
                  </S.InputLabel>

                  <PasswordInput zodRegister={register} fieldName="password" />
                </label>
              </S.InputWrapper>
            </S.FormRow>

            <S.FormRow>
              <S.InputWrapper>
                <label>
                  <S.InputLabel $hasError={!!errors.confirmPassword}>
                    <span>Confirmar nova senha</span>
                    {errors.confirmPassword && (
                      <span>{errors.confirmPassword.message}</span>
                    )}
                  </S.InputLabel>

                  <PasswordInput
                    zodRegister={register}
                    fieldName="confirmPassword"
                  />
                </label>
              </S.InputWrapper>
            </S.FormRow>
          </>
        )}
      </S.FormContent>

      <S.FormButtonWrapper>
        <Button type="submit">Salvar alterações</Button>
      </S.FormButtonWrapper>
    </S.Form>
  );
}
