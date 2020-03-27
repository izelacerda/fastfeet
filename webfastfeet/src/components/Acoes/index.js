import React, { useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { Container, Badge, Scroll, Action, ActionList } from "./styles";

function renderCell(acao, item, handleVisible) {
  if (acao.content) return acao.content(item, handleVisible);
  return null;
}
export default function Acoes({ acoes, item, large }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }
  return (
    <Container>
      <Badge onClick={() => handleVisible()}>
        <MdMoreHoriz color="#797979" size={20} />
      </Badge>

      <ActionList visible={visible} large={large}>
        <Scroll>
          {acoes.map(acao => (
            <Action key={acao.id}>
              {renderCell(acao, item, handleVisible)}
            </Action>
          ))}
        </Scroll>
      </ActionList>
    </Container>
  );
}
