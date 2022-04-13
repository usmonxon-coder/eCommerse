import { globalTypes } from "../actions/globalTypes";
const initialState = localStorage.getItem("category")
  ? localStorage.getItem("category")
  : "Kompyuter";
export const category = (state = initialState, action) => {
  switch (action.type) {
    case globalTypes.CATEGORY: {
      localStorage.setItem("category", action.payload);
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
