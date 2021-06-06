import React from 'react';

import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';

import { AppContext } from '../AppContext';
import { usePlayerControls } from './hooks/usePlayerControls';

export const Player = ({}) => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
  }));

  const { forward, backward, left, right, jump } = usePlayerControls();

  const { camera } = useThree();
  const velocity = React.useRef([0, 0, 0]);

  React.useEffect(() => {
    api.velocity.subscribe((value) => (velocity.current = value));
  }, []);

  useFrame(() => {
    const SPEED = 5;

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();

    camera.position.copy(ref.current.position);

    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2]);
    }
  });

  return <mesh ref={ref} />;
};
