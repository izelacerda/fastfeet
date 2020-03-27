import React, { useState, useEffect } from "react";
import { MdAdd, MdSearch } from "react-icons/md";

import EncomendasTable from "./encomendastable";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";

export default function Encomendas() {
  const [produto, setProduto] = useState("");
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function loadDados() {
      const response = await api.get("order", {
        params: { product: produto }
      });
      setDados(response.data);
    }

    loadDados();
  }, [produto]);

  return (
    <Container>
      <Content>
        <header>
          <strong>Gerenciando encomendas</strong>
        </header>
        <div>
          <Head>
            <div className="esquerda">
              <div className="search">
                <MdSearch color="#878787" size={17} />
                <input
                  name="produto"
                  onChange={e => setProduto(e.target.value)}
                  placeholder="Buscar por encomendas"
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
                      pathname: `/orders/0`
                    })
                  }
                >
                  CADASTRAR
                </button>
              </div>
            </div>
          </Head>
        </div>
        <EncomendasTable dados={dados} />
      </Content>
    </Container>
  );
}
