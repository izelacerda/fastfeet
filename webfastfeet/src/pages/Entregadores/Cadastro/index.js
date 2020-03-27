import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdDone } from "react-icons/md";
import { toast } from "react-toastify";

import { Form, Input } from "@rocketseat/unform";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";
import AvatarInput from "./AvatarInput";

export default function EntregadoresCadastro(props) {
  const { id } = props.match.params;
  const [dados, setDados] = useState([]);
  const edicao = id > 0;
  useEffect(() => {
    async function loadDados() {
      const response = await api.get("deliveryman", {
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
    if (!edicao) {
      try {
        const response = await api.get("deliveryman", {
          params: { email: data.email }
        });

        if (response.data && response.data.length > 0) {
          toast.error("email ja utilizado em outro entregador!");
        } else {
          await api.post("/deliveryman", data);
          history.push({
            pathname: `/deliveryman`
          });
          toast.success("Entregador incluído com sucesso!");
        }
      } catch (error) {
        toast.error("Erro ao incluir entregador!");
      }
    } else {
      try {
        await api.put(`deliveryman/${id}`, data);
        history.push({
          pathname: `/deliveryman`
        });
        toast.success("Entregador atualizado com sucesso!");
      } catch (error) {
        toast.error("Erro ao atualizar entregador!");
      }
    }
  }
  return (
    <Container>
      <Form initialData={dados} onSubmit={handleSubmit}>
        <Head>
          <div className="esquerda">
            <header>
              <strong>{!edicao ? "Cadastro" : "Edição"} de entregadores</strong>
            </header>
          </div>
          <div className="direita">
            <div className="buttonVoltar">
              <MdKeyboardArrowLeft color="#fff" size={25} />
              <button
                onClick={() => history.push("/deliveryman")}
                type="button"
              >
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
          <AvatarInput name="avatar_id" edicao={edicao} nome={dados.name} />
          <span>Nome</span>
          <Input name="name" placeholder="Nome completo" />
          <span>E-mail</span>
          <Input
            name="email"
            type="email"
            placeholder="Seu endereço de e-mail"
          />
        </Content>
      </Form>
    </Container>
  );
}
