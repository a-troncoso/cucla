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
  const [amount, setAmount] = useState(0);
  const isDisabledSaveBtn = useMemo(() => !amount, [amount]);
  const {fetchMovementById} = useMovements();

  const handleShowModal = async () => {
    if (mode === MODAL_MOVEMENT_MODES.EDIT && modeConfig.movementId) {
      const movement = await fetchMovementById(modeConfig.movementId);
      setAmount(movement?.amount);
    } else if (mode === MODAL_MOVEMENT_MODES.ADD) {
      setAmount(0);
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
