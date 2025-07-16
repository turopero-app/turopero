import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // ¡no te olvides de importar esto!
import "../global.css";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
      </>
    </AuthProvider>

  );
}