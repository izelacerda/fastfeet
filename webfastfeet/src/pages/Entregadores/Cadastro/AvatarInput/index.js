import React, { useState, useRef, useEffect } from "react";
import { useField } from "@rocketseat/unform";
import { MdInsertPhoto } from "react-icons/md";

import api from "~/services/api";
import { dicalogin } from "~/utils/geral";
import { Container } from "./styles";

export default function AvatarInput(props) {
  const { registerField, defaultValue } = useField("avatar");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { edicao } = props;
  const { nome } = props;

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: "avatar_id",
        ref: ref.current,
        path: "dataset.file"
      });
    }
  }, [ref]); // eslint-disable-line
  useEffect(() => {
    if (defaultValue) {
      setFile(defaultValue.id);
      setPreview(defaultValue.url);
    }
  }, [defaultValue]); // eslint-disable-line
  async function handleChange(e) {
    const data = new FormData();

    data.append("file", e.target.files[0]);
    const response = await api.post("files", data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="" />
        ) : edicao ? (
          <span className="nome">{dicalogin(nome)}</span>
        ) : (
          <div className="foto">
            <MdInsertPhoto size={50} color="#DDDDDD" />
            <strong>Adicionar foto</strong>
          </div>
        )}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
