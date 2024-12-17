import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gridBg, starGates } from "./../../constants";

const Cell = ({ number, isBlackHole, isStarGate, players, isCurrentCell }) => {
  const randomBg = gridBg[Math.floor(Math.random() * gridBg.length)];

  return (
    <div className="relative flex items-center justify-center sm:text-[2vw] text-[3vw] font-bold bg-cover bg-no-repeat">
      <img
        className="absolute w-full h-full top-0 left-0 object-cover z-0"
        src={randomBg}
        alt=""
      />
      {isStarGate && (
        <motion.img
          src="/new/star-gate.webp"
          className="absolute w-full h-full top-0 left-0 object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {isBlackHole && (
        <motion.img
          src="/new/blackhole.webp"
          className="absolute w-full h-full top-0 left-0 object-cover z-0"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      )}
      {Object.values(starGates).includes(number) && (
        <motion.img
          src="/new/star-gate-exit.webp"
          className="absolute w-full h-full top-0 left-0 object-cover z-0"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        />
      )}
      {!isBlackHole && !isStarGate && (
        <div className="relative flex items-center justify-center w-full h-full z-0">
          {number}
        </div>
      )}

      {/* Players */}
      <AnimatePresence>
        {players.map((player) => (
          <motion.img
            key={player.id}
            src={player.image}
            className="absolute w-[75%] h-full top-0 left-0 object-cover z-50"
            initial={{
              opacity: 0,
              scale: 0.5,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.3 },
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        ))}
      </AnimatePresence>

      
    </div>
  );
};

export default Cell;
