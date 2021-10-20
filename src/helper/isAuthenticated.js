import _isEmpty from "lodash/isEmpty";
import { TOKEN_LOGIN_KEY } from "../constants/app-constant";
const isAuthenticated = () => {
  return !_isEmpty(window.localStorage.getItem(TOKEN_LOGIN_KEY));
};
export default isAuthenticated;
