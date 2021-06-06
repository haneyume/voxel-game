import React from 'react';

import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

import { AppContext } from '../AppContext';

import dirt from '../assets/dirt.jpg';

export const Voxel = ({ position }) => {
  const appCtx = React.useContext(AppContext);

  const [ref] = useBox(() => ({ type: 'Static', position }));

  const [hover, setHover] = React.useState(null);

  const texture = useLoader(THREE.TextureLoader, dirt);

  return (
    <mesh
      ref={ref}
      receiveShadow
      castShadow
      onPointerMove={(evt) => {
        evt.stopPropagation();
        setHover(Math.floor(evt.faceIndex / 2));
      }}
      onPointerOut={() => setHover(null)}
      onClick={(evt) => {
        evt.stopPropagation();
        const { x, y, z } = ref.current.position;
        const dir = [
          [x + 1, y, z],
          [x - 1, y, z],
          [x, y + 1, z],
          [x, y - 1, z],
          [x, y, z + 1],
          [x, y, z - 1],
        ];

        appCtx.setVoxels((prevVoxels) => [
          ...prevVoxels,
          {
            type: '',
            position: dir[Math.floor(evt.faceIndex / 2)],
          },
        ]);
      }}
    >
      <boxGeometry />
      {Array(6)
        .fill(0)
        .map((item, index) => (
          <meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            color={hover === index ? 'hotpink' : 'white'}
          />
        ))}
    </mesh>
  );
};
