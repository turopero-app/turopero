import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  BackHandler,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [telefono, setTelefono] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigoOTP, setCodigoOTP] = useState(Array(6).fill(''));
  const [temporizador, setTemporizador] = useState(60);
  const [inputBloqueado, setInputBloqueado] = useState(false);

  const router = useRouter();
  const inputsRef = useRef<TextInput[]>([]);

  // Verificar estado OTP en AsyncStorage al entrar
  useEffect(() => {
    const verificarEstadoOTP = async () => {
      const flag = await AsyncStorage.getItem('otpEnProceso');
      const telefonoGuardado = await AsyncStorage.getItem('telefonoGuardado');
      const timestamp = await AsyncStorage.getItem('otpTimestamp');

      if (telefonoGuardado) {
        setTelefono(telefonoGuardado);
      }

      if (flag === 'true' && timestamp) {
        const tiempoPasado = Math.floor((Date.now() - parseInt(timestamp)) / 1000);
        const tiempoRestante = Math.max(60 - tiempoPasado, 0);

        if (tiempoRestante > 0) {
          setCodigoEnviado(true);
          setInputBloqueado(true);
          setTemporizador(tiempoRestante);
        } else {
          await AsyncStorage.multiRemove(['otpEnProceso', 'otpTimestamp', 'telefonoGuardado']);
          setInputBloqueado(false);
          setCodigoEnviado(false);
        }
      }
    };

    verificarEstadoOTP();
  }, []);

  // Temporizador para volver a permitir enviar código
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (codigoEnviado && temporizador > 0) {
      interval = setInterval(() => setTemporizador(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [codigoEnviado, temporizador]);

  // Volver al home limpiando marcas si pasaron 60s
  useFocusEffect(() => {
    const onBackPress = async () => {
      setCodigoOTP(Array(6).fill(''));
      setCodigoEnviado(false);
      setTemporizador(60);
      setInputBloqueado(false);
      await AsyncStorage.multiRemove(['otpEnProceso', 'otpTimestamp', 'telefonoGuardado']);
      setTelefono('');
      router.replace('/');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  });

  const enviarCodigo = async () => {
    if (!telefono.trim()) {
      return Toast.show({ type: 'error', text1: 'Ingrese su número de teléfono' });
    }

    await AsyncStorage.setItem('otpEnProceso', 'true');
    await AsyncStorage.setItem('telefonoGuardado', telefono);
    await AsyncStorage.setItem('otpTimestamp', Date.now().toString());

    setCodigoEnviado(true);
    setInputBloqueado(true);
    setTemporizador(60);

    Toast.show({ type: 'success', text1: 'Código enviado por SMS 📩' });

    // TODO: Integrar con Firebase aquí
  };

  const validarOTP = async () => {
    const otp = codigoOTP.join('');
    if (otp.length !== 6 || otp.includes('')) {
      return Toast.show({ type: 'error', text1: 'Complete todos los dígitos' });
    }

    Toast.show({ type: 'success', text1: 'Código validado ✅' });
    await AsyncStorage.multiRemove(['otpEnProceso', 'otpTimestamp', 'telefonoGuardado']);
    setTelefono('');
    setCodigoOTP(Array(6).fill(''));
    setCodigoEnviado(false);
    setInputBloqueado(false);

    // TODO: Redirigir a siguiente pantalla si corresponde
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const nuevoCodigo = [...codigoOTP];
    nuevoCodigo[index] = value;
    setCodigoOTP(nuevoCodigo);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && codigoOTP[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 64 }}>
        <Text className="text-white text-4xl font-semibold mb-2">Iniciar sesión</Text>
        <Text className="text-white text-xl mb-6">Ingresá tu número</Text>

        <TextInput
          placeholder="Número de teléfono"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          className="bg-zinc-900 text-white rounded-lg px-4 py-3 mb-6 text-xl"
          value={telefono}
          onChangeText={(text) => {
            if (!inputBloqueado) setTelefono(text);
          }}
          editable={!inputBloqueado}
        />

        {!codigoEnviado && (
          <TouchableOpacity onPress={enviarCodigo} className="bg-white py-5 rounded-xl items-center mb-6">
            <Text className="text-black font-semibold text-2xl">Ingresar</Text>
          </TouchableOpacity>
        )}

        {codigoEnviado && (
          <>
            <Text className="text-white text-lg mb-4 mt-8">
              Ingresá el código de 6 dígitos enviado por SMS
            </Text>

            <View className="flex-row justify-between mb-6 mt-10">
              {codigoOTP.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => inputsRef.current[index] = ref!}
                  value={value}
                  onChangeText={(text) => handleOTPChange(index, text)}
                  onKeyPress={({ nativeEvent }) => handleOTPKeyPress(index, nativeEvent.key)}
                  keyboardType="numeric"
                  maxLength={1}
                  className="bg-zinc-900 text-white text-2xl text-center rounded-lg w-12 h-14"
                />
              ))}
            </View>

            <TouchableOpacity onPress={validarOTP} className="bg-white py-5 rounded-xl items-center mb-4 mt-16">
              <Text className="text-black font-semibold text-2xl">Validar código</Text>
            </TouchableOpacity>

            {temporizador > 0 ? (
              <Text className="text-white text-center mt-2">Podés volver en {temporizador}s</Text>
            ) : (
              <TouchableOpacity
                onPress={async () => {
                  setCodigoOTP(Array(6).fill(''));
                  setCodigoEnviado(false);
                  setInputBloqueado(false);
                  setTemporizador(60);
                  await AsyncStorage.multiRemove(['otpEnProceso', 'otpTimestamp', 'telefonoGuardado']);
                  setTelefono('');
                }}
              >
                <Text className="text-blue-400 underline text-center mt-2">Enviar código otra vez</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {!codigoEnviado && (
          <View className="mt-10 items-center">
            <Text className="text-white">
              ¿No tenés cuenta?{' '}
              <Text
                className="text-blue-400 underline"
                onPress={() => router.push('/registro')}
              >
                Registrate acá
              </Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
