import React from 'react';
import Button from 'components/Button';

const useModalUserOptions = ({idMovement, onPressOption}) => {
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

export default useModalUserOptions;
