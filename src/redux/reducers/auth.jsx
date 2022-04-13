import { globalTypes } from "../actions/globalTypes";

export const auth = (state = {}, action) => {
  switch (action.type) {
    case globalTypes.AUTH: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
