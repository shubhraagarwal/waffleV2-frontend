let initState = {};

export const UserReducer = (state = initState, action) => {
  const { type, payload } = action; //object destructring
  switch (type) {
    case "USER_THEME":
      return {
        ...state,
        theme: payload,
      };
    case "GET_USER":
      return {
        ...state,
        status: payload,
      };
    default:
      return state;
  }
};
