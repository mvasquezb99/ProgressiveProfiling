import { labelStyles } from '../../../constants/styles';
import { useState } from 'react';

import PropTypes from 'prop-types';
import React from 'react';
export default function ProfessionItem({ profession, handleClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const itemClass =
    'border-2 border-gray-200 rounded-xl text-center flex items-center max-h-40 justify-center p-4 shadow-md hover:shadow-lg hover:cursor-pointer ';

  const toggleClass = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };
  return (
    <div
      className={isClicked ? itemClass : itemClass + 'bg-gray-70 ' + ' bg-white hover:bg-gray-50 '}
      onClick={() => {
        toggleClass();
        handleClick(profession);
      }}
      data-testid='profession'
    >
      <p className={labelStyles}>{profession.name}</p>
    </div>
  );
}

ProfessionItem.propTypes = {
  id: PropTypes.string,
  profession: PropTypes.string,
  handleClick: PropTypes.func,
};
