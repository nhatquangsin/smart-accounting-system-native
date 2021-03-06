import React from 'react';
import i18n from 'i18n-js';
import { View } from 'react-native';
import Item from './Item';
import Content from '../../Account/Content';

export default ({ payments, onRemove }) => (
  <View>
    {payments.map(
      ({
        _id,
        createdAt,
        type,
        category: { name },
        amountMoney,
        description,
      }) => (
        <Item onRemove={() => onRemove(_id)} key={_id} type={type}>
          <Content
            name={name}
            description={description}
            color={!type ? '#438763' : '#ad6b8d'}
            balance={amountMoney}
            balanceType={!type ? i18n.t('paymentIn') : i18n.t('paymentOut')}
            time={new Date(createdAt).toLocaleDateString(i18n.t('local'), {
              day: 'numeric',
              month: 'long',
            })}
          />
        </Item>
      )
    )}
  </View>
);
