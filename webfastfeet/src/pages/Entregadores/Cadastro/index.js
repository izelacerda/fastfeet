import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { Form, Input } from "@rocketseat/unform";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";
import AvatarInput from "./AvatarInput";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  name: Yup.string().required("O nome é obrigatório")
});

export default function EntregadoresCadastro({ match }) {
  const { id } = match.params;
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
    try {
      await schema.validate(
        {
          name: data.name,
          email: data.email
        },
        {
          abortEarly: false
        }
      );
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
    } catch (error) {
      let validErrors = "";
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          validErrors = `${validErrors} ${err.message}`;
        });
        if (validErrors.length > 0) {
          toast.error(
            `Não foi possível ${
              id === "0" ? "incluir" : "alterar"
            } a entrega. ${validErrors}`
          );
        }
      } else {
        toast.error(
          `Não foi possível ${id === "0" ? "incluir" : "alterar"} a entrega.`
        );
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

EntregadoresCadastro.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

EntregadoresCadastro.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null
    })
  })
};
