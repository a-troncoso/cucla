import {useRef, useState, useMemo} from 'react';
import {MODAL_USER_MODES} from './ModalUser';
import {USER_OPTIONS} from '../modalUserOptions/ModalUserOptions';
import {useUsers} from 'hooks/useUsers';

const useModalUser = ({
  mode,
  modeConfig = {
    userId: null,
    attributeToEdit: USER_OPTIONS[1].name,
  },
  onAddUser = () => {},
  onEditUser = () => {},
}) => {
  const {fetchUser} = useUsers();
  const inputRef = useRef(null);
  const [newUserName, setNewUserName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [
    isVisibleModalImageSourceOptions,
    setIsVisibleModalImageSourceOptions,
  ] = useState(false);

  const isDisabledSaveBtn = useMemo(() => !newUserName, [newUserName]);

  const handleShowModal = () => {
    setTimeout(() => inputRef.current?.focus(), 200);
    handleShow();
  };

  const handleSubmitEditing = () => {
    if (!newUserName) return;

    if (mode === MODAL_USER_MODES.ADD) {
      onAddUser({userName: newUserName, imagePath: newImage});
    } else if (mode === MODAL_USER_MODES.EDIT)
      onEditUser({newUserName, imagePath: newImage});
  };

  const handleChangeNewUserName = value => {
    setNewUserName(value);
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

  const handleShow = async () => {
    if (mode === MODAL_USER_MODES.EDIT && modeConfig.userId) {
      const user = await fetchUser(modeConfig.userId);
      setNewUserName(user.name);
      setNewImage(user.imagePath);
    } else if (mode === MODAL_USER_MODES.ADD) {
      setNewImage('');
      setNewUserName('');
    }

    const actionByUserOption = {
      [USER_OPTIONS[0].name]: () => setIsVisibleModalImageSourceOptions(true),
      [USER_OPTIONS[1].name]: () => {},
    };

    actionByUserOption[modeConfig.attributeToEdit]();
  };

  return {
    inputRef,
    isDisabledSaveBtn,
    isVisibleModalImageSourceOptions,
    newImage,
    newUserName,
    handleSubmitEditing,
    handleChangeNewUserName,
    handlePressAvatar,
    handleRequestCloseModalImageSourceOptions,
    handleSelectNewImage,
    handleShowModal,
  };
};

export default useModalUser;
