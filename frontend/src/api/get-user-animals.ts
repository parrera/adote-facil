import { makeRequest } from '.';

export function getUserAnimals(token: string) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/animals/user`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}
