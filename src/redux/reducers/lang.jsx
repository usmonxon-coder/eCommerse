import { globalTypes } from "../actions/globalTypes";

const initialState = localStorage.getItem("lang")
  ? localStorage.getItem("lang")
  : "Uz";

export const lang = (state = initialState, action) => {
  switch (action.type) {
    case globalTypes.LANG: {
      localStorage.setItem("lang", action.payload);
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
