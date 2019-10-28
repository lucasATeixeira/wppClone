import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Conversation from "./pages/Conversation";
import AuthLoadingScreen from "./pages/AuthLoadingScreen";

const headerOptions = {
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#075e55"
    },
    headerTintColor: "#FFF"
  }
};

const AppStack = createStackNavigator(
  {
    Main,
    Conversation
  },
  headerOptions
);

const AuthStack = createStackNavigator(
  {
    Login
  },
  headerOptions
);

const mainNavigation = createSwitchNavigator({
  AuthLoadingScreen,
  AuthStack,
  AppStack
});

const Routes = createAppContainer(mainNavigation);

export default Routes;
