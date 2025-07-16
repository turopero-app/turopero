import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FirebaseTest() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, 'testCollection', 'testDoc');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          console.log('🎉 Documento:', snap.data());
        } else {
          console.log('🕳️ No se encontró el documento');
        }
      } catch (e) {
        console.error('🔥 Error leyendo Firebase:', e);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>📡 Probando conexión con Firebase...</Text>
    </View>
  );
}
