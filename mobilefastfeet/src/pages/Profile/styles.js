import styled from 'styled-components/native';

import Button from '~/components/Button';
import Background from '~/components/Background';

export const Container = styled(Background)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 34.5px;
`;

export const Avatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 68px;
`;

export const AvatarName = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 25px;
  height: 120px;
  width: 120px;
  border-radius: 60px;
  background: plum;
  color: white;
  font-size: 20px;
  text-align: center;
`;
export const AvatarText = styled.Text`
  font-size: 30px;
  margin-top: 18px;
  color: rgba(0, 0, 0, 0.7);
`;
export const Content = styled.View`
  margin-top: 20.3px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  border-radius: 6px;
`;

export const Label = styled.Text`
  font-size: 11.5px;
  margin-top: 18px;
  color: rgba(0, 0, 0, 0.7);
`;

export const Info = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 2px;
`;
export const LogoutButton = styled(Button)`
  margin-top: 25px;
  background: red;
  min-width: 100%;
  height: 40px;
`;
