import { ROUTE_PATHS, ROUTE_KEYS } from "./constants/route-constants";
import HomepageView from "./views/homepage-view";
import SubscriptionView from "./views/subcription-view";
import ErrorView from "./views/error-view";
import SignUpView from "./views/signup-view";
import LoginView from "./views/login-view";
import FavouriteListView from "./views/favourite-list-view";
const Routes = {
  homepage: {
    key: ROUTE_KEYS.homepage,
    path: ROUTE_PATHS.homepage,
    component: HomepageView,
  },
  subscription: {
    key: ROUTE_KEYS.subscription,
    path: ROUTE_PATHS.subscription,
    component: SubscriptionView,
  },
  errors: {
    key: ROUTE_KEYS.errors,
    path: ROUTE_PATHS.errors,
    component: ErrorView,
  },
  register: {
    key: ROUTE_KEYS.register,
    path: ROUTE_PATHS.register,
    component: SignUpView,
  },
  login: {
    key: ROUTE_KEYS.login,
    path: ROUTE_PATHS.login,
    component: LoginView,
  },
  favourites: {
    key: ROUTE_KEYS.favourites,
    path: ROUTE_PATHS.favourites,
    component: FavouriteListView,
  },
};

export default Routes;
