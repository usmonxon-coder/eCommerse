import { globalTypes } from "../actions/globalTypes";

export const products = (state = [], action) => {
  switch (action.type) {
    case globalTypes.PRODUCTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
