import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof client.api.auth)['sign-out']['$post']>;

export const useSignout = () => {
  const queryClient = useQueryClient();
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
    },
  });
};
