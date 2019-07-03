/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { handle401 } from '../constants/strategies';
import { FeatherIcon, InterestTextInput } from '../components';
import { logout } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const url = navigation.getParam('url', '');
    const a = url.url.split('/');
    this.state = {
      password: '',
      repassword: '',
      isLoading: false,
      url: a[a.length - 1],
    };
  }

  handleGetPasswordBack = () => {};

  render() {
    const { navigation } = this.props;
    const { password, repassword, isLoading, url } = this.state;
    console.log(url);

    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>{i18n.t('messageForgetPassword')}</Typography>
            <FeatherIcon color={theme.colors.primary} name="chevron-left" />
          </Header>
        </HeaderWrapper>

        <ScrollView>
          <InterestTextInput
            label={i18n.t('password')}
            value={password}
            onChangeText={password => this.setState({ password })}
          />
          <InterestTextInput
            label={i18n.t('repassword')}
            value={repassword}
            onChangeText={repassword => this.setState({ repassword })}
          />
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={this.handleGetPasswordBack}
              loading={isLoading}
            >
              <Text>{i18n.t('actionGetPasswordBack')}</Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.employee.error,
});
const mapDispatchToProps = {
  logout,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PasswordChange)
);