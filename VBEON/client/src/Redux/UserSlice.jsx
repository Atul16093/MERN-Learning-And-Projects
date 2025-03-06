import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "UserSlice",
  initialState: {
    user: {},
    token: null,
    message: "",
    isLoggedIn: false,
  },
  reducers : {
    setUser : (state , action)=>{
      console.log(action.payload);
        state.user = action.payload.user
    }
  }
});
export const {setUser} = slice.actions;
export default slice.reducer;
