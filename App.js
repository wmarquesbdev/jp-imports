import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { CORES } from './src/theme/cores';
import { AuthProvider } from './src/context/AuthContext';
import { CarrinhoProvider } from './src/context/CarrinhoContext';
import { FavoritosProvider } from './src/context/FavoritosContext';
import { HistoricoProvider } from './src/context/HistoricoContext';
import { ToastProvider } from './src/context/ToastContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fontesProntas, erroFontes] = useFonts(Ionicons.font);

  if (!fontesProntas && !erroFontes) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: CORES.fundo }}>
        <ActivityIndicator size="large" color={CORES.azul} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AuthProvider>
          <CarrinhoProvider>
            <FavoritosProvider>
              <HistoricoProvider>
                <StatusBar style="light" />
                <AppNavigator />
              </HistoricoProvider>
            </FavoritosProvider>
          </CarrinhoProvider>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
