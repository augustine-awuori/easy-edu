import React, { useState } from "react";
import { StyleSheet } from "react-native";
import \* as Yup from "yup";

import {
Form,
FormField,
// FormPicker as Picker,
SubmitButton,
} from "../components/forms";
import { Course } from "../services/data";
// import CategoryPickerItem from "../components/CategoryPickerItem";
import coursesApi from "../api/courses";
import Screen from "../components/Screen";
// import FormImagePicker from "../components/forms/FormImagePicker";
// import UploadScreen from "./UploadScreen";
import { FormikHelpers } from "formik";
import { FormValues } from "../components/forms/AppForm";
// import { Item } from "../components/forms/FormPicker";

const validationSchema = Yup.object().shape({
title: Yup.string().required().min(1).label("Title"),
price: Yup.number().required().min(1).max(10000).label("Price"),
description: Yup.string().label("Description"),
category: Yup.object().required().nullable().label("Category"),
// images: Yup.array().min(1, "Please select at least one image."),
});

const categories =
// : Item[]
[
{
backgroundColor: "#fc5c65",
icon: "floor-lamp",
label: "Furniture",
value: 1,
},
{
backgroundColor: "#fd9644",
icon: "car",
label: "Cars",
value: 2,
},
{
backgroundColor: "#fed330",
icon: "camera",
label: "Cameras",
value: 3,
},
{
backgroundColor: "#26de81",
icon: "cards",
label: "Games",
value: 4,
},
{
backgroundColor: "#2bcbba",
icon: "shoe-heel",
label: "Clothing",
value: 5,
},
{
backgroundColor: "#45aaf2",
icon: "basketball",
label: "Sports",
value: 6,
},
{
backgroundColor: "#4b7bec",
icon: "headphones",
label: "Movies & Music",
value: 7,
},
{
backgroundColor: "#a55eea",
icon: "book-open-variant",
label: "Books",
value: 8,
},
{
backgroundColor: "#778ca3",
icon: "application",
label: "Other",
value: 9,
},
];

export type CourseInfo = Yup.InferType<typeof validationSchema>;

function CourseEditScreen() {
const [uploadVisible, setUploadVisible] = useState(false);
const [progress, setProgress] = useState(0);

const handleSubmit = async (
course: CourseInfo,
{ resetForm }: FormikHelpers<FormValues>
) => {
setProgress(0);
setUploadVisible(true);
const result = await coursesApi.addCourse({ ...course }, (progress) =>
setProgress(progress)
);

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();

};

return (
<Screen style={styles.container}>
{/_ <UploadScreen
onDone={() => setUploadVisible(false)}
progress={progress}
visible={uploadVisible}
/> _/}
<Form
initialValues={{
          title: "",
          price: "",
          description: "",
          category: "",
        }}
onSubmit={(info, config) =>
handleSubmit(info as unknown as CourseInfo, config)
}
validationSchema={validationSchema} >
{/_ <FormImagePicker name="images" /> _/}
<FormField maxLength={255} name="title" placeholder="Title" />
{/_ <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
<Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        /> _/}
<FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
<SubmitButton title="Post" />
</Form>
</Screen>
);
}

const styles = StyleSheet.create({
container: {
padding: 10,
},
});
export default CourseEditScreen;
