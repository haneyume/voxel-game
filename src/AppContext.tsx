import React from 'react';

interface VoxelType {
  type: string;
  position: number[];
}

interface AppContextProps {
  voxels: VoxelType[];
  setVoxels: React.Dispatch<React.SetStateAction<VoxelType[]>>;
}

export const AppContext = React.createContext<AppContextProps>(undefined!);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [voxels, setVoxels] = React.useState<VoxelType[]>([]);

  React.useEffect(() => {
    setVoxels([{ type: '', position: [0, 0, -10] }]);
  }, []);

  // React.useEffect(() => {
  //   // @ts-ignore
  //   window.voxels = voxels;
  // }, [voxels]);

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
