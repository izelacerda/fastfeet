import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { Form, Input } from "@rocketseat/unform";
import { Container, Content, Head } from "./styles";
import api from "~/services/api";
import history from "~/services/history";
import InputMask from "~/components/Input";

const schema = Yup.object().shape({
  name: Yup.string().required("É obrigatório informar o nome"),
  address: Yup.string().required("É obrigatório informar o endereço"),
  number: Yup.number("É obrigatório informar o número válido").required(
    "É obrigatório informar o número"
  ),
  state: Yup.string().required("É obrigatório informar o Estado "),
  city: Yup.string().required("É obrigatório informar a cidade"),
  zipcode: Yup.string().required("É obrigatório informar o CEP")
});

export default function DestinatariosCadastro({ match }) {
  const { id } = match.params;
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
    try {
      await schema.validate(
        {
          name: data.name,
          address: data.address,
          number: data.number,
          state: data.state,
          city: data.city,
          zipcode: data.zipcode
        },
        {
          abortEarly: false
        }
      );
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
      <Form initialData={dados} onSubmit={handleSubmit} schema={schema}>
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
DestinatariosCadastro.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

DestinatariosCadastro.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null
    })
  })
};
