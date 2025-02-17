import { animate, motion } from "framer-motion";

const SwipeArrows = ({handleLike, handleDislike}) => {
  return (
    <div className="flex mt-3 space-x-4">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: -10 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
        className="p-3 bg-white shadow-md rounded-xl cursor-pointer text-red-500 hover:text-white hover:bg-red-500  transition-colors"
        onClick={handleDislike}
      >
        <i className="fa-solid fa-arrow-left text-2xl h-full w-full"></i>
      </motion.div>

    
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 10 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
        className="p-3 bg-white shadow-md rounded-xl cursor-pointer text-green-500 hover:text-white hover:bg-green-500 transition-colors"
        onClick={handleLike}
      >
        <i className="fa-solid fa-arrow-right text-2xl "></i>
      </motion.div>
    </div>
  );
};

export default SwipeArrows;
