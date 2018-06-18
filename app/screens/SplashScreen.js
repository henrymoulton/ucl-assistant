import React, { Component } from "react";
import { Alert, Image } from "react-native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions, StackActions } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { signIn } from "../actions/userActions";
import { TitleText, BodyText, ButtonText } from "../components/Typography";
import { Spacer, Horizontal } from "../components/Containers";
import CustomButton from "../components/Button";
import Colors from "../constants/Colors";
import Styles from "../styles/Containers";
import SplashStyle from "../styles/Splash";

class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    isSigningIn: PropTypes.bool,
    error: PropTypes.string,
    token: PropTypes.string,
    signIn: PropTypes.func,
  };

  static defaultProps = {
    isSigningIn: false,
    error: "",
    token: "",
    signIn: () => {},
  };

  static mapStateToProps = state => ({
    isSigningIn: state.user.signIn.isSigningIn,
    isAlumni: state.user.alumni,
    error: state.user.signIn.error,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
  });

  componentDidMount() {
    // REMOVE REQUIRED LOGIN
    if (this.props.token !== "" || this.props.isAlumni) {
      console.log(
        `Component just mounted. Going to home. reason? token = ${
          this.props.token
        }`,
      );
      this.goHome();
    }
  }

  componentDidUpdate(prevProps) {
    // REMOVE REQUIRED LOGIN
    if (this.props.token !== "" || this.props.isAlumni) {
      this.goHome();
    }

    if (prevProps.isSigningIn === true && this.props.isSigningIn === false) {
      // did we just sign in?
      if (this.props.token !== null) {
        // yes, replace screen with home screen.
        this.goHome();
      } else if (this.props.error.length < 1) {
        // cancelled
      } else {
        // error
        setTimeout(
          () => Alert.alert("Error Signing In", this.props.error),
          500,
        );
      }
    }
  }

  goHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Main" })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <LinearGradient
        colors={[Colors.accentColor, Colors.buttonBackground]}
        style={[Styles.page, SplashStyle.page]}
        start={[0, 1]}
        end={[1, 0]}
      >
        <TitleText style={SplashStyle.text}>UCL Assistant</TitleText>
        <BodyText style={SplashStyle.text}>
          One app to manage your life at UCL.
        </BodyText>
        <Image
          source={require("../assets/images/undraw_calendar.png")}
          resizeMethod="scale"
          style={Styles.image}
          resizeMode="contain"
        />
        <Spacer />
        <CustomButton
          onPress={() => this.props.signIn()}
          loading={this.props.isSigningIn}
          style={SplashStyle.button}
        >
          <Horizontal>
            <Image
              source={require("../assets/images/uclapi.png")}
              resizeMethod="scale"
              resizeMode="contain"
              style={[Styles.image, SplashStyle.uclapiImage]}
            />
            <ButtonText style={SplashStyle.buttonText}>
              Sign In With UCL API
            </ButtonText>
          </Horizontal>
        </CustomButton>
      </LinearGradient>
    );
  }
}

export default connect(
  SplashScreen.mapStateToProps,
  SplashScreen.mapDispatchToProps,
)(SplashScreen);
