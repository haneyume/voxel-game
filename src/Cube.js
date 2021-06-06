import React from 'react';

import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import create from 'zustand';

import dirt from './assets/dirt.jpg';

const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) =>
    set((state) => ({ cubes: [...state.cubes, [x, y, z]] })),
}));

export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes);
  return cubes.map((coords, index) => <Cube key={index} position={coords} />);
};

export const Cube = (props) => {
  const [ref] = useBox(() => ({ type: 'Static', ...props }));
  const [hover, set] = React.useState(null);
  const addCube = useCubeStore((state) => state.addCube);
  const texture = useLoader(THREE.TextureLoader, dirt);
  const onMove = React.useCallback(
    (e) => (e.stopPropagation(), set(Math.floor(e.faceIndex / 2))),
    [],
  );
  const onOut = React.useCallback(() => set(null), []);
  const onClick = React.useCallback((e) => {
    e.stopPropagation();
    const { x, y, z } = ref.current.position;
    const dir = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ];
    addCube(...dir[Math.floor(e.faceIndex / 2)]);
  }, []);

  return (
    <mesh
      ref={ref}
      receiveShadow
      castShadow
      onPointerMove={onMove}
      onPointerOut={onOut}
      onClick={onClick}
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray="material"
          map={texture}
          key={index}
          color={hover === index ? 'hotpink' : 'white'}
        />
      ))}
      <boxGeometry />
    </mesh>
  );
};
