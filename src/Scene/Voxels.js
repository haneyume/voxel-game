import React from 'react';

import { AppContext } from '../AppContext';
import { Voxel } from './Voxel';

export const Voxels = () => {
  const appCtx = React.useContext(AppContext);

  return (
    <>
      {appCtx.voxels.map((item, index) => (
        <Voxel key={index.toString()} position={item.position} />
      ))}
    </>
  );
};
