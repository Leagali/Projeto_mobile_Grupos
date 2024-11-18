import React, { useEffect, useState } from 'react';
import {Text,SafeAreaView,StyleSheet,View,ScrollView,Button,ActivityIndicator,} from 'react-native';
import { supabase } from './supabase';

export default function Grupos({ navigation }) {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os grupos do Supabase
  useEffect(() => {
    const fetchGrupos = async () => {
      const { data, error } = await supabase.from('Grupos').select('id, nome');

      if (error) {
        console.error('Erro ao buscar grupos:', error.message);
      } else {
        setGrupos(data || []);
      }
      setLoading(false);
    };

    fetchGrupos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Grupos Disponíveis</Text>
      {loading ? (
        // Mostra indicador de carregamento enquanto busca os dados
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {grupos.length > 0 ? (
            grupos.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.props}>Nome do grupo:</Text>
                <Text>{item.nome}</Text>
                <Button
                  title="Ver Mais"
                  onPress={() =>
                    navigation.navigate('EspecificacaoDoGrupo', {
                      groupId: item.id,
                    })
                  }
                  color="#1e90ff"
                />
              </View>
            ))
          ) : (
            // Mostra mensagem se não houver grupos
            <Text style={styles.noData}>Nenhum grupo disponível no momento.</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  props: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
    fontSize: 16,
  },
});
