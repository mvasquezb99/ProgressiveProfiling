import { inputStyles, labelStyles } from '../../constants/styles';

export default function Dropdown({ options, label, placeholder, ...props }) {
  return (
    <div className="flex flex-col">
      <label className={labelStyles} htmlFor="select">
        {label}
      </label>
      <select className={inputStyles} {...props}>
        <option hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}
