import React from 'react';

type KeyMapping = { [key: string]: string };

const keyMapping: KeyMapping = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump',
};

const keyMappingField = (key: string) => keyMapping[key];

export const usePlayerControls = () => {
  const [movement, setMovement] = React.useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  React.useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      setMovement((prevMovement) => ({
        ...prevMovement,
        [keyMappingField(evt.code)]: true,
      }));
    };

    const handleKeyUp = (evt: KeyboardEvent) => {
      setMovement((prevMovement) => ({
        ...prevMovement,
        [keyMappingField(evt.code)]: false,
      }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};
