import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    display: flex;
    align-items: left;
    height: 8.5%;
    margin-top: 50px;
    margin-left: 20px;
    min-width: 250px;
  }
`;

export const Content = styled.div`
  width: 300px;
  height: 400px;
  background: #fff;
  margin-top: 10%px;
  text-align: center;
  border: 0;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    margin-left: 25px;
    margin-right: 25px;

    input {
      border-width: 1px;
      border-radius: 4px;
      border-color: rgba(0, 0, 0, 0.2);
      height: 34px;
      padding: 15px;
      color: rgba(0, 0, 0, 0.3);
      margin: 0 0 10px;
      font-size: 1.3rem;
    }
    span {
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      font-size: 1.2rem;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      border: 0;
      color: #fff;
      border-radius: 4px;
      font-weight: bold;
      font-size: 1.6rem;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, "#7d40e7")};
      }
    }

    a {
      color: #fff;
      margin-top: 10px;
      font-size: 1.6rem;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
