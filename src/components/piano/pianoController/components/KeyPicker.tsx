import { useState, useEffect, Dispatch } from "react";
import PianoEngine from "../../utils/PianoEngine";

export default function KeyPicker({
  currentKey,
  selectKey,
  selectChord,
}: {
  currentKey: string | null;
  selectKey: Dispatch<string | null>;
  selectChord: (chord: string | null) => void;
}) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const Piano = new PianoEngine();
  const keys = Piano.getKeys();

  const selectButton = (id: number) => {
    if (selectedButton === id) {
      setSelectedButton(null);
      selectKey(null);
      selectChord(null);
      return;
    }
    setSelectedButton(id);
  };

  useEffect(() => {
    console.log(currentKey);
    if (currentKey) {
      const selectedKey =
        currentKey[1] !== "#" ? currentKey[0] : currentKey[0] + currentKey[1];
      const selectedKeyIndex = keys.indexOf(selectedKey);
      setSelectedButton(selectedKeyIndex);
      return;
    }
    setSelectedButton(null);
  }, [currentKey]);

  return (
    <p className="text-zinc-100">{`${
      currentKey ? "key: " + currentKey : "no key selected"
    }`}</p>
  );
  return (
    <div className="max-w-[10%] flex flex-col justify-center items-center">
      <p
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        className="text-2xl text-semibold"
      >
        type of chord
      </p>
      <div
        onMouseEnter={() => {
          if (showOptions) {
            setShowOptions(true);
          }
        }}
        onMouseLeave={() => setShowOptions(false)}
        className={`relative flex bg-zinc-100 justify-center top-0 min-w-fit ${
          showOptions ? "visible" : "invisible"
        }`}
      >
        {keys.map((key, i) => (
          <button
            key={i}
            id={`${key}-button`}
            onClick={() => selectButton(i)}
            className={`rounded-lg px-2 py-0 m-1 mb-3 w-fit text-xl font-semibold hover:bg-sky-300 transition-all duration-75 border-b-2  border-r-2  border-opacity-0 ${
              selectedButton === i
                ? "bg-gradient-to-br from-emerald-400 to-sky-500 text-white hover:text-black border-black border-opacity-100"
                : "bg-sky-100 border-r-sky-100 border-b-sky-100"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
