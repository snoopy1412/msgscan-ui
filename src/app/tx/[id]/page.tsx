import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ClientPage from './components/ClientPage';
import { fetchMessage } from '@/graphql/services';

interface PageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: PageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['message', params.id],
    queryFn: async () => fetchMessage(params.id)
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage id={params?.id} />
    </HydrationBoundary>
  );
}
