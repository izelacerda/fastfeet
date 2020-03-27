import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Form } from "@rocketseat/unform";
import * as Yup from "yup";

import { signInRequest } from "~/store/modules/auth/actions";
import logo from "~/assets/fastfeet-logo.svg";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "Insira uma senha válida")
    .required("A senha é obrigatória")
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="fastfeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <span>SEU E-MAIL</span>
        <Input name="email" type="email" />
        <span>SUA SENHA</span>
        <Input name="password" type="password" />

        <button type="submit">
          {loading ? "Carregando..." : "Entrar no sistema"}
        </button>
        {/* <Link to="/register">Criar conta gratuita</Link> */}
      </Form>
    </>
  );
}
