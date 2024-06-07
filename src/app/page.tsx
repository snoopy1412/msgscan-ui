'use client';
import { Separator } from '@/components/ui/separator';

import StatsContainer from '@/components/StatsContainer';
import { useQuery } from '@tanstack/react-query';
import { fetchMessages, fetchMessagesInfos } from '@/graphql/services';
import { MessagesQueryVariables } from '@/graphql/type';

import DataTable from './components/Table';

function useMessages(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messages', variables],
    queryFn: async () => fetchMessages(variables)
  });
}

function useMessagesInfos(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messagesInfos', variables],
    queryFn: async () => fetchMessagesInfos(variables)
  });
}

export default function TaskPage() {
  const { data, status, error, isFetching } = useMessages();

  const { data: messagesInfos } = useMessagesInfos();

  console.log('messagesInfos', messagesInfos);

  return (
    <>
      <StatsContainer />
      <Separator />
      <DataTable loading={isFetching} dataSource={data?.messages?.items || []} />
    </>
  );
}
