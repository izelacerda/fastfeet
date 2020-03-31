import React from "react";
import printf from "printf";
import { MdCreate, MdDeleteForever } from "react-icons/md";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

import Table from "~/components/Table/table";
import Acoes from "~/components/Acoes";
import history from "~/services/history";
import api from "~/services/api";

async function handleDelete(objeto) {
  if (window.confirm("Confirma exclusão do destinatario?")) {
    try {
      await api.delete(`/recipients/${objeto.id}`);
      history.push({
        pathname: `/recipients`
      });
      toast.success("Destinatário excluido!");
    } catch (error) {
      toast.error("Erro ao excluir o Destinatário!");
    }
  }
}

export default function DestinatarilosTable({ dados }) {
  const acoes = [
    {
      id: 1,
      content: (objeto, handleVisible) => (
        <div
          className="labelbutton"
          onClick={() => {
            history.push({
              pathname: `/recipients/${objeto.id}`
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
            handleDelete(objeto);
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
      path: "name",
      label: "Nome"
    },
    {
      path: "address",
      label: "Endereço",
      content: objeto => (
        <div>
          <span>
            {objeto.address}, {objeto.number} {objeto.complement},{objeto.city}-
            {objeto.state}
          </span>
        </div>
      )
    },
    {
      path: "Acoes",
      label: "Ações",
      content: objeto => <Acoes acoes={acoes} item={objeto} />
    }
  ];

  return <Table columns={columns} dados={dados} />;
}
