import styled from "styled-components";
import { lighten, darken } from "polished";

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  border: 0;
  background: none;
  position: relative;
`;

export const ActionList = styled.div`
  position: absolute;
  width: ${props => (props.large ? "150px" : "100px")};
  transform: ${props =>
    props.large ? "translateX(-40%)" : "translateX(-35%)"};
  background: rgba(255, 255, 255, 0.9);
  z-index: 2;
  border: 1px solid ${lighten(0.2, "#797979")};
  border-radius: 4px;
  padding: 8px 5px;
  display: ${props => (props.visible ? "block" : "none")};

  &::before {
    display: block;
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: -6px;
    right: 0;
    bottom: 0;
    left: calc(50% - 10px);
    background: #fff;
    border: 1px solid ${lighten(0.2, "#797979")};
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
    -webkit-transform: rotate(45deg);
  }
`;

export const Scroll = styled.div`
  div:last-child {
    .labelbutton {
      border-bottom: 0px;
    }
`;

export const Action = styled.div`
  color: #797979;
  background: #fff;
  line-height: 2.1em;
  &:hover {
    background: ${darken(0.1, "#fff")};
  }
  .labelbutton {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
`;
