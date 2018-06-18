import React, { Component } from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { TitleText } from "../../components/Typography";
import { MainTabPage } from "../../components/Containers";
import Colors from "../../constants/Colors";

import SearchControl from "./SearchControl";
import RecentResults from "./RecentResults";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="users"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static mapStateToProps = state => ({
    searchResults: state.people.searchResults,
    isSearching: state.people.isSearching,
  });

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    const { navigation } = this.props;
    return (
      <MainTabPage>
        <TitleText>People</TitleText>
        <SearchControl navigation={navigation} />
        <RecentResults navigation={navigation} />
      </MainTabPage>
    );
  }
}

export default TimetableScreen;
