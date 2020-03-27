import React, { useState } from "react";
import printf from "printf";
import { MdVisibility, MdCreate, MdDeleteForever } from "react-icons/md";
import Modal from "react-modal";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";
import { dicalogin } from "~/utils/geral";

import Table from "~/components/Table/table";
import Acoes from "~/components/Acoes";
import { FormModal } from "./styles";
import api from "~/services/api";
import history from "~/services/history";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.7)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "white",
    opacity: 1,
    transform: "translate(-50%, -50%)"
  }
};

async function handleDelete(objeto) {
  try {
    await api.delete(`/order/${objeto.id}`);
    history.push({
      pathname: `/orders`
    });
    toast.success("Encomenda excluída!");
  } catch (error) {
    toast.error("Erro ao excluir o Encomenda!");
  }
}

function formatData(data) {
  const dataFormatada = format(parseISO(data), "dd/MM/yyyy", { locale: pt });
  return dataFormatada;
}

export default function EncomendasTable({ dados }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [telaModal, setModal] = useState(null);

  function openModal(objeto, handleVisible) {
    setIsOpen(true);
    handleVisible();
    const telaAux = (
      <FormModal>
        <div>
          <strong>informações da encomenda</strong>{" "}
        </div>
        <div className="texto">
          {objeto.recipient.address}, {objeto.recipient.number}
        </div>
        <div className="texto">
          {objeto.recipient.city} - {objeto.recipient.state}
        </div>
        <div className="texto">{objeto.recipient.zipcode}</div>
        <div className="sublinhado" />
        <div className="titulo">Datas</div>
        <div>
          <strong>Retirada: </strong>
          <span>{formatData(objeto.start_date)}</span>
        </div>
        <div>
          <strong>Entrega: </strong>
          <span>{formatData(objeto.end_date)}</span>
        </div>
        <div className="sublinhado" />
        <div>
          <strong>Assinatura do destinatário</strong>{" "}
        </div>
        <div>
          {objeto.signature ? (
            <img src={objeto.signature.url} alt="signature" />
          ) : null}
        </div>
      </FormModal>
    );
    setModal(telaAux);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const acoes = [
    {
      id: 1,
      content: (objeto, handleVisible) => (
        <div
          className="labelbutton"
          onClick={() => openModal(objeto, handleVisible)}
        >
          <MdVisibility
            color="#793CE1"
            size={13}
            style={{ marginRight: 10, marginTop: 5 }}
          />
          <label>Visualizar</label>
        </div>
      )
    },
    {
      id: 2,
      content: (objeto, handleVisible) => (
        <div
          className="labelbutton"
          onClick={() => {
            history.push({
              pathname: `/orders/${objeto.id}`
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
      id: 3,
      content: (objeto, handleVisible) => (
        <div
          className="labelbutton"
          onClick={() => {
            handleVisible();
            confirmAlert({
              title: "Excluir",
              message: "Confirma exclusão do encomenda",
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
      content: encomenda => <div>{printf("#%02d", encomenda.id)}</div>
    },
    { path: "recipient.name", label: "Destinatário" },
    {
      path: "deliveryman.name",
      label: "Entregador",

      content: encomenda => (
        <div>
          {encomenda.deliveryman.avatar ? (
            <img src={encomenda.deliveryman.avatar.url} alt="avatar" />
          ) : (
            <span className="nome">
              {dicalogin(encomenda.deliveryman.name)}
            </span>
          )}
          <span>{encomenda.deliveryman.name}</span>
        </div>
      )
    },
    { path: "recipient.city", label: "Cidade" },
    { path: "recipient.state", label: "Estado" },
    {
      path: "status",
      label: "Status",
      content: encomenda => (
        <span className={encomenda.status}>
          <span className="ponto">. </span>
          {encomenda.status}
        </span>
      )
    },
    {
      path: "Acoes",
      label: "Ações",
      content: encomenda => <Acoes acoes={acoes} item={encomenda} />
    }
  ];
  return (
    <>
      <Table columns={columns} dados={dados} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="ENCOMENDA"
      >
        {telaModal}
      </Modal>
    </>
  );
}
