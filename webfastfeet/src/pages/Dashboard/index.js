import React, { useState, useEffect } from "react";
import { MdDone } from "react-icons/md";

import { Container, Card, Content } from "./styles";
import api from "~/services/api";
import history from "~/services/history";

export default function Dashboard(props) {
  const [dados, setDados] = useState([]);
  useEffect(() => {
    async function loadDados() {
      const response = await api.get("dashboard");
      if (response.data) {
        setDados(response.data);
      }
    }
    loadDados();
  }, []);
  const cardClick = pagina => {
    history.push({
      pathname: `/${pagina}`
    });
  };
  return (
    <Container>
      <span>
        <strong>DashBoard</strong>
      </span>
      <Content>
        <Card onClick={() => cardClick("orders")}>
          <div className="card">
            <div className="circulo">
              <MdDone color="#fff" size={25} />
            </div>
            <div className="qtd">{dados.orders}</div>
            <div className="titulo">Encomendas</div>
          </div>
        </Card>
        <Card onClick={() => cardClick("deliveryman")}>
          <div className="card">
            <div className="circulo">
              <MdDone color="#fff" size={25} />
            </div>
            <div className="qtd">{dados.users}</div>
            <div className="titulo">Entregadores</div>
          </div>
        </Card>
        <Card onClick={() => cardClick("recipients")}>
          <div className="card">
            <div className="circulo">
              <MdDone color="#fff" size={25} />
            </div>
            <div className="qtd">{dados.recipients}</div>
            <div className="titulo">Destinatários</div>
          </div>
        </Card>
        <Card onClick={() => cardClick("problems")}>
          <div className="card">
            <div className="circulo">
              <MdDone color="#fff" size={25} />
            </div>
            <div className="qtd">{dados.orderProblems}</div>
            <div className="titulo">Problemas</div>
          </div>
        </Card>
      </Content>
    </Container>
  );
}
