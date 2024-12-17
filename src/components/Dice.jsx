// Dice.jsx
import React from "react";
import { motion } from "framer-motion";

const Dice = ({ rollDice, disabled }) => {
  return (
    <motion.button
      onClick={rollDice}
      disabled={disabled}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        bg-blue-500 text-white p-2 rounded-md 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
      `}
    >
      Roll Dice
    </motion.button>
  );
};

export default Dice;