import React from "react";
import GameBoard from "./components/GameBoard";
import Board from './components/new/Board';

const App = () => {
  return (
    <main className="h-screen bg-[url('/Space/space.webp')] bg-cover bg-no-repeat backdrop-blur-lg">
      <section className="flex justify-center items-center h-screen">
        <Board />
         
      </section>
    </main>
  );
};

export default App;
