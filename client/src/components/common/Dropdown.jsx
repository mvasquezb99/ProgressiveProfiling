import { inputStyles, labelStyles } from '../../constants/styles';

import PropTypes from 'prop-types';
import React from 'react';
export default function Dropdown({ options, label, placeholder, ...props }) {
  return (
    <div className="flex flex-col">
      <label className={labelStyles} htmlFor="select">
        {label}
      </label>
      <select className={inputStyles} {...props}>
        <option hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

Dropdown.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
