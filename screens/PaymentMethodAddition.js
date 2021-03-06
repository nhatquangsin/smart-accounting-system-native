/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { withTheme, Button, HelperText } from 'react-native-paper';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import theme from '../constants/theme';
import { FeatherIcon, InterestTextInput } from '../components';
import { handle401 } from '../constants/strategies';
import { logout, addCategory, updateCategory } from '../redux/actions';
import { Header, Typography, HeaderWrapper } from '../containers/Home';
import { FewStyledContainer } from '../containers/PaymentMethodAddition';

class PaymentMethodAddition extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const { _id, name, detail } = navigation.getParam('category', '');
    this._id = _id;
    this.state = {
      name: name || '',
      detail: detail || '',
      isVisible: false,
    };
  }

  handleAddPaymentMethod = () => {
    const { name, detail } = this.state;
    this.props.addCategory(
      { name, detail },
      {
        success: () => this.props.navigation.navigate('PaymentMethod'),
        failure: () => {
          this.setState({
            isVisible: true,
          });
        },
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  handleUpdate = () => {
    const { name, detail } = this.state;
    this.props.updateCategory(
      this._id,
      { name, detail },
      {
        success: () => this.props.navigation.goBack(),
        failure: () =>
          this.setState({
            isVisible: true,
          }),
        handle401: () =>
          handle401({
            logout: this.props.logout,
            navigation: this.props.navigation,
          }),
      }
    );
  };

  render() {
    const { navigation, isLoading } = this.props;
    const { name, detail, isVisible } = this.state;
    return (
      <View style={{ display: 'flex', flex: 1 }}>
        <HeaderWrapper>
          <Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentMethod')}
            >
              <FeatherIcon color={theme.colors.white} name="chevron-left" />
            </TouchableOpacity>
            <Typography>
              {this._id
                ? i18n.t('paymentMethodUpdate')
                : i18n.t('paymentMethodAddition')}
            </Typography>
            <FeatherIcon color={theme.colors.primary} name="user" />
          </Header>
        </HeaderWrapper>
        <ScrollView>
          <InterestTextInput
            label={i18n.t('name')}
            value={name}
            onChangeText={name => this.setState({ name, isVisible: false })}
          />
          <InterestTextInput
            label={i18n.t('detail')}
            numberOfLines={3}
            multiline
            value={detail}
            onChangeText={detail => this.setState({ detail, isVisible: false })}
          />
          <FewStyledContainer>
            <HelperText type="error" visible={isVisible}>
              {this._id
                ? i18n.t('messageUpdateFail')
                : i18n.t('messageAddFail')}
            </HelperText>
          </FewStyledContainer>
          <FewStyledContainer paddingTop>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 50 }}
              onPress={
                this._id ? this.handleUpdate : this.handleAddPaymentMethod
              }
              loading={isLoading}
            >
              <Text>
                {this._id ? i18n.t('actionUpdate') : i18n.t('actionSave')}
              </Text>
            </Button>
          </FewStyledContainer>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.category.isLoading,
});
const mapDispatchToProps = {
  logout,
  addCategory,
  updateCategory,
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaymentMethodAddition)
);
