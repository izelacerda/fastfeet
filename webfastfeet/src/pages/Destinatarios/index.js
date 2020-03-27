import React, { useState, useEffect } from "react";
import { MdAdd, MdSearch } from "react-icons/md";

import DestinatariosTable from "./destinatariostable";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";

export default function Destinatarios() {
  const [pesquisa, setPesquisa] = useState("");
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function loadDados() {
      const response = await api.get("recipients", {
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
          <strong>Gerenciando destinatários</strong>
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
                      pathname: `/recipients/0`
                    })
                  }
                >
                  CADASTRAR
                </button>
              </div>
            </div>
          </Head>
        </div>
        <DestinatariosTable dados={dados} />
      </Content>
    </Container>
  );
}
