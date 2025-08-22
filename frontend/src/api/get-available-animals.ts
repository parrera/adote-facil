import { makeRequest } from '.';

export function getAvailableAnimals(token: string) {
  return makeRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}/animals/available`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}
