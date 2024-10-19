import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<(typeof client.api.auth)['sign-in']['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth)['sign-in']['$post']>['json'];

export const useLogin = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.auth['sign-in'].$post({ json: data });
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      return await response.json();
    },
  });
};
