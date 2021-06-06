import React from 'react';

import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { usePlane } from '@react-three/cannon';

import grass from '../assets/grass.jpg';

export const Ground = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

  const texture = useLoader(THREE.TextureLoader, grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(240, 240);

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial map={texture} color="green" />
    </mesh>
  );
};
