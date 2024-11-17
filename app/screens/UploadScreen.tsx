import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
// import * as Progress from "react-native-progress";
// import LottieView from "lottie-react-native";

import colors from "../config/colors";

interface Props {
  onDone: () => void;
  progress: number;
  visible?: boolean;
}

function UploadScreen({ onDone, progress = 0, visible = false }: Props) {
  const [showUploadText, setShowUploadText] = useState(true);

  useEffect(() => {
    if (progress > 0) {
      setShowUploadText(false);
      onDone(); // Hide text when progress starts.
    }

    if (progress === 0) {
      const timer = setTimeout(() => {
        setShowUploadText(true); // Show text after 10 seconds if progress remains 0.
      }, 10000);

      return () => clearTimeout(timer); // Cleanup timer if progress changes.
    }
  }, [progress]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {showUploadText && <Text>Uploading...Please wait...</Text>}
        {/* Uncomment these lines for progress bar or animation */}
        {/* {progress < 1 ? (
          <Progress.Bar
            color={colors.primary}
            progress={progress}
            width={200}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
            style={styles.animation}
          />
        )} */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default UploadScreen;
