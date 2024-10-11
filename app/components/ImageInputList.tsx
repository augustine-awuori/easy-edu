import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ImageInput from "./ImageInput";

interface Props {
  imageUris: string[];
  onRemoveImage: (image: string) => void;
  onAddImage: (image: string) => void;
}

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }: Props) {
  const scrollView = useRef<ScrollView>(null);

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView?.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri, index) => (
            <View key={index} style={styles.image}>
              <ImageInput
                imageUri={uri as unknown as string}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => uri && onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
