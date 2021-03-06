import { createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/SplashScreen";
import TimetableDetailScreen from "../screens/TimetableDetailScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import StudySpaceDetailScreen from "../screens/StudySpaceDetailScreen";

const RootStackNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    TimetableDetail: {
      screen: TimetableDetailScreen,
    },
    PersonDetail: {
      screen: PersonDetailScreen,
    },
    StudySpaceDetail: {
      screen: StudySpaceDetailScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal",
        fontFamily: "apercu",
      },
    }),
  },
);

export default RootStackNavigator;
