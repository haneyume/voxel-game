import React from 'react';

interface AppContextProps {
  voxels: React.ReactNode[];
  setVoxels: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
}

export const AppContext = React.createContext<AppContextProps>(undefined!);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [voxels, setVoxels] = React.useState<React.ReactNode[]>([]);

  return (
    <AppContext.Provider
      value={{
        voxels,
        setVoxels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
