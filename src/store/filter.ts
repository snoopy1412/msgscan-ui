import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

export type State = {
  selectedStatuses: (string | number)[];
  date: DateRange | undefined;
  selectedSourceChains: (string | number)[];
  selectedTargetChains: (string | number)[];
};
export type Action = {
  setSelectedStatuses: (status: (string | number)[]) => void;
  setDate: (date: DateRange | undefined) => void;
  setSelectedSourceChains: (chains: (string | number)[]) => void;
  setSelectedTargetChains: (chains: (string | number)[]) => void;
};

const useFilterStore = create<State & Action>((set) => ({
  selectedStatuses: [],
  date: { from: undefined, to: undefined },
  selectedSourceChains: [],
  selectedTargetChains: [],
  setSelectedStatuses: (status) => set({ selectedStatuses: status }),
  setDate: (date) => set({ date }),
  setSelectedSourceChains: (chains) => set({ selectedSourceChains: chains }),
  setSelectedTargetChains: (chains) => set({ selectedTargetChains: chains })
}));

export default useFilterStore;
