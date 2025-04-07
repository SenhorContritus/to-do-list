import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Animated, Button, Pressable, ScrollView, StyleSheet, Text, TextInput,TextInputProps, View } from 'react-native';
import _tarefa from './types/_tarefas';
import React from 'react';
import Tarefa from './components/Tarefa';

export default function App() {

  const [texto,setTexto] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  //Scrollbar = não sei como ue funciona, preciso estudar isso aqui ainda. Tava de madrugada ja e eu tava com sono, só copiei e colei heheheheheh
  const [completeScrollBarHeight, SetCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, SetVisibleScrollBarHeight] = useState(0);

  const scrollIndicatorSize = completeScrollBarHeight > visibleScrollBarHeight?
        (visibleScrollBarHeight * visibleScrollBarHeight) / (3*completeScrollBarHeight):
        visibleScrollBarHeight;

  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const difference =
  visibleScrollBarHeight > scrollIndicatorSize
    ? visibleScrollBarHeight - scrollIndicatorSize
    : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: "clamp",
  });


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
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>
          A lista do Fazer
        </Text>
        <View style={styles.configContainer}>
          <TextInput 
            style={[isFocused? styles.inputFocus : styles.inputBlur]}
            value={texto} 
            onChangeText={setTexto}
            onBlur={() => {setIsFocused(false)}}
            onFocus={() => {setIsFocused(true)}}
          />
          <Pressable
            onPress={adicionarTarefa}
            style={({pressed}) => [{
                  backgroundColor: pressed? " #e07f4a" : "#ed834a",
                },
                styles.buttonNew
              ]
            }
          >
            <Text style={[{
              color: "rgb(185, 86, 32)",
              textAlign: "center",
              justifyContent: "center",
            }]}>
              Adicionar
            </Text>
          </Pressable>
        </View>
        {
        //container principal onde serão apresentados os dados 
        }
        <View style={styles.scrollContainer}>
          {
          //ScrollArea = onde onde os valores vão ficar escondidinho bonitinho cuti cuti
          }
          <ScrollView 
            contentContainerStyle={{paddingRight: 10}}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={height => {
              SetCompleteScrollBarHeight(height);
            }}
            onLayout={({
              nativeEvent: {
                layout: { height },
              },
            }) => {
              SetVisibleScrollBarHeight(height);
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {mostrarTarefas()}
          </ScrollView>
          {           
          //configuração da barra de scroll = so seve de enfeite
          }
          <View style={styles.scrollOutside}>
            <Animated.View style={[styles.scrollInside, {height: scrollIndicatorSize,  transform: [{ translateY: scrollIndicatorPosition}],}]}/>
          </View>
        </View>
      </View>
      <Text style={[{fontSize: 11, color:'rgb(185, 86, 32)'}]}>
        V1.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FCAE83',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial'
  },
  container:{
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 400,
    backgroundColor: 'rgb(240, 155, 110)',
    borderColor: 'rgb(216, 138, 96)',
    borderWidth: 1.8 ,
    borderRadius: 15,
    paddingVertical:20,
    padding: "3%",

  },
  title:{
    width: '80%',
    paddingVertical: 15,
    fontSize: 24,
    fontWeight: '500',
    color: 'rgb(228, 123, 67)',
  },
  configContainer:{
    display: "flex",
    flexDirection: "row",
    height: 40,
    marginBottom: 10
  },
  scrollContainer:{
    flexDirection: "row",
    padding: 10,
    height: 220,
    backgroundColor:'rgb(219, 138, 95)',
    borderRadius: 6,
  },
  scrollOutside:{
    height:"100%",
    width: 6,
    backgroundColor: "#e07f4a",
    borderRadius: 8,
    
  },
  scrollInside:{
    width: 6,
    borderRadius: 8,
    backgroundColor: "rgb(223, 148, 108)",
  },
  inputBlur:{
    borderWidth: 2,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: "70%", 
    height: 40,
    backgroundColor: 'rgb(223, 148, 108)',
    borderColor: 'rgb(223, 148, 108)'
  },
  inputFocus:{
    borderWidth: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: "70%", 
    height: 40,
    backgroundColor: 'rgb(224, 143, 100)',
    borderColor: 'rgb(224, 143, 100)',
    
  },
  buttonNew:{
    width: "30%",
    height: 40,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: "center",
  }
});
