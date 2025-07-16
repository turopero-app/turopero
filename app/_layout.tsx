import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // ¡no te olvides de importar esto!
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </>
  );
}