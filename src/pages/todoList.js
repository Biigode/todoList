import React, {useState, useEffect} from 'react';

import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
// import { Container } from './styles';

export default function TodoList({navigation}) {
  var ObjLista = {
    itens: 0,
    listaDeTodos: [],
  };
  const [state, setState] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function validaTodo() {
      asyncBD = await AsyncStorage.getItem('@list:list');
      if (!asyncBD) {
        await AsyncStorage.setItem('@list:list', JSON.stringify(ObjLista));
      } else {
        var obj = JSON.parse(asyncBD);
        setCount(obj.itens);
        setState(obj);
      }
    }
    validaTodo();
    this.focusListener = navigation.addListener('didFocus', () => {
      validaTodo();
    });
  }, [count]);
  onSlideRight = async item => {
    //perform Action on slide success.

    var removeritem = state.listaDeTodos;
    var arr = removeritem.filter(rm => rm.id !== item.id);
    var novoState = state;
    novoState.itens--;
    novoState.listaDeTodos = arr;
    await AsyncStorage.setItem('@list:list', JSON.stringify(novoState));
    setState(novoState);
    Alert.alert('tarefa', 'tarefa finalizada parabens');
    setCount(novoState.itens);
  };
  return (
    <SafeAreaView stlye={styles.container}>
      <FlatList
        data={state.listaDeTodos}
        keyExtractor={item => item.data}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View style={styles.viewItem}>
              <Text>Nome da tarefa: </Text>
              <Text>{item.tarefa}</Text>
            </View>
            <View style={styles.viewItem}>
              <Text>Descrição: </Text>
              <Text>{item.descTarefa}</Text>
            </View>
            <View style={styles.viewItem}>
              <Text>Data: </Text>
              <Text>{item.data}</Text>
            </View>
            <RNSlidingButton
              height={35}
              onSlidingSuccess={() => this.onSlideRight(item)}
              slideDirection={SlideDirection.RIGHT}>
              <View>
                <Text numberOfLines={1} style={styles.titleText}>
                  DESLIZE PARA FINALIZAR >
                </Text>
              </View>
            </RNSlidingButton>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 2,
    marginBottom: 10,
    borderColor: '#3b5998',
    margin: 5,
  },
  viewItem: {
    margin: 5,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#ffffff',
  },
});
