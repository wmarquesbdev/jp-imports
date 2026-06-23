import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { CORES } from '../theme/cores';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import DetalheScreen from '../screens/DetalheScreen';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import FavoritosScreen from '../screens/FavoritosScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import FinalizacaoScreen from '../screens/FinalizacaoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: CORES.azulEscuro },
        headerTintColor: CORES.branco,
        headerTitleStyle: { fontWeight: '800' },
        tabBarActiveTintColor: CORES.azul,
        tabBarInactiveTintColor: CORES.textoClaro,
        tabBarStyle: { borderTopColor: CORES.borda },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          const icones = {
            'Catalogo': focused ? 'home' : 'home-outline',
            'Favoritos': focused ? 'heart' : 'heart-outline',
            'Historico': focused ? 'receipt' : 'receipt-outline',
            'Perfil': focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icones[route.name] || 'ellipse'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Catalogo" component={CatalogoScreen} options={{ title: 'JP Imports', tabBarLabel: 'Catalogo' }} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Historico" component={HistoricoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: CORES.fundo }}><ActivityIndicator size="large" color={CORES.azul} /></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: CORES.azulEscuro }, headerTintColor: CORES.branco, headerTitleStyle: { fontWeight: '800' }, contentStyle: { backgroundColor: CORES.fundo } }}>
        {!usuario ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Criar conta' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Detalhe" component={DetalheScreen} options={{ title: 'Produto' }} />
            <Stack.Screen name="Carrinho" component={CarrinhoScreen} options={{ title: 'Carrinho' }} />
            <Stack.Screen name="Finalizacao" component={FinalizacaoScreen} options={{ title: 'Finalizar pedido' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
