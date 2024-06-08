import { MessagesInfo } from '@/graphql/type';
import { StatCard } from './StatCard';

interface StatsContainerProps {
  data?: MessagesInfo[];
}
const StatsContainer = ({ data }: StatsContainerProps) => {
  const totalMessageValue = data?.find((item) => item.id === 'total')?.value;
  const inflightMessageValue = data?.find((item) => item.id === 'totalInflight')?.value;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <StatCard title="Total Messages" value={totalMessageValue} percentageChange={20.1} />
      <StatCard title="Inflight Messages" value={inflightMessageValue} percentageChange={20.1} />
      <StatCard title="Networks" value={45231} percentageChange={20.1} />
      <StatCard title="Protocols" value={45231} percentageChange={20.1} />
    </div>
  );
};
export default StatsContainer;
