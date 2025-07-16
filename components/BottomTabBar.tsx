import { View } from "react-native";
import { Home, Layers, Plus, MessageCircle, User } from "lucide-react-native";

export function BottomTabBar() {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-black py-3 flex-row justify-around border-t border-white/10">
      <Home color="white" size={26} />
      <Layers color="white" size={26} />
      <Plus color="white" size={30} />
      <MessageCircle color="white" size={26} />
      <User color="white" size={26} />
    </View>
  );
}
