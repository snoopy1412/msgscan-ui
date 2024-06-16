import { REFRESH_INTERVAL } from '@/config/site';
import { fetchMessage, fetchMessages, fetchMessagesInfos, fetchOrmpInfo } from '@/graphql/services';
import { MessagesQueryVariables } from '@/graphql/type';
import { MESSAGE_STATUS } from '@/types/message';
import { useQuery } from '@tanstack/react-query';

export function useMessages(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messages', variables],
    queryFn: async () => fetchMessages(variables),
    refetchInterval: REFRESH_INTERVAL,
    placeholderData(prevData) {
      const hasRealData = prevData?.messages?.items.some((item) => item.status !== -1);
      return hasRealData
        ? prevData
        : {
            messages: {
              items: Array.from({ length: variables.limit || 10 }).map((_, index) => ({
                id: index.toString(),
                protocol: 'eth',
                status: -1
              })),
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: undefined,
                endCursor: undefined
              }
            }
          };
    }
  });
}

export function useMessagesInfos(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messagesInfos', variables],
    queryFn: async () => fetchMessagesInfos(variables),
    refetchInterval: REFRESH_INTERVAL
  });
}
export function useMessage(id: string) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: async () => fetchMessage(id),
    refetchInterval(query) {
      const status = query?.state?.data?.message?.status;
      return status !== MESSAGE_STATUS.FAILED && status !== MESSAGE_STATUS.SUCCESS
        ? REFRESH_INTERVAL
        : undefined;
    }
  });
}

export function useOrmpInfo(id: string) {
  return useQuery({
    queryKey: ['ormpInfo', id],
    queryFn: async () => fetchOrmpInfo(id)
  });
}
