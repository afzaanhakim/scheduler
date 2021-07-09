import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nm, replace = false) {
    setMode(nm);
    const newHist = [...history]
    if (replace) {
      newHist.splice(-1, 1, nm);
      return newHist;
    } 
      setHistory([...newHist, nm]);
    
  }

  function back() {
    if (history.length > 1) {
      const newHist = [...history]
      setMode(newHist[newHist.length - 2]);
      setHistory(newHist.slice(0, -1));
    }
  }
  return { mode, transition, back };
}
