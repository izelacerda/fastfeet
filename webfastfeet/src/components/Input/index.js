import React, { useRef, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";

import { useField } from "@rocketseat/unform";
import { Label } from "./styles";

export default function InputMask({ name, label, ...rest }) {
  const { fieldName, registerField, defaultValue } = useField(name);
  const [maskValue, setMaskValue] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setMaskValue(defaultValue);
      registerField({
        name,
        ref: ref.current,
        path: "value",
        setValue(ref, value) {
          ref.setInputValue(ref.value);
        }
      });
    }
  }, [defaultValue, ref]); // eslint-disable-line

  async function onChange(e) {
    setMaskValue(e);
  }
  return (
    <div>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <ReactInputMask
        ref={ref}
        value={maskValue}
        defaultValue={defaultValue}
        onChange={e => onChange(e.target.value)}
        {...rest}
      />
    </div>
  );
}
