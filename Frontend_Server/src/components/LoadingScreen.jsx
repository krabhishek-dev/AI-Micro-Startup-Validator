

import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Text */}
      <motion.p
        className="mt-6 text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        🤖 AI is analyzing your idea...
      </motion.p>

    </div>
  );
};

export default LoadingScreen;