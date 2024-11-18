import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from './screens/Login';
import EsqueciSenha from './screens/EsqueciSenha';
import Cadastro from './screens/Cadastro';
import Grupos from './screens/Grupos';
import EspecificacaoDoGrupo from './screens/EspecificacaoDoGrupo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Grupos" component={Grupos} />
          <Stack.Screen name="EspecificacaoDoGrupo" component={EspecificacaoDoGrupo} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
