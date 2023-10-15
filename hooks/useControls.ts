import { create } from "zustand";

interface ControlsState {
  // Public controls
  paused: boolean;
  togglePaused: () => void;

  fastForwarding: boolean;
  toggleFastForwarding: () => void;

  date: Date;
  setDate: (value: Date) => void;

  showAxes: boolean;
  toggleAxes: () => void;

  moonView: string;
  setMoonView: (value: string) => void;

  showLocations: boolean;
  toggleLocations: () => void;

  naturalRotationSpeed: number;
  setNaturalRotationSpeed: (value: number) => void;

  ambientLightIntensity: number;
  setAmbientLightIntensity: (value: number) => void;

  directLightIntensity: number;
  setDirectLightIntensity: (value: number) => void;

  showNotifications: boolean;
  toggleNotifications: () => void;

  // Private controls
  showInfo: boolean;
  toggleInfo: () => void;
}

const startDate = new Date(1969, 0, 309);

const useControls = create<ControlsState>((set) => ({
  paused: false,
  togglePaused: () => set((state) => ({ paused: !state.paused })),

  fastForwarding: false,
  toggleFastForwarding: () =>
    set((state) => ({ fastForwarding: !state.fastForwarding })),

  date: startDate,
  setDate: (value) => set({ date: value }),

  showAxes: false,
  toggleAxes: () => set((state) => ({ showAxes: !state.showAxes })),

  moonView: "regular",
  setMoonView: (value) => set({ moonView: value }),

  showLocations: true,
  toggleLocations: () =>
    set((state) => ({ showLocations: !state.showLocations })),

  naturalRotationSpeed: 0.002,
  setNaturalRotationSpeed: (value) => set({ naturalRotationSpeed: value }),

  ambientLightIntensity: 0.2,
  setAmbientLightIntensity: (value) => set({ ambientLightIntensity: value }),

  directLightIntensity: 500,
  setDirectLightIntensity: (value) => set({ directLightIntensity: value }),

  showNotifications: true,
  toggleNotifications: () =>
    set((state) => ({ showNotifications: !state.showNotifications })),

  showInfo: false,
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
}));

export default useControls;
