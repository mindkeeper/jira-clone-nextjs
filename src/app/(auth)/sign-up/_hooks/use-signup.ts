import { client } from '@/lib/server/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type ResponseType = InferResponseType<(typeof client.api.auth)['sign-up']['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth)['sign-up']['$post']>['json'];

export const useSignup = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.auth['sign-up'].$post({ json: data });
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Sign up success, Welcome!');
      queryClient.invalidateQueries({
        queryKey: ['current-session'],
      });
      router.push('/');
    },
  });
};
