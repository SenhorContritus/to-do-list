import {Button,Text, View, StyleSheet, Pressable} from "react-native"
import _tarefa from "../types/_tarefas";
import React from "react";



type TarefaProp = {
    dados: _tarefa,
    handleDeletePress: any,
}
export default function Tarefa(props:TarefaProp){
    let conc = false;

    return  <View style={styles.div}>
                <Text style={styles.conteudo}>
                    {props.dados.texto}
                </Text>
                <Pressable 
                    onPress={() => {
                        conc = !(conc)
                    }}
                    style={({pressed}) => [{
                            backgroundColor: pressed? "darkgreen" : 'green',
                        },
                        styles.button
                    ]}
                >
                    <Text style={styles.textButton}>
                        ✓
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => {props.handleDeletePress(props.dados.id)}}
                    style={({pressed}) => [{
                            backgroundColor: pressed? "darkred" : 'red',
                        },
                        styles.button
                    ]}
                >
                    <Text style={styles.textButton}>
                        X
                    </Text>
                </Pressable>
            </View>
}
const styles = StyleSheet.create({
    div:{
        display:'flex',
        flexDirection: 'row',
        borderWidth:1,
        height: 50,


    },
    button:{
        width: 30,
        height: 30,
        justifyContent: "center",
        borderRadius: 6,
    },
    textButton:{
        color: 'white',
        textAlign: 'center',
        justifyContent: "center",
    },
    conteudo:{

    }
})