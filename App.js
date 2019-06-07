import React , {Component}from 'react';
import { StyleSheet, Text, View,StatusBar,Dimensions ,Platform ,TextInput,ScrollView} from 'react-native';
import {AppLoading} from "expo";
import Todo from "./Todo.js";
const {height,width} = Dimensions.get("window");
export default class App extends Component {

  state = {
    newToDo : "",
    loadedToDos: true
  };

  _controlNewToDo = text => {
    this.setState({
      newToDo : text
    })
  }

  _loadToDos = () => {

  }

  componentDidMount(){

  }
  

  render(){
    const {newToDo,loadedToDos} = this.state;
    // if(!loadedToDos){
    //   return <AppLoading/>
    // }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" ></StatusBar>
        <Text style={styles.title}>To-do App</Text>
        <View style={styles.card}>
          <TextInput style={styles.input}
           placeholder={"New To Do"}
           value = {newToDo}
           placeholderTextColor={"#999"}
           onChangeText={this._controlNewToDo}
           returnKeyType={"done"}
           autoCorrect={false}
           ></TextInput>
           <ScrollView contentContainerStyle={styles.toDos}>
             <Todo text={"Hello i'm To do"}></Todo>
           </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title : {
    color : "white",
    fontSize : 40,
    marginTop : 35,
    fontWeight : "100",
    marginBottom : 30
  },
  card : {
    backgroundColor : "#FFF",
    flex : 1,
    width : width -25,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    
    ...Platform.select({
      ios : {
        shadowColor : "rgb(50,50,50)",
        shadowOpacity : 0.5,
        shadowRadious : 5,
        shadowOffset : {
          height : -1,
          width : 0
        }
      },
      android : {
        elevation : 5
      }
    })
  },
  input : {
    padding : 20,
    fontSize : 42,
    borderBottomColor : "#ddd",
    borderBottomWidth : 1
  },
  toDos : {
    alignItems : "center"
  }

});
