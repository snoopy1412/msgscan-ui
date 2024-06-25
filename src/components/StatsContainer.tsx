import { MessageProgress } from '@/graphql/type';
import { StatCard } from './StatCard';
import { sumBy } from 'lodash-es';

interface StatsContainerProps {
  data?: MessageProgress[];
}
const StatsContainer = ({ data }: StatsContainerProps) => {
  const totalMessageValue = sumBy(data, (item) => Number(item.total));
  const inflightMessageValue = sumBy(data, (item) => Number(item.inflight));
  const networkValue = data?.length ?? 0;
  // only ormp protocol is supported
  const protocolValue = 1;

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
      <StatCard title="Total Messages" value={totalMessageValue} percentageChange={20.1} />
      <StatCard title="Inflight Messages" value={inflightMessageValue} percentageChange={20.1} />
      <StatCard title="Networks" value={networkValue} percentageChange={20.1} />
      <StatCard title="Protocols" value={protocolValue} percentageChange={20.1} />
    </div>
  );
};
export default StatsContainer;
