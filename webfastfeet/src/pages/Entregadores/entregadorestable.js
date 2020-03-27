import React from "react";
import printf from "printf";
import { MdCreate, MdDeleteForever } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

import Table from "~/components/Table/table";
import Acoes from "~/components/Acoes";
import history from "~/services/history";
import api from "~/services/api";
import { dicalogin } from "~/utils/geral";

async function handleDelete(objeto) {
  try {
    await api.delete(`/deliveryman/${objeto.id}`);
    history.push({
      pathname: `/deliveryman`
    });
    toast.success("Entregador excluido!");
  } catch (error) {
    toast.error("Erro ao excluir o Entregador!");
  }
}
export default function EntregadoresTable({ dados }) {
  const acoes = [
    {
      id: 1,
      content: (objeto, handleVisible) => (
        <div
          className="labelbutton"
          onClick={() => {
            history.push({
              pathname: `/deliveryman/${objeto.id}`
            });
          }}
        >
          <MdCreate
            color="#3C6BE6"
            size={13}
            style={{ marginRight: 10, marginTop: 5 }}
          />
          <label>Editar</label>
        </div>
      )
    },
    {
      id: 2,
      content: (objeto, handleVisible) => (
        <div
          className="labelbutton"
          onClick={() => {
            handleVisible();
            confirmAlert({
              title: "Excluir",
              message: "Confirma exclusão do entregador",
              buttons: [
                {
                  label: "Sim",
                  onClick: () => {
                    handleDelete(objeto);
                  }
                },
                {
                  label: "Não"
                }
              ]
            });
          }}
        >
          <MdDeleteForever
            color="#CE252D"
            size={13}
            style={{ marginRight: 10, marginTop: 5 }}
          />
          <label>Excluir</label>
        </div>
      )
    }
  ];
  const columns = [
    {
      path: "id",
      label: "ID",
      content: objeto => <div>{printf("#%02d", objeto.id)}</div>
    },
    {
      path: "foto",
      label: "Foto",
      content: objeto => (
        <div>
          {objeto.avatar ? (
            <img src={objeto.avatar.url} alt="avatar" />
          ) : (
            <span className="nome">{dicalogin(objeto.name)}</span>
          )}
        </div>
      )
    },
    {
      path: "name",
      label: "Nome",
      content: objeto => (
        <div>
          <span>{objeto.name}</span>
        </div>
      )
    },
    { path: "email", label: "Email" },
    {
      path: "Acoes",
      label: "Ações",
      content: objeto => <Acoes acoes={acoes} item={objeto} />
    }
  ];

  return <Table columns={columns} dados={dados} />;
}
