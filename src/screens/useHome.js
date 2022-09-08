import {useState} from 'react';

const useHome = () => {
  const [isVisibleModalUserOptions, setIsVisibleModalUserOptions] =
    useState(false);

  const handleLongPressImage = () => {
    setIsVisibleModalUserOptions(true);
  };

  const handleRequestCloseModalUserOptions = () => {
    setIsVisibleModalUserOptions(false);
  };

  const handlePressOptionModalUserOptions = () => {
    setIsVisibleModalUserOptions(false);
  };

  return {
    isVisibleModalUserOptions,
    handleLongPressImage,
    handleRequestCloseModalUserOptions,
    handlePressOptionModalUserOptions,
  };
};

export default useHome;
