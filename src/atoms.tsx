import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  //set property는 set함수와 set할 새로운 값을 인자로 받음
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    //set 함수는 state와 새로운 값으로 setting할 값을 받음.
    set(minuteState, minutes);
  },
});
