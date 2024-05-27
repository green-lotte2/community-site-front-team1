// import 수동으로 먼저 선언
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/LoginSlice";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
  },
});