import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/SignIn";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Encomendas from "../pages/Encomendas";
import Entregadores from "../pages/Entregadores";
import EntregadoresCadastro from "../pages/Entregadores/Cadastro";
import Destinatarios from "../pages/Destinatarios";
import DestinatariosCadastro from "../pages/Destinatarios/Cadastro";
import EncomendasCadastro from "../pages/Encomendas/Cadastro";

import Problemas from "../pages/Problemas";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/orders" exact component={Encomendas} isPrivate />
      <Route
        path="/orders/:id"
        exact
        component={EncomendasCadastro}
        isPrivate
      />
      <Route path="/deliveryman" exact component={Entregadores} isPrivate />
      <Route
        path="/deliveryman/:id"
        exact
        component={EntregadoresCadastro}
        isPrivate
      />

      <Route path="/recipients" exact component={Destinatarios} isPrivate />
      <Route
        path="/recipients/:id"
        exact
        component={DestinatariosCadastro}
        isPrivate
      />
      <Route path="/problems" component={Problemas} isPrivate />

      <Route path="/" component={() => <h1>Página não existe</h1>} />
    </Switch>
  );
}
