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
  margin-top: 10px;
  padding: 10px;

  div {
    .campo1 {
      width: 100%;
    }
    .campo2 {
      width: 60%;
      margin-right: 2%;
    }
    .campo3 {
      width: 18%;
      margin-right: 2%;
    }
    .campo4 {
      width: 32%;
      margin-right: 2%;
    }
  }
  .mesmalinha {
    display: flexbox;
    flex-direction: row;
    margin: 10px;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    input {
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 30px;
      width: 100%;
      padding: 10px;
      margin: 0px 5px 0px 0px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;
