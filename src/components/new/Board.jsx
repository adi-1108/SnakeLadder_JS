import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { rollDice } from "../utils/functions";
import Dice from "../Dice";
import { blackHoles, starGates } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "./../Modal";

const Board = () => {
  const gridBg = ["/new/grid-boxv1.webp"];

  const [players, setPlayers] = useState([
    { id: 1, position: 1, image: "/player1.webp" },
    { id: 2, position: 1, image: "/player2.webp" },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createGrid = () => {
    const cells = [];
    let counter = 100;

    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      for (let col = 0; col < 10; col++) {
        const index = row % 2 === 0 ? col : 9 - col;
        const cellNumber = counter - index;

        const playersOnCell = players.filter(
          (player) => player.position === cellNumber
        );

        const isBlackHole = blackHoles[cellNumber];
        const isStarGate =
          starGates[cellNumber] ||
          Object.values(starGates).includes(cellNumber);

        const randomBg = gridBg[Math.floor(Math.random() * gridBg.length)];

        // if (player.position === 100 ||) {
        //   console.log("WINNER", player.id);
        //   setGameOver(true);
        //   return;
        // }

        rowCells.push(
          <Cell
            isBlackHole={isBlackHole}
            isStarGate={isStarGate}
            randomBg={randomBg}
            number={cellNumber}
            key={cellNumber}
            players={playersOnCell}
            isCurrentCell={playersOnCell.length > 0}
          />
        );
      }
      cells.push(...rowCells);
      counter -= 10;
    }

    return cells;
  };

  const movePlayer = () => {
    if (isMoving) return;

    setIsMoving(true);
    const diceValue = rollDice();
    setDiceRoll(diceValue);

    const updatedPlayer = [...players];
    const player = updatedPlayer[currentPlayer];

    let newPosition = diceValue + player.position;

    if (newPosition > 100) {
      newPosition = player.position;
    }

    if (blackHoles[newPosition]) {
      newPosition = blackHoles[newPosition];
    } else if (starGates[newPosition]) {
      newPosition = starGates[newPosition];
    }
    console.log("NEW POSITION", newPosition);

    player.position = newPosition;

    // Animate player movement
    setTimeout(() => {
      setPlayers(updatedPlayer);
      setCurrentPlayer((currentPlayer + 1) % players.length);
      setIsMoving(false);
    }, 1000);
  };

  const playersOnCell = players.filter((player) => player.position === 100);

  let isWinner = playersOnCell[0]?.position === 100;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-white font-bold ">Space Portal</h1>

      <div className="flex items-center justify-evenly gap-16 mb-1">
        <AnimatePresence>
          <motion.div
            key={`player-turn-${currentPlayer}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white font-bold "
          >
            {currentPlayer === 0 ? "Player 1 Turn" : "Player 2 Turn"}
          </motion.div>
        </AnimatePresence>

        {diceRoll && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-white font-bold "
          >
            Dice Roll: {diceRoll}
          </motion.div>
        )}

        <Dice rollDice={movePlayer} disabled={isMoving} />
      </div>
      <div className="grid grid-cols-10 sm:gap-1 w-[75vw] h-[calc(100vh-200px)] gap-0 sm:h-[calc(100vh-100px)]">
        {createGrid()}
      </div>

      {isWinner && (
        <Modal
          currentPlayer={currentPlayer}
          show={isWinner}
          onClose={() => setIsModalOpen(false)}
        >
          <div>
            {currentPlayer === 0 ? "Player 1" : "Player 2"} is the Winner
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Board;
