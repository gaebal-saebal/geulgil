import { create } from 'zustand';
import { SessionStateType } from '@/types/interface';

const sessionState = create<SessionStateType>((set) => ({
  name: '',
  setName: (newState) => set({ name: newState }),
  email: '',
  setEmail: (newState) => set({ email: newState }),
}));

export { sessionState };
