import React, { useState, useEffect } from "react";

import ProblemasTable from "./problemastable";
import { Container, Content } from "./styles";
import api from "~/services/api";

export default function Destinatarios() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function loadDados() {
      const response = await api.get("order/problems");
      setDados(response.data);
    }

    loadDados();
  }, []);

  return (
    <Container>
      <Content>
        <header>
          <strong>Problemas na entrega</strong>
        </header>
        <ProblemasTable dados={dados} />
      </Content>
    </Container>
  );
}
