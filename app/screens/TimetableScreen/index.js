import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import { fetchTimetable } from "../../actions/timetableActions";
import { TitleText, SubtitleText, BodyText } from "../../components/Typography";
import { MainTabPage, Horizontal, Spacer } from "../../components/Containers";
import Button, { RoundButton } from "../../components/Button";
import Colors from "../../constants/Colors";
import TimetableComponent from "./TimetableComponent";

class TimetableScreen extends Component {
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
    user: PropTypes.shape(),
    timetable: PropTypes.shape(),
    error: PropTypes.string,
    fetchTimetable: PropTypes.func,
    isFetchingTimetable: PropTypes.bool,
  };

  static defaultProps = {
    user: {},
    timetable: {},
    error: "",
    fetchTimetable: () => {},
    isFetchingTimetable: false,
  };

  static mapStateToProps = state => ({
    user: state.user,
    timetable: state.timetable.timetable,
    isFetchingTimetable: state.timetable.isFetching,
    error: state.timetable.error,
  });

  static mapDispatchToProps = dispatch => ({
    fetchTimetable: (token, date) => dispatch(fetchTimetable(token, date)),
  });

  constructor(props) {
    super(props);
    this.state = {
      date: moment().startOf("day"),
      todayLoaded: false,
    };
  }

  componentDidMount() {
    if (this.loginCheck(this.props)) {
      this.props.fetchTimetable(
        this.state.date || moment().format("YYYY-MM-DD"),
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.todayLoaded && nextProps.user.token !== "") {
      this.props.fetchTimetable(this.state.date);
      this.setState({ todayLoaded: true });
    }
  }

  loginCheck(props) {
    if (Object.keys(props.user).length > 0) {
      if (props.user.scopeNumber < 0) {
        this.props.navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Splash" })],
          }),
        );
        return false;
      }
    }
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user, timetable, isFetchingTimetable } = this.props;
    const { token, scopeNumber } = user;
    const { date } = this.state;
    const dateString = date.format("dddd, Do MMMM");
    return (
      <MainTabPage>
        {scopeNumber < 0 && (
          <View>
            <BodyText>You are not signed in.</BodyText>
            <Button onPress={() => navigate("Splash")}>Sign In</Button>
          </View>
        )}
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>{dateString}</SubtitleText>
        <Horizontal>
          <RoundButton
            onPress={async () => {
              await this.setState({
                date: this.state.date.subtract(1, "days"),
              });
              this.props.fetchTimetable(token, this.state.date);
            }}
            icon="chevron-left"
          />
          <Spacer />
          <Button
            onPress={() =>
              this.setState({
                date: moment().startOf("day"),
              })
            }
          >
            Today
          </Button>
          <Spacer />
          <RoundButton
            onPress={async () => {
              await this.setState({
                date: this.state.date.add(1, "days"),
              });
              this.props.fetchTimetable(token, this.state.date);
            }}
            icon="chevron-right"
          />
        </Horizontal>
        <TimetableComponent
          timetable={timetable}
          date={date}
          isLoading={isFetchingTimetable}
        />

        {/* <SubtitleText>Find A Timetable</SubtitleText>
        <BodyText>Coming soon.</BodyText> */}
      </MainTabPage>
    );
  }
}

export default connect(
  TimetableScreen.mapStateToProps,
  TimetableScreen.mapDispatchToProps,
)(TimetableScreen);