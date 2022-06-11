import { types } from "../type";

const initialStates = {
  list: [],
  listData: [],
  activeSelect: null,
};
export const categoryReducer = (state = initialStates, action) => {
  switch (action.type) {
    case types.category:
      return {
        ...state,
        list: [...action.payload],
      };
    case types.categoryList:
      return {
        ...state,
        listData: [...action.payload],
      };
    case types.categoryAdd:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case types.categoryActive:
      return {
        ...state,
        activeSelect: action.payload,
      };
    case types.categoryEdit:
      return {
        ...state,
        list: state.list.map((e) =>
          e.id === action.payload.id ? (e = action.payload) : e
        ),
        activeSelect: null,
      };
    case types.categoryDelete:
      return {
        ...state,
        list: state.list.filter((e) => e.id !== action.payload),
        activeSelect: null,
      };
    case types.closeActive:
      return {
        ...state,
        activeSelect: null,
      };

    default:
      return state;
  }
};