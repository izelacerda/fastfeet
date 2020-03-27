import styled from "styled-components";

export const Container = styled.div`
  flex-direction: column;
  max-width: 700px;
  margin: 40px auto;
  margin-top: 20px;
`;
export const Head = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  strong {
    font-size: 1.2em;
  }
  .direita {
    text-align: right;
    button {
      width: 75px;
      height: 25px;
      display: inline-flex;
      align-items: center;
      background: gray;
      padding-left: 5px;
      border: 0px;
      border-radius: 4px;
      text-align: left;
      color: white;
      font-size: 0.7em;
    }
    .buttonVoltar {
      width: 75px;
      display: inline-flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding-left: 10px;
      margin-right: 10px;
      button {
        margin-left: -3px;
        background: rgba(0, 0, 0, 0);
        font-weight: bold;
      }
    }
    .buttonSalvar {
      width: 70px;
      display: inline-flex;
      align-items: center;
      background: #681fe1;
      border-radius: 4px;
      padding-left: 10px;
      button {
        margin-left: -3px;
        background: #681fe1;
        font-weight: bold;
      }
    }
  }

  .esquerda {
    text-align: left;
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  input {
    border-width: 1px;
    border-radius: 4px;
    border-color: rgba(0, 0, 0, 0.2);
    height: 34px;
    padding: 15px;
    color: rgba(0, 0, 0, 0.8);
    margin: 0px 0px 15px;
    font-size: 1.3rem;
  }
  span {
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 5px;
  }
`;
