import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof client.api.auth)['sign-up']['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth)['sign-up']['$post']>['json'];

export const useSignup = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.auth['sign-up'].$post({ json: data });
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      return await response.json();
    },
  });
};
