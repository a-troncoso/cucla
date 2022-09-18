import {useState} from 'react';

const useModalUserOptions = () => {
  const [isVisibleModalConfirmation, setIsVisibleModalConfirmation] =
    useState(true);

  return {
    isVisibleModalConfirmation,
  };
};

export default useModalUserOptions;
