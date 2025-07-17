// app/_layout.tsx

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // ¡no te olvides de importar esto!
import "../global.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AuthProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
          <Toast />
      </>
    </AuthProvider>

  );
}