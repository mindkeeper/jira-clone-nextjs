import { client } from '@/lib/server/rpc';
import { useQuery } from '@tanstack/react-query';

export const useCurrentSession = () =>
  useQuery({
    queryKey: ['current-session'],
    queryFn: async () => {
      const response = await client.api.auth.me.$get();
      if (!response.ok) {
        return null;
      }
      return await response.json();
    },
  });
