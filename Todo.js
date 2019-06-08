import React , {Component} from "react";
import {View,Text,TouchableOpacity, StyleSheet,Dimensions,TextInput} from "react-native";
import propTypes from "prop-types";

const {height , width} = Dimensions.get("window");
export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing : false,
            toDoValue : props.text
        }
    }
    static propTypes = {
        text : propTypes.string.isRequired,
        isCompleted : propTypes.bool.isRequired,   
        deleteToDo : propTypes.func.isRequired,
        completeToDo : propTypes.func.isRequired,
        uncompleteToDo : propTypes.func.isRequired,
        id : propTypes.string.isRequired,
        updateToDo : propTypes.func.isRequired
    }

    
    render(){
          
        const {isEditing,toDoValue} = this.state;
        const {text,deleteToDo,id ,isCompleted} = this.props;
        console.log(isCompleted);
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPressOut={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompletedCircle]}></View>
                    </TouchableOpacity>
                    {/* <Text style={[styles.text, isCompleted ? styles.completeText : styles.uncompleteText]} >{text}</Text> */}
                    {isEditing ? (
                        <TextInput 
                            // multiline={true}
                            returnKeyType={"done"}
                            style={[ styles.text,styles.input]}
                            value={toDoValue}
                            onChangeText={this._controllInput}
                            autoCorrect={false}></TextInput>
                    ) : (
                        <Text style={[styles.text, isCompleted ? styles.completeText : styles.uncompleteText]} >{text}</Text>
                    )}
                    </View>
                   {isEditing ? (
                       <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✔️</Text>
                                </View>
                            </TouchableOpacity>
                       </View>
                   ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                   </View>
                   )}
                   
            </View>
        );
    }
    _toggleComplete = () => {
        //isCompleted를 App.js에서 직접 주지 않지만 toDos의 object안에 있는 속성이라 알아서 props로 해주는것 같음. 
      const {isCompleted,completeToDo,uncompleteToDo , id} = this.props; 
      if(isCompleted){ //완료한 항목 클릭시 -> 완료안한 상태로 바꿈
        uncompleteToDo(id);
      }else { // 완료 안한 항목 클릭시 -> 완료 상태로 바꿈 
        completeToDo(id); 
      }
    //App.js에서 prop형태로 주는 것이 좋기 때문에 아래와 같이 state로 isCompleted를 사용하는 형태는 좋지 않음. 
    // this.setState( prevState =>{ 
    //     return {
    //         isCompleted : !prevState.isCompleted
    //         };
    //     });
    };
    _startEditing = () => {
        const {text} = this.props;
        
        this.setState({
            isEditing : true,
            toDoValue : text
        });
    }
    _finishEditing =() =>{
        const {updateToDo,id} = this.props;
        const {toDoValue} = this.state;
        console.log(toDoValue);
        updateToDo(id,toDoValue);
        this.setState({
            isEditing : false
        });
    }
    _controllInput = (textInput) =>{
        this.setState({
            toDoValue : textInput
        });
    }
}


const styles = StyleSheet.create({
  container : {
    // backgroundColor : "#000",
    width : width -50,
    flexDirection :"row",
    borderBottomColor : "#bbb",
    borderBottomWidth : StyleSheet.hairlineWidth,
    justifyContent : "space-between"
  },
  completeCircle : {
      borderColor : "red"

  },
  uncompletedCircle : {
      borderColor : "#999"
  },
  completeText :{
      color : "#353839"
  },
  uncompleteText : {
      color : "#bbb",
      textDecorationLine : "line-through"
  },
  text : { 
      fontSize  :20,
      fontWeight : "600",
      marginVertical : 20

  },
  circle  : {
      width : 30,
      height : 30,
      borderRadius : 15,
      borderWidth : 3,
      borderColor : "red",
      marginRight : 15,
      marginVertical : 20
  },
  column : {
      flexDirection : "row",
      width : width /2,
      alignItems : "center"
  },
  actions : {
      flexDirection : "row"
  },
  actionContainer : {
      marginHorizontal : 10,
      marginVertical : 30
  },
  input : {
    width : width/2,
    marginVertical : 20
  }
});