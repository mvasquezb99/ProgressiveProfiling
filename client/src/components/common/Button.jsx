import PropTypes from 'prop-types';
export default function Button({ children, ...props}) {
  return (
      <button className="mt-4 w-full bg-[#090467] text-white shadow-md" {...props}>
        {children}
      </button>
  );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
}
