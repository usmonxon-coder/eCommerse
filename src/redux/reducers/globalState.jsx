import { globalTypes } from "../actions/globalTypes";

const initialState = { cart: [], page: 1 };
export const globalState = (state = initialState, action) => {
  switch (action.type) {
    case globalTypes.ADD_TO_CART: {
      return { ...state, cart: action.payload };
    }
    case globalTypes.PAGE: {
      return { ...state, page: state.page + 1 };
    }
    default: {
      return state;
    }
  }
};
