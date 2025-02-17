import { inputStyles, labelStyles } from '../../constants/styles';
export default function Input({ label, handleChange, type, inputId }) {
  return (
    <div className="flex flex-col">
      <label className={labelStyles} htmlFor="name">
        {label}
      </label>
      <input
        className={inputStyles}
        onChange={(e) => handleChange(inputId, e.target.value)}
        type={type}
        name={inputId}
        id={inputId}
      />
    </div>
  );
}
