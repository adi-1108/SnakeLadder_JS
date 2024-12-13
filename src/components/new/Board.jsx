import React, { useState } from "react";
import Cell from "./Cell";
import { rollDice } from "../utils/functions";
import Dice from "../Dice";
import { blackHoles, starGates } from "../../constants";

const Board = () => {
  const gridBg = [
    "/new/grid-boxv1.webp",
    // "/new/grid-boxv2.webp",
    // "/new/grid-boxv3.webp",
    // "/new/grid-boxv4.webp",
  ];

  const [players, setPlayers] = useState([
    { id: 1, position: 1 }, // Player 1 starts at cell 1
    { id: 2, position: 1 }, // Player 2 starts at cell 1
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0); // Track whose turn it is

  const createGrid = () => {
    const cells = [];
    let counter = 100; // Start from 100 to 1

    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      for (let col = 0; col < 10; col++) {
        // Zigzag numbering
        const index = row % 2 === 0 ? col : 9 - col;
        const cellNumber = counter - index;

        const playersOnCell = players.filter(
          (player) => player.position === cellNumber
        );

        //Check for BlackHole or StarGate
        const isBlackHole = blackHoles[cellNumber];
        const isStarGate =
          starGates[cellNumber] ||
          Object.values(starGates).includes(cellNumber);

        // Apply different background styles for snake and ladder cells
        const randomBg = gridBg[Math.floor(Math.random() * gridBg.length)];

        rowCells.push(
          <Cell
            isBlackHole={isBlackHole}
            isStarGate={isStarGate}
            randomBg={randomBg}
            number={cellNumber}
            key={cellNumber}
            players={playersOnCell}
          />
        );
      }
      cells.push(...rowCells);
      counter -= 10;
    }

    return cells;
  };

  const movePlayer = () => {
    const diceValue = rollDice();
    const updatedPlayer = [...players];
    const player = updatedPlayer[currentPlayer];

    let newPosition = diceValue + player.position;

    if (newPosition > 100) {
      newPosition = player.position;
    }

    if (blackHoles[newPosition]) {
      newPosition = blackHoles[newPosition]; // Move to black hole destination
    } else if (starGates[newPosition]) {
      newPosition = starGates[newPosition]; // Move to stargate destination
    }

    player.position = newPosition;
    setPlayers(updatedPlayer);
    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-white font-bold mb-4">Space Portal</h1>
      <div className="grid grid-cols-10 grid-rows-10 gap-1 backdrop-blur-lg aspect-square w-[75vw] h-[calc(100vh-100px)]">
        {createGrid()}
      </div>
      <Dice rollDice={movePlayer} />
    </div>
  );
};

export default Board;
