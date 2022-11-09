import { atom, selector } from "recoil";

 const sseState = atom({
  key: "sseState",
  default: {
    eventSource:null
  },
});


export default sseState;