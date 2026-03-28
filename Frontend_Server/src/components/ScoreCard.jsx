//ScoreCard.jsx

import { motion } from "framer-motion";

const ScoreCard = ({ score }) => {
  return (
    <div className="flex justify-center items-center my-10">
      
      <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
        
        <motion.h1
          className="text-4xl font-bold text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {score}
        </motion.h1>

        <span className="absolute bottom-3 text-sm text-gray-200">
          SCORE
        </span>
      </div>

    </div>
  );
};

export default ScoreCard;