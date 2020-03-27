import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;
export const Head = styled.View`
  height: 7%;
  background: #7d3fe7;
  align-items: center;
`;

export const TitleOrder = styled.View`
  background: #7d3fe7;
`;
export const TitleText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-top: 15px;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  top: -13%;
  margin-top: 6%;
`;
export const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 14px;
  padding: 15px;
  width: 100%;
  min-height: 60px;
  background: #fff;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0.03);
`;

export const ProblemText = styled.Text`
  width: 78%;
  text-align: justify;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
`;

export const CreatedText = styled.Text`
  width: 21%;
  text-align: right;
  color: rgba(0, 0, 0, 0.3);
  font-size: 12px;
`;
