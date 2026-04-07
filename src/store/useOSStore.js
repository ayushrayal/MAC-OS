import { create } from 'zustand';

const defaultWindowState = {
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: 10,
  position: { x: 150, y: 100 },
  size: { width: 600, height: 400 },
};

const useOSStore = create((set, get) => ({
  windows: {
    github: { ...defaultWindowState, size: { width: 800, height: 600 }, position: { x: 50, y: 50 } },
    notes: { ...defaultWindowState, size: { width: 450, height: 600 }, position: { x: 100, y: 100 } },
    resume: { ...defaultWindowState, size: { width: 800, height: 750 }, position: { x: 150, y: 50 } },
    spotify: { ...defaultWindowState, size: { width: 350, height: 500 }, position: { x: 200, y: 150 } },
    cli: { ...defaultWindowState, size: { width: 650, height: 450 }, position: { x: 250, y: 200 } },
  },
  
  highestZIndex: 10,

  osState: {
    isBooting: true,
  },

  // System Actions
  finishBooting: () => set(state => ({ osState: { ...state.osState, isBooting: false } })),

  // Window Actions
  openWindow: (id) => set((state) => {
    const newZ = state.highestZIndex + 1;
    // If it's already open but minimized, just unminimize and bring to front
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
        }
      },
      highestZIndex: newZ
    };
  }),

  focusWindow: (id) => set((state) => {
    if (!state.windows[id].isOpen) return state;
    // Don't update zIndex if it's already the highest to prevent infinite increment
    if (state.windows[id].zIndex === state.highestZIndex) return state;
    
    const newZ = state.highestZIndex + 1;
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          zIndex: newZ,
        }
      },
      highestZIndex: newZ
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isOpen: false,
        isMinimized: false,
      }
    }
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isMinimized: true,
      }
    }
  })),

  toggleMaximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isMaximized: !state.windows[id].isMaximized,
      }
    }
  })),

  updateWindowPosition: (id, position) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        position,
      }
    }
  })),

  updateWindowSize: (id, size) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        size,
      }
    }
  })),
}));

export default useOSStore;
