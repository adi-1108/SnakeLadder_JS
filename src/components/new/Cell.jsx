import React from "react";
import { gridBg, starGates } from "./../../constants";

const Cell = ({ number, isBlackHole, isStarGate, players }) => {
  const randomBg = gridBg[Math.floor(Math.random() * gridBg.length)];
  return (
    <div className="flex items-center justify-center text-[2vw] font-bold  bg-contain bg-no-repeat">
      <img className="absolute z-0" src={randomBg} alt="" />
      {isStarGate && (
        <img src="/new/star-gate.webp" className="absolute object-cover z-0" />
      )}
      {isBlackHole && (
        <img src="/new/blackhole.webp" className="absolute object-cover z-0" />
      )}

      {Object.values(starGates).includes(number) && (
        <img src="/new/star-gate-exit.webp" className="absolute  z-10" />
      )}

      {!isBlackHole && !isStarGate && (
        <div className="relative flex items-center justify-center w-full h-full z-0">
          {number}
        </div>
      )}

      <div className="flex space-x-1 z-10">
        {players.map((player) => (
          <img key={player.id} src="/player.webp" className="" />
        ))}
      </div>
    </div>
  );
};

export default Cell;
