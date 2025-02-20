import ProgressTracker from "../features/ProgressTracker";
import PropTypes from 'prop-types';

export default function Card({ rem, children, step }) {
  return (
    <div className="flex flex-col">
      <div
        className={`bg-[#f4f4fa] flex flex-col items-center p-8 rounded-xl`}
        style={rem && { width: `${rem}rem` }}
      >
        {children}
      </div>
      <ProgressTracker step={step} />
    </div>
  );
}


Card.propTypes = {
  rem: PropTypes.number,
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
}