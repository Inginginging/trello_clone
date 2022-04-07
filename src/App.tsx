import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  //selector를 useState로 받는다면 첫번째 반환값은 get func값. 두번째 반환값은 set func 값.
  const [hours, setHours] = useRecoilState(hourSelector);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value); //selector의 set의 newValue값으로 넘어감.
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onChange}
        placeholder="minutes"
        type="number"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        placeholder="hours"
        type="number"
      />
    </div>
  );
}

export default App;
