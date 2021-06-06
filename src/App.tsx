import React from 'react';

import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls, useContextBridge } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import { AppContext } from './AppContext';

import { Player, Voxels, Ground } from './Scene';

export const App = () => {
  const appCtx = React.useContext(AppContext);
  const ContextBridge = useContextBridge(AppContext);

  return (
    <>
      <Canvas shadows gl={{ alpha: false }} camera={{ fov: 35 }}>
        <ContextBridge>
          <Sky sunPosition={[100, 10, 100]} />

          <ambientLight intensity={0.3} />
          <pointLight intensity={0.8} position={[100, 100, 100]} castShadow />

          <Physics gravity={[0, -30, 0]}>
            <Player />
            <Voxels />
            <Ground />
          </Physics>

          <PointerLockControls />
        </ContextBridge>
      </Canvas>

      <div className="absolute top-3 left-3">
        {JSON.stringify(appCtx.voxels)}
      </div>
    </>
  );
};
