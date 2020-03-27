import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: grid;
  max-width: 80%;
  margin: 30px auto;
  strong {
    font-size: 1.8rem;
  }
  table {
    /* overflow: hidden; */
    border-collapse: separate;
    border-spacing: 0px 15px;
    border-width: 1px;
    border-radius: 14px;
  }
  thead tr {
    color: #000;
    font-weight: bold;
  }

  th,
  td {
    text-align: left;
    padding: 0px 0px 0px 15px;
  }
  .nome {
    display: inline-block;
    font-size: 1em;
    width: 2.5em;
    height: 2.5em;
    line-height: 2.5em;
    text-align: center;
    border-radius: 50%;
    background: plum;
    vertical-align: middle;
    margin-right: 1em;
    color: white;
  }
  .ponto {
    background: rgba(255, 0, 0, 0.2);
    display: inline-block;
    font-size: 4.5em;
    vertical-align: center;
    line-height: 0em;
  }

  .PENDENTE {
    background: rgba(0, 255, 0, 0.2);
    border: 0px solid rgba(0, 255, 0);
    border-radius: 20px;
    padding: 2px 5px 2px 2px;
    color: rgba(0, 255, 0);
    vertical-align: middle;
  }
  .CANCELADO {
    background: rgba(255, 0, 0, 0.2);
    border: 0px solid rgba(255, 0, 0);
    border-radius: 20px;
    padding: 2px 5px 2px 2px;
    color: rgba(255, 0, 0);
    vertical-align: middle;
  }
  .RETIRADO {
    background: rgba(0, 0, 255, 0.2);
    border: 0px solid rgba(0, 0, 255);
    border-radius: 20px;
    padding: 2px 5px 2px 2px;
    color: rgba(0, 0, 255);
  }
  .ENTREGUE {
    background: rgba(100, 0, 255, 0.2);
    border: 0px solid rgba(100, 0, 255);
    border-radius: 20px;
    padding: 2px 5px 2px 2px;
    color: rgba(100, 0, 255);
  }
  tbody tr {
    background: #ffffff;
    line-height: 2.5em;
    td {
      padding: 5px 0px 5px 15px;
      text-align: left;
      font-size: 1.1rem;
      color: #797979;
      font-weight: bold;
    }
    img {
      display: inline-block;
      width: 2.5em;
      height: 2.5em;
      line-height: 2.5em;
      text-align: center;
      border-radius: 50%;
      background: plum;
      vertical-align: middle;
      margin-right: 1em;
      color: white;
    }
  }
`;

export const Head = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
  margin: 20px 0px;

  .direita {
    text-align: right;
    button {
      width: 100%;
      height: 25px;
      text-align: left;
      background: #681fe1;
      color: white;
      border: 0px;
      border-radius: 4px;
      padding-left: 2px;
      font-size: 0.8em;
    }
    .labelbutton {
      width: 100px;
      display: inline-flex;
      align-items: center;
      background: #681fe1;
      border-radius: 4px;
      padding-left: 5px;
    }
  }

  .esquerda {
    text-align: left;
  }

  .lupa {
    width: 12px;
  }
  .search {
    display: flex;
    background-color: #fff;
    padding-left: 5px;
    text-align: center;
    align-items: center;
    width: 180px;
    height: 30px;
    border: 1px solid #e6ecf0;
    border-radius: 4px;
    /* align-items: center; */
    input {
      margin: 0px 5px;
      vertical-align: center;
      border: 0px;
      width: 150px;
      font-size: 0.8em;
    }
  }
`;

export const FormModal = styled.div`
  display: inline-block;
  line-height: 1.5em;
  width: 400px;
  padding: 2px;
  .titulo {
    font-weight: bold;
  }

  .texto {
    color: rgba(0, 0, 0, 0.6);
  }
  span {
    color: rgba(0, 0, 0, 0.6);
  }

  .sublinhado {
    margin: 7px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07)};
  }
  img {
    margin-left: 25%;
    height: 100px;
    width: 200px;
  }
`;
