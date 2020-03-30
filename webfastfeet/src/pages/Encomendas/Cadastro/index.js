import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { Form, Input } from "@rocketseat/unform";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";
import AsyncSelectInput from "./AsyncSelectInput";

const schema = Yup.object().shape({
  recipient_id: Yup.number().required("O destinatário é obrigatório"),
  deliveryman_id: Yup.number().required("O entregador é obrigatório"),
  product: Yup.string()
    .min(6, "Insira o nome do produto (min: 6 caracteres)")
    .required("Produto é obrigatório")
});

export default function EncomendasCadastro({ match }) {
  const { id } = match.params;
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function loadDados() {
      const response = await api.get("order", {
        params: { id }
      });

      if (response.data) {
        const resultado = response.data[0];
        setDados(resultado);
      }
    }
    if (id > 0) {
      loadDados();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      const encomenda = {
        recipient_id: data.recipient.id,
        deliveryman_id: data.deliveryman.id,
        product: data.product
      };
      await schema.validate(
        {
          recipient_id: data.recipient.id,
          deliveryman_id: data.deliveryman.id,
          product: data.product
        },
        {
          abortEarly: false
        }
      );
      if (id === "0") {
        try {
          await api.post("/order", encomenda);
          history.push({
            pathname: `/orders`
          });
          toast.success("Encomenda incluída com sucesso!");
        } catch (error) {
          toast.error("Erro ao incluir encomenda!");
        }
      } else {
        try {
          await api.put(`order/${id}`, encomenda);
          history.push({
            pathname: `/orders`
          });
          toast.success("Encomenda atualizada com sucesso!");
        } catch (error) {
          toast.error("Erro ao atualizar encomenda!");
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
            <strong>{id === "0" ? "Cadastro" : "Edição"} de encomendas</strong>
          </div>
          <div className="direita">
            <div className="buttonVoltar">
              <MdKeyboardArrowLeft color="#fff" size={25} />
              <button onClick={() => history.push("/orders")} type="button">
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
              <AsyncSelectInput
                label="Destinário"
                name="recipient.id"
                entity="recipients"
              />
            </div>
            <div className="campo1">
              <AsyncSelectInput
                label="Entregador"
                name="deliveryman.id"
                entity="deliveryman"
              />
            </div>
          </div>
          <div className="mesmalinha">
            <div className="campo2">
              <Input name="product" label="Produto" />
            </div>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

EncomendasCadastro.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

EncomendasCadastro.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null
    })
  })
};
