import PropTypes from 'prop-types';
import React from 'react';
export default function Button({ children, customStyles, ...props }) {
  return (
    <button className={`mt-4 w-full bg-[#090467] text-white shadow-md ${customStyles}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}
