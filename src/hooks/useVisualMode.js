import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(nm, replace = false) {
    if (replace) {
      setHistory((history) => [nm, ...history.slice(1)]);
    } else {
      setHistory((history) => [nm, ...history]);
    }
  }

  function back() {
    setHistory((history) => (history.length > 1 ? history.slice(1) : history));
  }
  return { mode: history[0], transition, back };
}
