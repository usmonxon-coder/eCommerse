import { globalTypes } from "../actions/globalTypes";

export const loading = (state = false, action) => {
  switch (action.type) {
    case globalTypes.LOADING: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
