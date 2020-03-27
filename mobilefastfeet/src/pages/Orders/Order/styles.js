import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  margin-bottom: 15px;
`;

export const TitleOrder = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
`;
export const TitleText = styled.Text`
  color: #7d3fe7;
  font-weight: bold;
  margin-left: 10px;
`;

export const StatusOrder = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
  margin-left: 18px;
  width: 80%;
  border: 1px solid ${props => (props.canceled ? '#DE3B3B' : '#7d3fe7')};
`;
export const StatusPoint = styled.View`
  background: ${props =>
    props.canceled ? '#DE3B3B' : props.active ? '#7d3fe7' : '#fff'};
  border: 2px solid #7d3fe7;
  border-color: ${props => (props.canceled ? '#DE3B3B' : '#7d3fe7')};
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: -5px;
`;

export const StatusText = styled.Text`
  text-align: center;
  font-size: 8px;
  padding-top: 15px;
  position: relative;
  height: 35px;
  width: 60px;
  left: -28px;
  color: rgba(0, 0, 0, 0.5);
`;
export const DataOrder = styled.View`
  background: #f8f9fd;
  width: 100%;
  margin-top: 50px;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: flex-start;
`;
export const DataColumn = styled.View``;

export const DataCabec = styled.Text`
  font-size: 8px;
  color: rgba(0, 0, 0, 0.5);
`;
export const DataText = styled.Text`
  font-size: 11px;
  font-weight: bold;
`;

export const Details = styled.Text`
  margin-top: 10px;
  font-size: 11px;
  color: ${props => (props.canceled ? '#DE3B3B' : '#7d3fe7')};
  font-weight: bold;
`;
