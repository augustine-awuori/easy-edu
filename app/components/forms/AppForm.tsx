import React, { ReactNode } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";

export interface FormValues {
  [key: string]: string;
}

interface Props {
  initialValues: FormValues;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void;
  validationSchema: Yup.ObjectSchema<any>;
  children: ReactNode;
}

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }: FormikProps<FormValues>) => (
        <form onSubmit={handleSubmit}>{children}</form>
      )}
    </Formik>
  );
}

export default AppForm;
