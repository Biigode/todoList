import React, {useState, useEffect, Component} from 'react';
import DatePicker from 'react-native-datepicker';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function CreateTodo({navigation}) {
  const [data, setData] = useState('');
  const [tarefa, setTarefa] = useState('');
  const [descTarefa, setDescTarefa] = useState('');
  var asyncBD;
  var obj;

  useEffect(() => {
    setData(new Date());
  }, []);
  

  async function handleCreate() {
    asyncBD = await AsyncStorage.getItem('@list:list');
    obj = JSON.parse(asyncBD);
    var objParaSalvar = {
      tarefa,
      descTarefa,
      data,
      id: Math.random(13),
    };
    obj.itens = obj.itens + 1;
    obj.listaDeTodos.push(objParaSalvar);
    await AsyncStorage.setItem('@list:list', JSON.stringify(obj));
    Alert.alert('Sucesso', 'Tarefa cadastrada com Sucesso');
    navigation.navigate('Todos');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.texto}>Nome da tarefa:</Text>
        <TextInput
          placeholder="Qual nome da Tarefa ?"
          onChangeText={setTarefa}
        />
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.texto}>Descrição da tarefa:</Text>
        <TextInput
          placeholder="Descrição da tarefa ?"
          onChangeText={setDescTarefa}
        />
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.texto}>Data da Tarefa</Text>
        <DatePicker
          style={{width: 200}}
          date={data}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={data}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => {
            setData(date);
          }}
        />
      </View>
      <TouchableOpacity style={styles.btnSalvar} onPress={handleCreate}>
        <Text style={styles.salvarTarefaTexto}>Salvar tarefa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  texto: {
    marginRight: 10,
    fontSize: 15,
  },
  btnSalvar: {
    marginTop: 20,
    borderBottomWidth: 2,
    borderRadius: 4,
    backgroundColor: '#3b5998',
    height: 30,
    width: 200,
    alignItems: 'center',
  },
  salvarTarefaTexto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
