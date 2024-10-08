import React from "react";
import "./Tenezis/style.css";
import Die from "./Tenezis/Die";
import { nanoid } from "nanoid";
// import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenezis, setTenezis] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenezis(true);
      console.log("You Won");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let DiceNumber = [];
    for (let i = 0; i < 10; ++i) {
      DiceNumber.push(generateNewDie());
    }
    return DiceNumber;
  }

  function rollDice() {
    if (!tenezis) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenezis(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  let diceElement = dice.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));
  return (
    <main>
      {/* {tenezis && <Confetti />} */}
      <h1 className="title">Tenezis</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenezis ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
