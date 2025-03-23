import React, { useState } from "react";
import "./App.css";
const Calculator = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");
  const [activeInput, setActiveInput] = useState(1);
  const [selectedOperation, setSelectedOperation] = useState("");
  const handlerEqual = async () => {
    if (!selectedOperation) {
      setResult("Selectionner une operation");
    }
    try {
      let url = `http://localhost:8080/api/calculator/${selectedOperation}?a=${input1}`;
      if (input2) {
        // ou je peut ecrire :  input2 !== undefined && input2 !== null && input2 !== ''
        url += `&b=${input2}`;
      }
      const response = await fetch(url);
      if (!response.ok || !response.ok) {
        throw new Error("Erreur lors du calcul");
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult(error.message);
    }
  };
  const handlerNumberClick = (num) => {
    if (activeInput === 1) {
      setInput1((prev) => prev + num);
    } else {
      setInput2((prev) => prev + num);
    }
  };
  const handlerInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };
  const handleDelete = () => {
    if (activeInput === 1) {
      setInput1((prev) => prev.slice(0, -1)); // Supprime le dernier chiffre
    } else {
      setInput2((prev) => prev.slice(0, -1));
    }
  };
  return (
    <div>
      <div>
        <input
          type="number"
          value={input1}
          //onChange={(e) => setInput1(e.target.value)}
          readOnly // signifie one lit juste des boutons
          onFocus={() => handlerInputFocus(1)}
        />
        <input
          type="number"
          value={input2}
          //onChange={(e) => setInput2(e.target.value)}
          readOnly
          onFocus={() => handlerInputFocus(2)}
        />
      </div>
      <div>
        <tr>
          <button onClick={() => setSelectedOperation("squareRoot")}>√</button>
          <button onClick={() => setSelectedOperation("power")}>x^y</button>
          <button onClick={() => setSelectedOperation("percentage")}>%</button>
          <button onClick={() => setSelectedOperation("divide")}>/</button>
        </tr>
        <tr>
          <button onClick={() => handlerNumberClick(7)}>7</button>
          <button onClick={() => handlerNumberClick(8)}>8</button>
          <button onClick={() => handlerNumberClick(9)}>9</button>
          <button onClick={() => setSelectedOperation("multiply")}>*</button>
        </tr>
        <tr>
          <button onClick={() => handlerNumberClick(4)}>4</button>
          <button onClick={() => handlerNumberClick(5)}>5</button>
          <button onClick={() => handlerNumberClick(6)}>6</button>
          <button onClick={() => setSelectedOperation("subtract")}>-</button>
        </tr>
        <tr>
          <button onClick={() => handlerNumberClick(1)}>1</button>
          <button onClick={() => handlerNumberClick(2)}>2</button>
          <button onClick={() => handlerNumberClick(3)}>3</button>
          <button onClick={() => setSelectedOperation("add")}>+</button>
        </tr>
        <tr>
          <button onClick={() => handlerNumberClick(0)}>0</button>
          <button onClick={() => handlerNumberClick(".")}>.</button>
          <button onClick={() => handleDelete()}>⌫</button>
          <button onClick={handlerEqual}>=</button>
        </tr>
      </div>
      <p>Resultat : {result}</p>
      <output type="number" value={result} />
      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
        <button onClick={() => handlerNumberClick()}>
          {num}
        </button>
      ))} */}
    </div>
  );
};

export default Calculator;
