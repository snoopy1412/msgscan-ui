'use client';

import { useMessageProgress } from '@/hooks/services';

import StatsContainer from '@/components/StatsContainer';
import { CHAIN } from '@/types/chains';

interface MessageProgressStatsProps {
  chains: CHAIN[];
}
const MessageProgressStats = ({ chains }: MessageProgressStatsProps) => {
  const { data: messageProgress } = useMessageProgress({
    chains
  });

  return (
    <div className="py-[2.5rem] lg:py-0">
      <StatsContainer
        data={
          Array.isArray(messageProgress?.MessageProgress) ? messageProgress?.MessageProgress : []
        }
      />
    </div>
  );
};

export default MessageProgressStats;