import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;
export const Content = styled.View`
  height: 12%;
  background: #7d3fe7;
  align-items: center;
`;
export const OrderDiv = styled.View``;

export const Card = styled.View`
  margin-top: 14px;
  padding: 15px;
  width: 90%;
  background: #fff;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.03);
`;
export const CardButtons = styled.View`
  margin-top: 14px;
  padding: 0px;
  width: 90%;
  background: #fff;
`;
export const TitleOrder = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const TitleText = styled.Text`
  color: #7d3fe7;
  font-weight: bold;
  margin-left: 4px;
`;
export const OrderLabel = styled.Text`
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  margin-top: 8px;
  font-size: 14px;
`;
export const OrderText = styled.Text`
  color: ${props => (props.canceled ? '#DE3B3B' : '#888')};
  margin-top: 6px;
  margin-bottom: 9px;
  font-size: 14px;
`;
export const OrderDate = styled.View`
  margin-top: 3px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Buttons = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: ${props => (props.space ? props.space : '0')};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
`;
export const ButtonContent = styled(RectButton)`
  flex: 1;
  align-items: center;
  height: 90px;
  padding: 10px;
  background: #f8f9fd;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
export const ButtonText = styled.Text`
  color: #888;
  margin-top: 6px;
  margin-bottom: 9px;
  font-size: 12px;
`;
