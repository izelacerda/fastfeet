import React, { useState, useEffect } from "react";
import { MdAdd, MdSearch } from "react-icons/md";

import EntregadoresTable from "./entregadorestable";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";

export default function Entregadores() {
  const [pesquisa, setPesquisa] = useState("");
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function loadDados() {
      const response = await api.get("deliveryman", {
        params: { name: pesquisa }
      });
      setDados(response.data);
    }

    loadDados();
  }, [pesquisa]);

  return (
    <Container>
      <Content>
        <header>
          <strong>Gerenciando entregadores</strong>
        </header>
        <div>
          <Head>
            <div className="esquerda">
              <div className="search">
                <MdSearch color="#878787" size={17} />
                <input
                  name="pesquisa"
                  onChange={e => setPesquisa(e.target.value)}
                  placeholder="Buscar por entregadores"
                />
              </div>
            </div>
            <div className="direita">
              <div className="labelbutton">
                <MdAdd color="#fff" size={17} />
                <button
                  type="button"
                  onClick={() =>
                    history.push({
                      pathname: `/deliveryman/0`
                    })
                  }
                >
                  CADASTRAR
                </button>
              </div>
            </div>
          </Head>
        </div>
        <EntregadoresTable dados={dados} history />
      </Content>
    </Container>
  );
}
