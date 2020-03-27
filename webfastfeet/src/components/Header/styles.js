import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  padding: 0 3rem;

  border: 1px solid rgba(0, 0, 0, 0.15);
  border-top: 2px solid rgba(0, 0, 0, 0.15);
`;

export const Content = styled.div`
  height: 50px;
  max-width: 100%;
  display: flex;
  align-items: center;

  img {
    display: flex;
    width: 80px;
    margin-right: 20px;
    min-width: 110px;
    cursor: pointer;
  }
  .selecionado {
    font-weight: bold;
  }
  nav {
    display: flex;
    align-items: center;
    height: 30px;
    border-left: 1px solid #eee;
    &:hover {
      opacity: 0.7;
    }

    a {
      /* font-weight: bold; */
      font-size: 1.2rem;
      color: #000;
      margin-left: 15px;
    }
  }
  div {
    width: 100%;
  }
  aside {
    display: flex;
    align-items: right;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 0px;
  padding-left: 0px;
  float: right;

  div {
    text-align: right;
    margin-right: 0px;

    strong {
      display: block;
      font-size: 1.2rem;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 1.2rem;
      color: #999;
    }
  }
  button {
    border: 0;
    font-size: 1.2rem;
    color: red;
  }
`;
