import CardTitle from '../../common/CardTitle';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { useState } from 'react';

export default function Modal({ ref, handleClose, title, label, inputId }) {
  const [inputData, setInputData] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose(inputData, 'sum');
    setInputData('');
    ref.current.close();
  };

  const handleCancel = () => {
    setInputData('');
    ref.current.close();
  };

  const handleChange = (value) => {
    setInputData(value);
  };

  return (
    <dialog
      ref={ref}
      onClose={() => ref.current.close()}
      className="result-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:bg-gray-900/80 bg-white p-4 rounded-2xl"
    >
      <div className="flex justify-between">
        <CardTitle subtitle={title} />
        <i
          onClick={handleCancel}
          className="mt-3 fa-solid fa-x fa-xs hover:cursor-pointer hover:text-red-500 text-red-700 mb-3"
        ></i>
      </div>
      <form action="dialog" onSubmit={(e) => handleSubmit(e)}>
        <Input
          label={label}
          type="text"
          inputId={inputId}
          onChange={(e) => handleChange(e.target.value)}
          value={inputData}
        />
        <Button>Añadir</Button>
      </form>
    </dialog>
  );
}
