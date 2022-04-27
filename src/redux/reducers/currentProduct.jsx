import { globalTypes } from "../actions/globalTypes";
const initialState = {
  count: 1,
};
export const currentProduct = (state = initialState, action) => {
  switch (action.type) {
    case globalTypes.INCREMENT: {
      return { ...state, count: state.count + 1 };
    }
    case globalTypes.DICRIMENT: {
      return { ...state, count: state.count - 1 };
    }
    default: {
      return state;
    }
  }
};
