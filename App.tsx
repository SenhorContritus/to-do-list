import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import _tarefa from './types/_tarefas';
import React from 'react';
import Tarefa from './components/Tarefa';

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
      texto
    }
    setTarefas([...tarefas, tarefa]);
  }
  function mostrarTarefas(){
    return tarefas.map(t => <Tarefa key={t.id} dados={t} handleDeletePress={excluir}/>);
  }

  function excluir(id:number){
    let f = tarefas.filter(t => t.id != id);
    setTarefas(f);
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TextInput style={styles.input} value={texto} onChangeText={setTexto}/>
        <Button 
          title='Adicionar Tarefa'
          onPress={adicionarTarefa}
        />
        {mostrarTarefas()}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container:{
    display:'flex',
    backgroundColor: '#f',
  },
  input:{
    borderWidth: 1,
  }
});
