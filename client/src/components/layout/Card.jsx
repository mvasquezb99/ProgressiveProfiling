import ProgressTracker from '../common/ProgressTracker';
import PropTypes from 'prop-types';
import React from 'react';
export default function Card({ rem, children, step }) {
  return (
    <section className="flex flex-col">
      <div
        className={`bg-[#f4f4fa] flex flex-col items-center p-8 rounded-xl`}
        style={rem && { width: `${rem}rem` }}
      >
        {children}
      </div>
      {step && <ProgressTracker step={step} />}
    </section>
  );
}

Card.propTypes = {
  rem: PropTypes.number,
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
};
