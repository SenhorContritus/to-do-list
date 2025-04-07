import {Button,Text, View, StyleSheet, Pressable, ScrollView} from "react-native"
import _tarefa from "../types/_tarefas";
import React, { useState } from "react";



type TarefaProp = {
    dados: _tarefa,
    handleDeletePress: any,
}
export default function Tarefa(props:TarefaProp){
    const [conc, setConc] = useState(false);

    return  <View style={[
                conc?   {backgroundColor:'rgb(202, 122, 79)', borderColor:'rgb(202, 122, 79)'}: 
                        {backgroundColor:'rgb(233, 142, 92)', borderColor:'rgb(233, 142, 92)'},
                styles.div
            ]}
            >
                <View style={styles.divContent}>
                    <ScrollView 
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={[{
                            paddingVertical: 7,
                            paddingHorizontal: 3
                        }]}
                    >
                       <Text style={[
                            conc?   {color: "rgb(206, 149, 120)"}: 
                                    {color: "rgb(117, 49, 12)"},
                        ]}>
                            {props.dados.texto}
                        </Text> 
                    </ScrollView>
                </View>
                <View style={styles.divButton}>
                <Pressable 
                    onPress={() => {
                        setConc(!(conc))
                    }}
                    style={({pressed}) => [
                            conc?   {backgroundColor: pressed? "green" : 'rgb(12, 75, 10)'}:
                                    {backgroundColor: pressed? "darkgreen" : 'green'},
                        styles.button
                    ]}
                >
                    <Text style={[{color:'rgb(99, 175, 97)'},styles.textButton]}>
                        ✓
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => {props.handleDeletePress(props.dados.id)}}
                    style={({pressed}) => [
                        conc?   {backgroundColor: pressed? "rgb(107, 17, 17)" : 'maroon'}:
                                {backgroundColor: pressed? "darkred" : 'red'},
                        styles.button
                    ]}
                >
                    <Text style={[{color:'rgb(228, 122, 122)'},styles.textButton]}>
                        X
                    </Text>
                </Pressable>
                </View>
            </View>
}
const styles = StyleSheet.create({
    div:{
        display:'flex',
        flexDirection: 'row',
        borderWidth:1,
        height: 40,
        marginVertical: 2,
        borderRadius: 6,
        

    },
    divContent:{
        width:'64%',
        justifyContent: 'center',
        marginLeft: 3,
        marginVertical: 2,

    },
    divButton:{
        width:'35%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 3,
    },
    button:{
        width: 32,
        height: 30,
        justifyContent: "center",
        borderRadius: 4,
        margin: 2,
    },
    textButton:{
        textAlign: 'center',
        justifyContent: "center",
        fontWeight: 'bold',
    },
    content:{
        fontSize: 18,
        justifyContent: 'center',
        fontWeight: 'bold',
    },
})