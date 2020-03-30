import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdDone } from "react-icons/md";
import { toast } from "react-toastify";

import { Form, Input } from "@rocketseat/unform";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";
import InputMask from "~/components/Input";

export default function DestinatariosCadastro(props) {
  const { id } = props.match.params;
  const [dados, setDados] = useState([]);
  useEffect(() => {
    async function loadDados() {
      const response = await api.get("recipients", {
        params: { id }
      });
      if (response.data && response.data.length > 0) {
        setDados(response.data[0]);
      }
    }
    if (id > 0) {
      loadDados();
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id === "0") {
      try {
        await api.post("/recipients", data);
        history.push({
          pathname: `/recipients`
        });
        toast.success("Destinatário incluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao incluir destinatário!");
      }
    } else {
      try {
        await api.put(`recipients/${id}`, data);
        history.push({
          pathname: `/recipients`
        });
        toast.success("Destinatário atualizado com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar destinatário!");
      }
    }
  }
  return (
    <Container>
      <Form initialData={dados} onSubmit={handleSubmit}>
        <Head>
          <div className="esquerda">
            <strong>
              {id === "0" ? "Cadastro" : "Edição"} de destinatário
            </strong>
          </div>
          <div className="direita">
            <div className="buttonVoltar">
              <MdKeyboardArrowLeft color="#fff" size={25} />
              <button onClick={() => history.push("/recipients")} type="button">
                VOLTAR
              </button>
            </div>
            <div className="buttonSalvar">
              <MdDone color="#fff" size={25} />
              <button type="submit">SALVAR</button>
            </div>
          </div>
        </Head>
        <Content>
          <div className="mesmalinha">
            <div className="campo1">
              <Input name="name" label="Name" />
            </div>
          </div>
          <div className="mesmalinha">
            <div className="campo2">
              <Input name="address" label="Endereço" />
            </div>
            <div className="campo3">
              <Input name="number" label="Número" />
            </div>
            <div className="campo3">
              <Input name="complement" label="Complemento" />
            </div>
          </div>
          <div className="mesmalinha">
            <div className="campo4">
              <Input name="city" label="Cidade" />
            </div>
            <div className="campo4">
              <Input name="state" label="Estado" />
            </div>
            <div className="campo4">
              <InputMask
                label="CEP"
                name="zipcode"
                type="text"
                placeholder="00000-000"
                mask="99999-999"
              />
            </div>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
