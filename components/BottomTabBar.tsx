// components/BottomTabBar.tsx

import { TouchableOpacity, View } from "react-native";
import { Home, Layers, Plus, MessageCircle, User } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "react-native-toast-message";

export function BottomTabBar() {


    const { user } = useAuth();
  const router = useRouter();

  const handleProtectedPress = () => {
    if (!user) {
      router.push("/login"); // Redirige si no está autenticado
    } else {
      Toast.show({
        type: "success",
        text1: "Usuario autenticado",
        text2: "¡Ya estás logueado!",
      });
    }
  };



  return (
    <View className="absolute bottom-0 left-0 right-0 bg-black py-3 flex-row justify-around border-t border-white/10">


      {/* Home - sin protección */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <Home color="white" size={26} />
      </TouchableOpacity>

      {/* Protegidos */}
      <TouchableOpacity onPress={handleProtectedPress}>
        <Layers color="white" size={26} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProtectedPress}>
        <Plus color="white" size={30} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProtectedPress}>
        <MessageCircle color="white" size={26} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProtectedPress}>
        <User color="white" size={26} />
      </TouchableOpacity>

      
    </View>
  );
}
