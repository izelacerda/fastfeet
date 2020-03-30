import styled from "styled-components";
import InputMask from "react-input-mask";

export const Label = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
`;

export const ReactInputMask = styled(InputMask)`
  background: rgba(255, 255, 255, 1);
  border: 1px solid #000;
  border-radius: 4px;
  height: 40px;
  padding: 0 15px;
  width: 100%;
`;
