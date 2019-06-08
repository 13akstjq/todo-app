import React , {Component}from 'react';
import { StyleSheet, Text, View,StatusBar,Dimensions ,Platform ,TextInput,ScrollView,AsyncStorage} from 'react-native';
import {AppLoading} from "expo";
import Todo from "./Todo.js";
import uuidv1 from "uuid/v1"
const {height,width} = Dimensions.get("window");
export default class App extends Component {

  
  state = {
    newToDo : "",
    loadedToDos: false,
    toDos: {}
  };

  _controlNewToDo = text => { 
    this.setState({
      newToDo : text
    });
  };

  _loadToDos = async () => {
    try{
      const loadToDos = await AsyncStorage.getItem("realtodo");
      console.log("loadToDos : " + loadToDos);
      const parseDos = JSON.parse(loadToDos);
        // console.log(parseDos);
        this.setState({
          loadedToDos : true,
          toDos : parseDos || {}
        });
     
    }catch(err){
      console.log(err);
    }
    // this.setState({
    //   loadedToDos : true,
    //   // toDos : parseDos
    // });
  };

  _addTodo = () => {
    const {newToDo} = this.state;
    
    this.setState(prevState =>{
      const ID = uuidv1();
      const newToDoObject ={
        [ID]:{
          id : ID,
          isCompleted : false,
          text : newToDo,
          createdAt: Date.now(),
        }
      };
      const newState = {
        ...prevState,
        newToDo: "",
          toDos : {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveTodo(newState);
        if(newToDo !== ""){ // 입력한 todo가 있다면 
          this.setState({
            newToDo : ""
          });//마지막에 삭제하기 
        }
        return {...newState};
    })
  };

  _deleteTodo = (id) =>{
    this.setState( prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveTodo(newState.toDos);
      return {...newState};
    });
  };

  _updateTodo = (id,text) => {
    console.log("app.js " + text);
    this.setState(prevState => {
      const newState = {
       ...prevState,
       toDos : {
        ...prevState.toDos,
        [id] : {
          ...prevState.toDos[id],
          text : text
        }
       } 
      }
      this._saveTodo(newState.toDos);
      return {...newState};
    });
  };

  _saveTodo = (newToDos) => {
    console.log(JSON.stringify(newToDos));
    const saveToDos = AsyncStorage.setItem("realtodo",JSON.stringify(newToDos));
  }
  _completeToDo = (id) =>{ // todo를 완료할 때 호출하는 함수 
    console.log("finish");

    this.setState ( prevState =>{  
      const newState = {
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted : true
          }
        }
      }
      this._saveTodo(newState.toDos);
      return {...newState}
    });
  };

  _uncompleteToDo = (id) =>{ // todo를 완료를 취소할 때 호출하는 함수
    console.log("unfinish");

    this.setState ( prevState =>{
      const newState = {
        ...prevState,
        toDos:{
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted : false
          }
        }
      }
      this._saveTodo(newState.toDostate);
      return {...newState}
    });
  };

  componentDidMount(){
  this._loadToDos();
  }
  

  render(){
    const {newToDo,loadedToDos,toDos} = this.state;
    console.log(toDos);
    if(!loadedToDos){
      return <AppLoading/>
    }
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
           onSubmitEditing={this._addTodo}
           ></TextInput>
           <ScrollView contentContainerStyle={styles.toDos}>
             {Object.values(toDos)
             .reverse()
             .map(toDo => 
             <Todo
              key={toDo.id}
              deleteToDo={this._deleteTodo}
              completeToDo={this._completeToDo}
              uncompleteToDo={this._uncompleteToDo}
              updateToDo={this._updateTodo}
              {...toDo}
                ></Todo>)}
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
