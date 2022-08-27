import React, {useRef, useState} from 'react';

import Button from 'components/Button';

const useModalMovementOptions = ({idMovement, onPressOption}) => {
  const renderOption = ({item}) => (
    <Button
      onPress={() => onPressOption({optionId: item.id, idMovement})}
      disabled={item.disabled}>
      {item.title}
    </Button>
  );

  return {
    renderOption,
  };
};

export default useModalMovementOptions;
