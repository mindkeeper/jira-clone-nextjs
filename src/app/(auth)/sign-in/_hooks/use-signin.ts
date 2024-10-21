import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/server/rpc';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<(typeof client.api.auth)['sign-in']['$post']>;
type RequestType = InferRequestType<(typeof client.api.auth)['sign-in']['$post']>['json'];

export const useSignin = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.auth['sign-in'].$post({ json: data });
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Sign in success, Welcome back!');
      queryClient.invalidateQueries({
        queryKey: ['current-session'],
      });
      router.push('/');
    },
  });
};
