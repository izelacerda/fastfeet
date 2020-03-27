import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Content = styled.View`
  height: 12%;
  background: #7d3fe7;
  align-items: center;
`;
export const ProblemDiv = styled.View``;
export const Card = styled.View`
  margin-top: 14px;
  width: 90%;
  min-height: 80%;
  background: #000;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.03);
`;
export const Camera = styled(RNCamera)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  opacity: 0.6;
`;
export const TakePicture = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
export const SendButton = styled(Button)`
  margin-top: 16px;
  min-width: 100%;
  background: #7d3fe7;
`;
