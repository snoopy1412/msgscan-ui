import { REFRESH_INTERVAL } from '@/config/site';
import {
  fetchMessage,
  fetchMessageFull,
  fetchMessageProgress,
  fetchOrmpMessageAccepted
} from '@/graphql/services';
import { MessageFullQueryParams } from '@/graphql/type';
import { MESSAGE_STATUS } from '@/types/message';
import { useQuery } from '@tanstack/react-query';

export function useMessageFull(variables: MessageFullQueryParams = {}) {
  return useQuery({
    queryKey: ['messageFull', variables],
    queryFn: async () => fetchMessageFull(variables),
    refetchInterval: REFRESH_INTERVAL,
    placeholderData(prevData) {
      const hasRealData = prevData?.MessageFull?.some((item) => item.status !== -1);
      return hasRealData
        ? prevData
        : {
            MessageFull: Array.from({ length: variables.limit || 10 }).map((_, index) => ({
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

export function useOrmpMessageAccepted(id: string) {
  return useQuery({
    queryKey: ['ormpMessageAccepted', id],
    queryFn: async () => fetchOrmpMessageAccepted(id),
    refetchInterval(query) {
      const info = query?.state?.data?.ORMP_MessageAccepted?.[0];

      return !info ? REFRESH_INTERVAL : undefined;
    }
  });
}
