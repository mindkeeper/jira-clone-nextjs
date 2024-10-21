import { client } from '@/lib/server/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';

type ResponseType = InferResponseType<(typeof client.api.auth)['sign-out']['$post']>;

export const useSignout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth['sign-out'].$post();
      if (!response.ok) {
        throw new Error('Failed to sign out');
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['current-session'],
      });
      router.push('/sign-in');
    },
  });
};
