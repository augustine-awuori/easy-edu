import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

interface Props {
  title: string;
}

function SubmitButton({ title }: Props) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} color="secondary" />;
}

export default SubmitButton;
