import React from "react";
import { useFormikContext } from "formik";

import { FormValues } from "./AppForm";
import ErrorMessage from "./ErrorMessage";
import Picker from "../Picker";
import { DimensionValue } from "react-native";

type Item = {
  label: string;
  value: number | string;
};

interface Props {
  items: Item[];
  name: string;
  numberOfColumns?: number;
  PickerItemComponent?: React.FC<{ item: Item; onPress: () => void }>;
  placeholder: string;
  width?: DimensionValue;
}

function AppFormPicker({
  items,
  name,
  numberOfColumns = 1,
  PickerItemComponent,
  placeholder,
  width = "100%",
}: Props) {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormValues>();

  return (
    <>
      <Picker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name] as unknown as Item}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={Boolean(touched[name])} />
    </>
  );
}

export default AppFormPicker;
