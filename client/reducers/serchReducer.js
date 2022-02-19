import { types } from "../type";

const initialStates = {
  list: [],
  activeSelect: null,
};

export const serchReducer = (states = initialStates, action) => {
  switch (action.type) {
    case types.serchList:
      return {
        ...states,
        list: action.payload,
      };
    case types.close:
      return {
        list: [],
        activeSelect: null,
      };

    default:
      return states;
  }
};
