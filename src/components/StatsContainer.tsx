import { StatCard } from './StatCard';

const StatsContainer = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <StatCard title="Total Messages" value={45231} percentageChange={20.1} />
      <StatCard title="Total Messages" value={45231} percentageChange={20.1} />
      <StatCard title="Total Messages" value={45231} percentageChange={20.1} />
      <StatCard title="Total Messages" value={45231} percentageChange={20.1} />
    </div>
  );
};
export default StatsContainer;
