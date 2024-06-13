import { useCallback } from 'react';
import useFilterStore from '@/store/filter';
import { DateRange } from 'react-day-picker';

function useFilter() {
  const {
    selectedStatuses,
    date,
    selectedSourceChains,
    selectedTargetChains,
    setSelectedStatuses,
    setDate,
    setSelectedSourceChains,
    setSelectedTargetChains
  } = useFilterStore((state) => ({
    selectedStatuses: state.selectedStatuses,
    date: state.date,
    selectedSourceChains: state.selectedSourceChains,
    selectedTargetChains: state.selectedTargetChains,
    setSelectedStatuses: state.setSelectedStatuses,
    setDate: state.setDate,
    setSelectedSourceChains: state.setSelectedSourceChains,
    setSelectedTargetChains: state.setSelectedTargetChains
  }));

  const handleStatusChange = useCallback(
    (newStatuses: (string | number)[]) => {
      setSelectedStatuses(newStatuses);
    },
    [setSelectedStatuses]
  );

  const handleDateChange = useCallback(
    (newDate: DateRange) => {
      setDate(newDate);
    },
    [setDate]
  );

  const handleSourceChainChange = useCallback(
    (newSourceChains: (string | number)[]) => {
      setSelectedSourceChains(newSourceChains);
    },
    [setSelectedSourceChains]
  );

  const handleTargetChainChange = useCallback(
    (newTargetChains: (string | number)[]) => {
      setSelectedTargetChains(newTargetChains);
    },
    [setSelectedTargetChains]
  );

  const handleReset = useCallback(() => {
    setSelectedStatuses([]);
    setSelectedSourceChains([]);
    setSelectedTargetChains([]);
    setDate({ from: undefined, to: undefined });
  }, [setDate, setSelectedSourceChains, setSelectedStatuses, setSelectedTargetChains]);

  return {
    selectedStatuses,
    date,
    selectedSourceChains,
    selectedTargetChains,
    handleStatusChange,
    handleDateChange,
    handleSourceChainChange,
    handleTargetChainChange,
    handleReset
  };
}

export default useFilter;
