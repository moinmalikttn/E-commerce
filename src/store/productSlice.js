const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;

// Thunks

// thunk are muiddleware functions that called before reducers .. and work async..

export function fetchProducts() {
  return async function fetchProductThunks(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
    //   console.log(data)
      dispatch(setProducts(data));
        dispatch(setStatus(STATUSES.IDLE))
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR))
    }
  };
}
