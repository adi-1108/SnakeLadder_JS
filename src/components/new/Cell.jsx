import React from "react";
import { motion } from "framer-motion";
import { gridBg, starGates } from "./../../constants";

const Cell = ({ number, isBlackHole, isStarGate, players }) => {
  const randomBg = gridBg[Math.floor(Math.random() * gridBg.length)];

  return (
    <div className="relative flex items-center justify-center sm:text-[2vw] text-[3vw] font-bold bg-cover bg-no-repeat">
      <img
        className="absolute w-full h-full top-0 left-0 object-cover z-0"
        src={randomBg}
        alt=""
      />
      {isStarGate && (
        <img
          src="/new/star-gate.webp"
          className="absolute w-full h-full top-0 left-0 object-cover z-0"
        />
      )}
      {isBlackHole && (
        <img
          src="/new/blackhole.webp"
          className="absolute w-full h-full top-0 left-0 object-cover z-0"
        />
      )}
      {Object.values(starGates).includes(number) && (
        <img
          src="/new/star-gate-exit.webp"
          className="absolute w-full h-full top-0 left-0 object-cover z-0"
        />
      )}
      {!isBlackHole && !isStarGate && (
        <div className="relative flex items-center justify-center w-full h-full z-0">
          {number}
        </div>
      )}

      {/* Players */}
      <div className="flex space-x-1 z-10">
        {players.map((player) => (
          <motion.img
            key={player.id}
            src={player.image}
            className="absolute w-[75%] h-full top-0 left-0 object-cover z-50"
            animate={{
              x: player.position.x,
              y: player.position.y,
            }}
            initial={{
              x: 0,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Cell;
