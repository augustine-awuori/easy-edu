import React from "react";
import { useFormikContext } from "formik";

import { FormValues } from "./AppForm";
import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

function FormImagePicker({ name }: { name: string }) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormValues>();

  const imageUris = values[name] as unknown as string[];

  const handleAdd = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={Boolean(touched[name])} />
    </>
  );
}

export default FormImagePicker;
