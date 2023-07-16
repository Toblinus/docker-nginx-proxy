import axios from 'axios';

const client = axios.create({
  baseURL: '/api/host/'
});


export type TRequestResponse = {
  msg: string,
  method: string,
  path: string,
}

type TMethod = 'post' | 'get' | 'put' | 'delete';

export const request = async (method: string, url: string): Promise<TRequestResponse> => {
  const response = await client[method as TMethod](url);
  return response.data as TRequestResponse;
}
