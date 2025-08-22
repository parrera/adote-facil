import { CreateUserFormData } from '@/app/cadastro/page';
import { makeRequest } from '.';

export async function registerUser(data: CreateUserFormData) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
    method: 'POST',
    data,
  });
}
