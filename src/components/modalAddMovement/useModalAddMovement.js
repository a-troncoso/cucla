import {useRef, useState, useMemo} from 'react';
import {MODAL_MOVEMENT_MODES} from 'components/modalAddMovement/ModalAddMovement';
import {useMovements} from 'hooks/useMovements';

const useModalAddMovement = ({
  mode,
  modeConfig = {movementId: null},
  onAddMovement = () => {},
  onEditMovement = () => {},
}) => {
  const inputRef = useRef(null);
  const [amount, setAmount] = useState('');
  const isDisabledSaveBtn = useMemo(() => !amount, [amount]);
  const {fetchMovementById} = useMovements();

  const handleShowModal = async () => {
    setTimeout(() => inputRef.current?.focus(), 200);

    if (mode === MODAL_MOVEMENT_MODES.EDIT && modeConfig.movementId) {
      const movement = await fetchMovementById(modeConfig.movementId);
      setAmount(movement?.amount);
    } else if (mode === MODAL_MOVEMENT_MODES.ADD) {
      setAmount('');
    }
  };

  const handleChangeAmount = value => {
    setAmount(value);
  };

  const handleSubmitEditing = () => {
    if (!amount) return;

    if (mode === MODAL_MOVEMENT_MODES.ADD) {
      onAddMovement(amount);
    } else if (mode === MODAL_MOVEMENT_MODES.EDIT) onEditMovement({amount});
  };

  return {
    inputRef,
    amount,
    isDisabledSaveBtn,
    handleShowModal,
    handleChangeAmount,
    handleSubmitEditing,
  };
};

export default useModalAddMovement;
