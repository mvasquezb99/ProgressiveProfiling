import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import React from "react";

const SwipeArrows = ({ handleLike, handleDislike, handleSuperlike }) => {
  return (
    <article className="flex mt-5 space-x-4">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: -10 }}
        transition={{ repeat: 7, repeatType: "reverse", duration: 0.6 }}
        className="p-3 bg-white shadow-md rounded-xl cursor-pointer text-red-500 hover:text-white hover:bg-red-500  transition-colors"
        onClick={handleDislike}
        id='arrowLeft'
      >
        <i className="fa-solid fa-arrow-left text-2xl h-full w-full" id="arrowLeft"></i>
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -10 }}
        transition={{ repeat: 7, repeatType: "reverse", duration: 0.6 }}
        className="p-3 bg-white shadow-md rounded-xl cursor-pointer text-yellow-500 hover:text-white hover:bg-yellow-500 transition-colors"
        onClick={handleSuperlike}
        id='arrowUp'
      >
        <i className="fa-solid fa-star text-2xl" id="arrowUp"></i>
      </motion.div>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 10 }}
        transition={{ repeat: 7, repeatType: "reverse", duration: 0.6 }}
        className="p-3 bg-white shadow-md rounded-xl cursor-pointer text-green-500 hover:text-white hover:bg-green-500 transition-colors"
        onClick={handleLike}
        id='arrowRight'
      >
        <i className="fa-solid fa-arrow-right text-2xl" id="arrowRight"></i>
      </motion.div>
    </article>
  );
};

SwipeArrows.propTypes = {
  handleLike: PropTypes.func,
  handleDislike: PropTypes.func,
  handleSuperlike: PropTypes.func,
}

export default SwipeArrows;
