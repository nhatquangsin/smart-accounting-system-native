import React from 'react';
import styled from 'styled-components/native';

export const ContentWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border-color: purple;
  border-width: 3px;
  margin: 20px;
`;

export const AvatarTypography = styled.Text`
  color: purple;
  font-size: 30px;
`;

export const InforWrapper = styled.View`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey};
  margin-top: 20px;
  width: 100%;
`;
