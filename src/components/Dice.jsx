const Dice = ({ rollDice }) => {
  return (
    <button
      onClick={rollDice}
      className="bg-blue-500 text-white p-2 rounded-md"
    >
      Roll Dice
    </button>
  );
};

export default Dice;
