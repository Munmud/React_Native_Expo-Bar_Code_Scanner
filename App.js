import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedText, setScannedTest] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);

    // alert(`type : ${type} and data : ${data} `);
    setScannedTest(`type : ${type} and data : ${data} `);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && ( */}
      {/* //{" "} */}
      {/* <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} /> */}
      <View style={styles.whiteBackgroundStyle}>
        <Text style={styles.textStyle}>{scannedText}</Text>
      </View>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  whiteBackgroundStyle: {
    backgroundColor: "#ecf0f1",
  },
  textStyle: {
    justifyContent: "center",
    fontWeight: "bold",
    padding: 16,
    color: "red",
  },
});
