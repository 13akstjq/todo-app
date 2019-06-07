import React , {Component} from "react";
import {View,Text,TouchableOpacity, StyleSheet,Dimensions,TextInput} from "react-native";

const {height , width} = Dimensions.get("window");
export default class Todo extends Component {
    state = {
        isEditing : false,
        isCompleted : false,
        toDoValue : ""
    }
    render(){
        const {isCompleted , isEditing,toDoValue} = this.state;
        const {text} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompletedCircle]}></View>
                    </TouchableOpacity>
                    {/* <Text style={[styles.text, isCompleted ? styles.completeText : styles.uncompleteText]} >{text}</Text> */}
                    {isEditing ? (
                        <TextInput 
                            multiline={true}
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
                        
                        <TouchableOpacity>
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
        this.setState(prevState => {
            return ({
                isCompleted : !prevState.isCompleted //현재 state의 반대 값을 넣음 == toggle
            })
        })
    }
    _startEditing = () => {
        const {text} = this.props;
        
        this.setState({
            isEditing : true,
            toDoValue : text
        });
    }
    _finishEditing =() =>{
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