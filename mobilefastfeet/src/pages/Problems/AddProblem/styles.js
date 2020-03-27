import styled from 'styled-components/native';
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
  padding: 15px;
  width: 90%;
  background: #fff;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0.03);
`;

export const InputProblem = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.5)',
})`
  text-align: left;
  color: #666;
  height: 340px;
  line-height: 20px;
  border-radius: 5px;
  font-size: 16px;
`;

export const SendButton = styled(Button)`
  margin-top: 16px;
  min-width: 90%;
  margin: 15px;
  background: #7d3fe7;
`;
