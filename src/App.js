import React from 'react';

import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import { Player } from './Player';
import { Cube, Cubes } from './Cube';
import { Ground } from './Ground';

export const App = () => {
  return (
    <Canvas shadows gl={{ alpha: false }} camera={{ fov: 35 }}>
      <Sky sunPosition={[100, 10, 100]} />

      <ambientLight intensity={0.3} />

      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />

      <Physics gravity={[0, -30, 0]}>
        <Player />
        <Cube position={[0, 0.5, -10]} />
        <Cubes />
        <Ground />
      </Physics>

      <PointerLockControls />
    </Canvas>
  );
};
