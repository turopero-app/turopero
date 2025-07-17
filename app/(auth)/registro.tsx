import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import Checkbox from 'expo-checkbox';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [referido, setReferido] = useState('');
  const [tipo, setTipo] = useState<'usuario' | 'tienda'>('usuario');
  const [nombreTienda, setNombreTienda] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const router = useRouter();

  const beneficios = tipo === 'usuario'
    ? ['Créditos por ropa', 'Publicá prendas']
    : ['Recibí pedidos', 'Gestioná stock'];

  const validarCampos = () => {
    if (!nombre.trim()) return Toast.show({ type: 'error', text1: 'Nombre requerido' });
    if (!telefono.trim()) return Toast.show({ type: 'error', text1: 'Teléfono requerido' });
    if (tipo === 'tienda' && !nombreTienda.trim()) return Toast.show({ type: 'error', text1: 'Nombre de tienda requerido' });
    if (!aceptaTerminos) return Toast.show({ type: 'error', text1: 'Debe aceptar los términos' });

    Toast.show({ type: 'success', text1: 'Registrado correctamente 🎉' });
    // Lógica de registro con Firebase
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-black">
      <ScrollView className="px-6 py-8" keyboardShouldPersistTaps="handled">
        <Text className="text-white text-4xl font-bold mb-2 mt-8">Registro</Text>
        <Text className="text-white text-xl mb-6">Completá tus datos</Text>

        <TextInput
          placeholder="Nombre completo"
          placeholderTextColor="#999"
          className="bg-zinc-900 text-white rounded-lg px-4 py-4 mb-4 text-lg"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          placeholder="Número de teléfono"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          className="bg-zinc-900 text-white rounded-lg px-4 py-4 mb-4 text-lg"
          value={telefono}
          onChangeText={setTelefono}
        />

        <TextInput
          placeholder="Usuario que te invitó (opcional)"
          placeholderTextColor="#999"
          className="bg-zinc-900 text-white rounded-lg px-4 py-4 mb-4 text-lg"
          value={referido}
          onChangeText={setReferido}
        />

        <View className="flex-row items-center mb-6 mt-2">
          {['usuario', 'tienda'].map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setTipo(option as 'usuario' | 'tienda')}
              className={`flex-row items-center px-5 py-3 border rounded-lg mr-4 ${tipo === option ? 'border-white bg-white/10' : 'border-white/30'}`}
            >
              {tipo === option && <Check size={18} color="white" />}
              <Text className="text-white capitalize text-lg ml-2">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {tipo === 'tienda' && (
          <TextInput
            placeholder="Nombre de tienda"
            placeholderTextColor="#999"
            className="bg-zinc-900 text-white rounded-lg px-4 py-4 mb-4 text-lg"
            value={nombreTienda}
            onChangeText={setNombreTienda}
          />
        )}

        <View className="mb-6">
          {beneficios.map((item, index) => (
            <Text key={index} className="text-white text-base mb-1">• {item}</Text>
          ))}
        </View>

 <TouchableOpacity
  onPress={() => setAceptaTerminos(!aceptaTerminos)}
  className="flex-row items-center mb-8"
  activeOpacity={0.8}
>
  <Checkbox
    value={aceptaTerminos}
    onValueChange={setAceptaTerminos}
    color={aceptaTerminos ? '#22c55e' : '#444'} // Verde cuando está activo, gris cuando no
    style={{ width: 24, height: 24, borderRadius: 6 }}
  />
  <Text className="text-white ml-4">Acepto los términos y condiciones</Text>
</TouchableOpacity>

        <TouchableOpacity
          onPress={validarCampos}
          className="bg-white py-4 rounded-xl items-center"
        >
          <Text className="text-black font-semibold text-xl">Registrarme</Text>
        </TouchableOpacity>

        <View className="mt-6 items-center">
          <Text className="text-white text-base">
            ¿Ya tenés cuenta?{' '}
            <Text
              className="text-blue-400 underline"
              onPress={() => router.push('/login')}
            >
              Iniciá sesión
            </Text>
          </Text>
        </View>


        <Toast
  position="bottom"
  bottomOffset={400} // O el número que mejor se vea
/>

      </ScrollView>
    </KeyboardAvoidingView>

    
  );
}
