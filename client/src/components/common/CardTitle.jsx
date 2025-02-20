import PropTypes from 'prop-types';

export default function CardTitle({ title, subtitle }) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-2 text-[#090467]">{title}</h2>
      {subtitle ? <h3 className="text-l mb-2 text-[#090467]">{subtitle}</h3> : null}
    </>
  );
}

CardTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
