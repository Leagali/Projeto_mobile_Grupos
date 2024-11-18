import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { supabase } from './supabase';

export default function RegisterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const tratarRegistro = async () => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        setError('Erro ao tentar registrar. Verifique os dados informados.');
    } else {
        setError('');
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        navigation.navigate('Login'); 
    }
};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Crie sua conta</Text>
      <Text style={styles.subheader}>Insira seus dados para registrar</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirmar Senha"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={tratarRegistro}
        style={styles.button}
      >
        Criar Conta
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        style={styles.textButton}
      >
        Voltar para Login
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#063970',
  },
  button: {
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#1e90ff',
  },
  textButton: {
    marginVertical: 5,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});
