import styled from "styled-components";

export const Container = styled.div`
  margin: 40px auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  span {
    font-size: 1.8em;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px auto;
  margin-top: 20px;
`;

export const Card = styled.div`
  background: #fff;
  height: 200px;
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 5px 10px 18px #888888;
  margin: 40px;
  cursor: pointer;
  .icone {
    border: 1;
  }
  .qtd {
    font-size: 3em;
    margin-top: 15px;
  }
  .titulo {
    font-size: 1.2em;
    margin-top: 2px;
  }
  .circulo {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #681fe1;
    text-align: center;
  }
`;
