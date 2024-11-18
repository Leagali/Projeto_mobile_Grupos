import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { supabase } from './supabase';

export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const tratarSenha = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        setError('Ocorreu um erro ao tentar enviar o e-mail de recuperação.');
    } else {
        setMessage('E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
    }
};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Recuperar Senha</Text>
      <Text style={styles.description}>
        Insira seu e-mail abaixo para receber um link de recuperação de senha.
      </Text>

      <TextInput
        label="E-mail"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null} 

      <Button
        mode="contained"
        onPress={tratarSenha}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Enviar Link
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        labelStyle={styles.backButtonLabel}
      >
        Voltar ao Login
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#063970',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#1e90ff',
  },
  buttonLabel: {
    fontSize: 16,
    color: '#000',
  },
  backButton: {
    marginTop: 15,
  },
  backButtonLabel: {
    color: '#1e90ff',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  success: {
    color: 'green',
    marginBottom: 12,
  },
});
