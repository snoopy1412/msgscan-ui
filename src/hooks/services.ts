import { REFRESH_INTERVAL } from '@/config/site';
import { fetchMessage, fetchMessagePort, fetchMessageProgress } from '@/graphql/services';
import { MessagePortQueryParams } from '@/graphql/type';
import { MESSAGE_STATUS } from '@/types/message';
import { useQuery } from '@tanstack/react-query';

export function useMessagePort(variables: MessagePortQueryParams = {}) {
  return useQuery({
    queryKey: ['messagePort', variables],
    queryFn: async () => fetchMessagePort(variables),
    refetchInterval: REFRESH_INTERVAL,
    placeholderData(prevData) {
      const hasRealData = prevData?.MessagePort?.some((item) => item.status !== -1);
      return hasRealData
        ? prevData
        : {
            MessagePort: Array.from({ length: variables.limit || 10 }).map((_, index) => ({
              id: index.toString(),
              protocol: 'eth',
              status: -1
            }))
          };
    }
  });
}

export function useMessage(id: string) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: async () => fetchMessage(id),
    refetchInterval(query) {
      const status = query?.state?.data?.status;
      return status !== MESSAGE_STATUS.FAILED && status !== MESSAGE_STATUS.SUCCESS
        ? REFRESH_INTERVAL
        : undefined;
    }
  });
}

export function useMessageProgress() {
  return useQuery({
    queryKey: ['messageProgress'],
    queryFn: async () => fetchMessageProgress(),
    refetchInterval: REFRESH_INTERVAL
  });
}
