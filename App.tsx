import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import _tarefa from './types/_tarefas';

export default function App() {

  const [texto,setTexto] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);

  function adicionarTarefa(){
    if(texto == ''){
      alert("Insira um texto");
      return;
    }
    let tarefa: _tarefa = {

      
      id: tarefas.length +1,
      texto: texto
    };
    setTarefas([...tarefas, tarefa])
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={texto} onChangeText={setTexto}/>
      <Button title='Adicionar Tarefa'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth: 1,
  }
});
