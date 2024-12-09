import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  generateRandomBlackHoles,
  generateRandomStarGates,
} from "./utils/functions";
import Player from "./Player";
import { blackHoles, starGates } from "./../constants";

const GameBoard = () => {
  const [positions, setPositions] = useState({ player1: 1, player2: 1 });
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const gridBg = [
    "/new/grid-boxv1.webp",
    "/new/grid-boxv2.webp",
    "/new/grid-boxv3.webp",
    "/new/grid-boxv4.webp",
  ];

  const rollDice = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setPositions((prev) => {
      const newPosition = Math.min(prev[currentPlayer] + diceValue, 100);
      return { ...prev, [currentPlayer]: newPosition };
    });

    setTimeout(
      () =>
        setCurrentPlayer((prev) =>
          prev === "player1" ? "player2" : "player1"
        ),
      500
    );
  };

  const createGrid = () => {
    const cells = [];
    let counter = 100; // Start from 100 to 1

    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      for (let col = 0; col < 10; col++) {
        // Zigzag numbering
        const index = row % 2 === 0 ? col : 9 - col;
        const cellNumber = counter - index;

        // Determine if the cell has a snake or ladder
        const isBlackHole = blackHoles[cellNumber];
        const isStarGate =
          starGates[cellNumber] ||
          Object.values(starGates).includes(cellNumber);

        // Apply different background styles for snake and ladder cells
        const randomBg = gridBg[Math.floor(Math.random() * gridBg.length)];

        rowCells.push(
          <div
            id={cellNumber}
            key={cellNumber}
            className={clsx(
              "flex items-center justify-center text-[2vw] font-bold aspect-w-1 bg-contain bg-no-repeat"
            )}
          >
            <img
              src={randomBg}
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            {isStarGate && (
              <img
                src="/new/star-gate.webp"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
            )}
            {isBlackHole && (
              <img
                src="/new/blackhole.webp"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
            )}

            {!isBlackHole && !isStarGate && (
              <div className="relative flex items-center justify-center w-full h-full z-10">
                {cellNumber}
              </div>
            )}

            {Object.values(starGates).includes(cellNumber) && (
              <img
                src="/new/star-gate-exit.webp"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
            )}

            {Object.entries(positions).map(([player, pos]) =>
              pos === cellNumber ? (
                <img
                  key={player}
                  src={`/player.webp`}
                  alt={`player token`}
                  className="absolute text-center w-[60%] z-10"
                />
              ) : null
            )}
          </div>
        );
      }
      cells.push(...rowCells);
      counter -= 10;
    }

    return cells;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-white font-bold mb-4">Space Portal</h1>
      <div className="grid grid-cols-10 grid-rows-10 gap-1 backdrop-blur-lg aspect-square w-[75vw] h-[calc(100vh-100px)]">
        {createGrid()}
      </div>
      <Dice currentPlayer={currentPlayer} onRoll={rollDice} />
    </div>
  );
};

export default GameBoard;
