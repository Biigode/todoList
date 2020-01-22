import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import TodoList from './pages/todoList';
import CreateTodo from './pages/createTodo';

const Todo = createStackNavigator({
  Todos: {
    screen: TodoList,
    navigationOptions: ({navigation}) => ({
      title: 'Lista',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('CriarTodos')}
          title="Cadastrar"
          color="#3b5998"
        />
      ),
    }),
  },
  CriarTodos: {
    screen: CreateTodo,
    navigationOptions: ({navigation}) => ({
      title: 'Nova Tarefa',
    }),
  },
});

const Route = createAppContainer(Todo);

export default Route;
