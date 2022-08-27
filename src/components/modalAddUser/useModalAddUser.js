import {useRef, useState, useMemo} from 'react';

const useModalAddUser = ({onAddUser}) => {
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

  const handlePressImageSourceOption = ({id}) => {
    const options = {
      storageOptions: {
        includeBase64: false,
      },
    };
    const launcherFunctionByOptionId = {
      1: launchCamera,
      2: launchImageLibrary,
    };

    launcherFunctionByOptionId[id](options, response => {
      setIsVisibleModalImageSourceOptions(false);
      if (response.didCancel) return;
      setNewImage(response.assets[0].uri);
      inputRef.current.focus();
    });
  };

  const renderImageSourceOption = ({item}) => (
    <Button onPress={() => handlePressImageSourceOption({id: item.id})}>
      {item.title}
    </Button>
  );

  const handleRequestCloseModalImageSourceOptions = () => {
    setIsVisibleModalImageSourceOptions(false);
  };

  return {
    userName,
    newImage,
    inputRef,
    handleAddUser,
    isDisabledSaveBtn,
    handleShowModal,
    handleChangeUserName,
    renderImageSourceOption,
    handleRequestCloseModalImageSourceOptions,
    isVisibleModalImageSourceOptions,
  };
};

export default useModalAddUser;
