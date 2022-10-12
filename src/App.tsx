import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./features/counter/counterSlice";
import "./App.css";
import RenderInput from "./components/RenderInput";
import ListSampleComponent from "./components/ListSampleComponent";

function App() {
  const counterValue = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="App">
      <h1>Vite + React + Redux Toolkit</h1>
      <div className="card">
        <div className="button-bar">
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>-</button>
        </div>
        <p> count is {counterValue}</p>
        <div className="button-bar">
          <input
            className="textbox"
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <button
            onClick={() =>
              dispatch(incrementByAmount(Number(incrementAmount) || 0))
            }
          >
            Add Amount
          </button>
        </div>
      </div>

      <h1>input and click test</h1>
      <RenderInput outputConsole={console.log} />

      <h1>list render test</h1>
      <ListSampleComponent items={[{ id: 1, name: 'React' }, { id: 2, name: 'Angular' }, { id: 3, name: 'Vue' },]} />

      <h2>if items array is empty, show 'no items' string</h2>
      <ListSampleComponent items={[]} />
    </div>
  );
}

export default App;
