import {useState} from 'react';

const useHome = () => {
  const [isVisibleModalUserOptions, setIsVisibleModalUserOptions] =
    useState(false);

  const handleLongPressImage = () => {
    setIsVisibleModalUserOptions(true);
  };

  return {
    isVisibleModalUserOptions,
    handleLongPressImage,
  };
};

export default useHome;
