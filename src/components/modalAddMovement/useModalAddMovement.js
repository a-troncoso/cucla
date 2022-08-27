import {useRef, useState, useMemo} from 'react';

const useModalAddMovement = ({onAddMovement}) => {
  const inputRef = useRef(null);
  const [amount, setAmount] = useState('');
  const isDisabledSaveBtn = useMemo(() => !amount, [amount]);

  const handleShowModal = () => {
    setTimeout(() => inputRef.current.focus(), 200);
    setAmount('');
  };

  const handleChangeAmount = value => {
    setAmount(value);
  };

  const handleAddMovement = () => {
    if (!amount) return;
    onAddMovement(amount);
  };

  return {
    inputRef,
    amount,
    isDisabledSaveBtn,
    handleShowModal,
    handleChangeAmount,
    handleAddMovement,
  };
};

export default useModalAddMovement;
