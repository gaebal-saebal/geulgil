import { create } from 'zustand';
import { SessionStateType } from '@/types/interface';

const sessionState = create<SessionStateType>((set) => ({
  id: '',
  setId: (newState) => set({ id: newState }),
  name: '',
  setName: (newState) => set({ name: newState }),
  email: '',
  setEmail: (newState) => set({ email: newState }),
  setLogout: () => set({ id: '', name: '', email: '' }),
}));

export { sessionState };
