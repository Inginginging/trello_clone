import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const hours = useRecoilValue(hourSelector);
  return (
    <div>
      <input
        value={minutes}
        onChange={onChange}
        placeholder="minutes"
        type="number"
      />
      <input value={hours} placeholder="hours" type="number" />
    </div>
  );
}

export default App;
