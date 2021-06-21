const initialState = {
  postsData: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_POST_DATA":
      return { ...state, postsData: action.data };
    default:
      return state;
  }
}
