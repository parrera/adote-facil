import { UserLoginFormData } from '@/app/login/page';
import { makeRequest } from '.';

export function userLogin(data: UserLoginFormData) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
    method: 'POST',
    data,
  });
}
