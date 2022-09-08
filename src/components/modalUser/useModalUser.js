import {useRef, useState, useMemo} from 'react';

const useModalUser = ({onAddUser}) => {
  const inputRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [newImage, setNewImage] = useState();
  const [
    isVisibleModalImageSourceOptions,
    setIsVisibleModalImageSourceOptions,
  ] = useState(false);

  const isDisabledSaveBtn = useMemo(() => !userName, [userName]);

  const handleShowModal = () => {
    setTimeout(() => inputRef.current.focus(), 200);
    setUserName('');
  };

  const handleAddUser = () => {
    if (!userName) return;
    onAddUser({userName, imagePath: newImage});
  };

  const handleChangeUserName = value => {
    setUserName(value);
  };

  const handlePressAvatar = () => {
    setIsVisibleModalImageSourceOptions(true);
  };

  const handleRequestCloseModalImageSourceOptions = () => {
    setIsVisibleModalImageSourceOptions(false);
  };

  const handleSelectNewImage = selectedImage => {
    setIsVisibleModalImageSourceOptions(false);

    if (selectedImage.didCancel) return;

    setNewImage(selectedImage.assets[0].uri);
    inputRef.current.focus();
  };

  return {
    userName,
    newImage,
    isVisibleModalImageSourceOptions,
    inputRef,
    isDisabledSaveBtn,
    handleAddUser,
    handleShowModal,
    handleChangeUserName,
    handlePressAvatar,
    handleRequestCloseModalImageSourceOptions,
    handleSelectNewImage,
  };
};

export default useModalUser;
