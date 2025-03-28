import { inputStyles, labelStyles } from '../../constants/styles';

import PropTypes from 'prop-types';

export default function Input({ label, handleChange, type, inputId, ...props }) {
  return (
    <div className="flex flex-col">
      <label className={labelStyles} htmlFor={inputId}>
        {label}
      </label>
      <input
        className={inputStyles}
        onChange={(e) => handleChange(inputId, e.target.value)}
        type={type}
        name={inputId}
        id={inputId}
        {...props}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  type: PropTypes.string,
  inputId: PropTypes.string,
};
