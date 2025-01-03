import {
  createContext,
  useContext,
  Dispatch,
  useState,
  ReactNode,
  useMemo,
} from "react";

interface Piano {
  currentKey: string | null;
  selectKey: Dispatch<string | null>;
  currentChord: string | null;
  setCurrentChord: (chord: string | null) => void;
  selectChord: (chord: string | null) => void;
  octaves: number[];
  setOctaves: Dispatch<number[]>;
  startingOctave: number;
  setStartingOctave: Dispatch<number>;
}

export const PianoContext = createContext<Piano | undefined>(undefined);

export const PianoProvider = ({ children }: { children: ReactNode }) => {
  const [octaves, setOctaves] = useState<number[]>([1, 2]);
  const [startingOctave, setStartingOctave] = useState<number>(5);
  const [currentKey, selectKey] = useState<string | null>(null);
  const [currentChord, setCurrentChord] = useState<string | null>(null);

  const selectChord = (chord: string | null) => {
    setCurrentChord((prev) => (prev === chord ? null : chord));
  };

  const value = useMemo(
    () => ({
      currentKey,
      selectKey,
      currentChord,
      setCurrentChord,
      selectChord,
      octaves,
      setOctaves,
      startingOctave,
      setStartingOctave,
    }),
    [currentKey, currentChord, octaves]
  );

  return (
    <PianoContext.Provider value={value}>{children}</PianoContext.Provider>
  );
};

export const usePiano = (): Piano => {
  const context = useContext(PianoContext);
  if (!context) {
    throw new Error("usePiano must be used within a PianoProvider");
  }
  return context;
};
