import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
//transitioning into a new mode and keeps track of previous mode
  function transition(nm, replace = false) {
    setMode(nm);
    const newHist = [...history];
    if (replace) {
      newHist.splice(-1, 1, nm);
      return newHist;
    }
    setHistory([...newHist, nm]);
  }
//back function to revert if history array has more than 1 mode
  function back() {
    if (history.length > 1) {
      const newHist = [...history];
      setMode(newHist[newHist.length - 2]);
      setHistory(newHist.slice(0, -1));
    }
  }
  return { mode, transition, back };
}
