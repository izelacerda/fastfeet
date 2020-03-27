import React, { useState } from "react";
import printf from "printf";
import { MdVisibility, MdDeleteForever } from "react-icons/md";
import Modal from "react-modal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { toast } from "react-toastify";

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
async function handleCancel(objeto) {
  try {
    await api.put(`/order/${objeto.order_id}/cancel`);
    history.push({
      pathname: `/problems`
    });
    toast.success("Encomenda cancelada!");
  } catch (error) {
    toast.error("Erro ao cancelar o Encomenda!");
  }
}
export default function ProblemasTable({ dados }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [telaModal, setModal] = useState(null);

  function openModal(objeto, handleVisible) {
    setIsOpen(true);
    handleVisible();
    const telaAux = (
      <FormModal>
        <div className="titulo">VISUALIZAR PROBLEMA</div>
        <p>{objeto.description}</p>
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
            handleVisible();
            confirmAlert({
              title: "Cancelar",
              message: "Confirma cancelamento da encomenda",
              buttons: [
                {
                  label: "Sim",
                  onClick: () => {
                    handleCancel(objeto);
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
          <label>Cancelar encomenda</label>
        </div>
      )
    }
  ];
  const columns = [
    {
      path: "id",
      label: "Encomenda",
      content: objeto => <div>{printf("#%02d", objeto.order_id)}</div>
    },
    {
      path: "description",
      label: "Nome",
      content: objeto => <span className="limitado">{objeto.description}</span>
    },
    {
      path: "Acoes",
      label: "Ações",
      content: objeto => <Acoes acoes={acoes} item={objeto} large />
    }
  ];
  return (
    <>
      <Table columns={columns} dados={dados} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="VISUALIZAR PROBLEMA"
      >
        {telaModal}
      </Modal>
    </>
  );
}
