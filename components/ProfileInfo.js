import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import FeatherIcon from './FeatherIcon';
import theme from '../constants/theme';

export default class ProfileInfo extends React.Component {
  render() {
    const { name, info, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ margin: 20 }}>
            <FeatherIcon color={theme.colors.grey} name={name} size={30} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: 'grey',
              borderBottomWidth: info === 'Logout' ? 0 : 0.5,
              width: '80%',
            }}
          >
            <Text style={{ fontSize: 16 }}>{info}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}