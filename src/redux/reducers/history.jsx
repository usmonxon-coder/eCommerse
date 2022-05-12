import { globalTypes } from "../actions/globalTypes";

export const history = (state = [], action) => {
  switch (action.type) {
    case globalTypes.HISTORY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
