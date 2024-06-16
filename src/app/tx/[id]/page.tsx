import ClientPage from './components/ClientPage';
import { NextPage } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}
const Page: NextPage<PageProps> = ({ params }) => {
  return <ClientPage id={params?.id} />;
};
export default Page;
