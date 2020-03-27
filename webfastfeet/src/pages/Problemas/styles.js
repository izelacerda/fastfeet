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
  }
  .limitado {
    display: block;
    width: 700px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const FormModal = styled.div`
  display: inline-block;
  width: 400px;
  padding: 2px;
  .titulo {
    font-weight: bold;
    margin-bottom: 3px;
    font-size: 1.1rem;
  }
  p {
    display: flex;
    line-height: 20px;
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;
