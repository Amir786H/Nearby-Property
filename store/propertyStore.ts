import { create } from 'zustand';

type Property = {
  id: string;
  title: string;
  price: number;
  location: any;
  features: string[];
  images: string[];
};
type PropertyStore = {
  selectedProperties: Property[];
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
  clearProperties: () => void;
};


export const usePropertyStore = create<PropertyStore>((set) => ({
  selectedProperties: [],
  addProperty: (property) =>
    set((state) => ({
      selectedProperties: [...state.selectedProperties, property],
    })),
  removeProperty: (id) =>
    set((state) => ({
      selectedProperties: state.selectedProperties.filter((p) => p.id !== id),
    })),
  clearProperties: () => set({ selectedProperties: [] }),
}));
