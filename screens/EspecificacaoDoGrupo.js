import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { supabase } from './supabase';

export default function MainPage() {
  const [grupos, setGrupos] = useState([]); 
  const [avaliacoes, setAvaliacoes] = useState([]); 
  const [alunos, setAlunos] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchGruposEAvaliacoesEAlunos = async () => {
    try {
 
      const { data: gruposData, error: gruposError } = await supabase
        .from('Grupos')
        .select('*');

      if (gruposError) {
        console.error('Erro ao buscar grupos:', gruposError.message);
        return;
      }

      setGrupos(gruposData);

      // Buscando as avaliações correspondentes aos grupos
      const { data: avaliacoesData, error: avaliacoesError } = await supabase
        .from('Avaliacoes')
        .select('*');

      if (avaliacoesError) {
        console.error('Erro ao buscar avaliações:', avaliacoesError.message);
        return;
      }

      setAvaliacoes(avaliacoesData);

      // Buscando os alunos
      const { data: alunosData, error: alunosError } = await supabase
        .from('Alunos')
        .select('*');

      if (alunosError) {
        console.error('Erro ao buscar alunos:', alunosError.message);
        return;
      }

      setAlunos(alunosData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usando o useEffect para buscar os dados quando a página for carregada
  useEffect(() => {
    fetchGruposEAvaliacoesEAlunos();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.groupsContainer}>
        {grupos.map((grupo) => {
          // Filtrando as avaliações pelo grupo_id
          const grupoAvaliacoes = avaliacoes.filter(avaliacao => avaliacao.grupo_id === grupo.id);

          // Filtrando os alunos pelo grupo_id
          const grupoAlunos = alunos.filter(aluno => aluno.grupo_id === grupo.id);

          return (
            <View key={grupo.id} style={styles.groupCard}>
              <Text style={styles.header}>Detalhes do Grupo</Text>
              <View style={styles.card}>
                <Text style={styles.props}>Nome do grupo:</Text>
                <Text>{grupo.nome}</Text>

                <Text style={styles.props}>Descrição do projeto:</Text>
                <Text>{grupo.descricao}</Text>

                <Text style={styles.props}>Tema:</Text>
                <Text>{grupo.tema}</Text>

                <Text style={styles.props}>Integrantes:</Text>
                {grupoAlunos.length > 0 ? (
                  grupoAlunos.map((aluno, index) => (
                    <Text key={index} style={styles.integrante}>• {aluno.nome}</Text>
                  ))
                ) : (
                  <Text>Sem integrantes</Text>
                )}

                <Text style={styles.props}>Avaliações:</Text>
                {grupoAvaliacoes.length > 0 ? (
                  grupoAvaliacoes.map((avaliacao, index) => (
                    <View key={index} style={styles.avaliacaoCard}>
                      <Text style={styles.avaliacaoText}>Comentário: {avaliacao.comentario}</Text>
                      <Text style={styles.avaliacaoNota}>Nota: {avaliacao.nota}</Text>
                    </View>
                  ))
                ) : (
                  <Text>Sem avaliações</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  groupsContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  groupCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  card: {
    padding: 20,
    borderRadius: 15,
  },
  props: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  integrante: {
    marginLeft: 10,
    color: '#555',
  },
  avaliacaoCard: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  avaliacaoText: {
    fontStyle: 'italic',
    color: '#444',
  },
  avaliacaoNota: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  noAvaliacoesText: {
    color: '#777',
    fontStyle: 'italic',
  },
});
