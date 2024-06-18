import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const loadStateFromCookie = () => {
  //console.log("loginSlice...2");
  const auth = getCookie("auth");

  const username = auth?.username; // 옵셔널 체이닝 연산자를 이용해 안전하게 username 참조
  const userId = auth?.userId;
  const userImg = auth?.userImg;
  const userEmail = auth?.userEmail;
  const userRole = auth?.userRole;
  const planState = auth?.planState;
  //console.log("loginSlice...4 : " + username);
  const accessToken = auth?.accessToken;
  //console.log("loginSlice...5 : " + accessToken);

  return { username, userId, userImg, userEmail, userRole, accessToken, planState};
};

const initState = {
  username: "",
  userId: "",
  userImg: "",
  userEmail: "",
  userRole: "",
  planState: "",
  accessToken: "",
};

//console.log("loginSlice...1");

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadStateFromCookie() || initState, //쿠키가 없다면 초깃값 사용
  reducers: {
    login: (state, action) => {
      console.log("login.....1 : " + JSON.stringify(state));
      console.log("login.....2 : " + JSON.stringify(action));

      const data = action.payload;
      console.log("login.....3 : " + JSON.stringify(data));

      // 상태 업데이트
      state.username = data.username;
      state.userId = data.userId;
      state.userImg = data.userImg;
      state.userEmail = data.userEmail;
      state.userRole = data.userRole;
      state.planState = data.planState;
      state.accessToken = data.accessToken;
      // 쿠키 저장
      setCookie("auth", data, 1);
    },
    logout: (state) => {
      console.log("logout....");
      removeCookie("auth");
      return { ...initState };
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;