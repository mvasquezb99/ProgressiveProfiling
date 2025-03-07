
import PropTypes from 'prop-types';

export default function Loading({ message }) {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center text-[#090467] ">
            <i className="fa-solid fa-spinner fa-2xl animate-spin mb-6"></i>
            <small className="text-base font-semibold text-[#090467] leading-snug">{message}</small>
        </div>
    )
}

Loading.propTypes = {
    message: PropTypes.string,
}