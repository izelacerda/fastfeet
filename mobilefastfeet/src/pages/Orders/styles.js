import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  margin-top: 46px;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background: #fff;
`;
export const HeaderLeft = styled.View``;
export const HeaderCenter = styled.View`
  flex: 1;
  padding: 10px;
  min-width: 30%;
  align-items: flex-start;
`;
export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  flex: 1;
`;
export const HeaderList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

export const Avatar = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 37px;
  background: #7d3fe7;
  margin-right: 10px;
`;
export const AvatarName = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 5px;
  height: 75px;
  width: 75px;
  border-radius: 37px;
  background: plum;
  color: white;
  font-size: 20px;
  text-align: center;
`;
export const AvatarText = styled.Text`
  font-size: 24px;
  margin-top: 18px;
  color: rgba(0, 0, 0, 0.7);
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;
export const Filter = styled.View`
  flex-direction: row;
  padding: 0;
  height: 20px;
`;
export const FilterView = styled.View`
  margin-right: 5px;
  border-bottom-width: ${props => (props.filter ? '1px' : '0')};
  border-bottom-color: ${props => (props.filter ? '#7d3fe7' : '#fff')};
  padding: 0;
`;
export const FilterText = styled.Text`
  color: ${props => (props.filter ? '#7d3fe7' : '#999')};
  font-weight: bold;
  font-size: 13px;
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
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  width: 100%;
`;
