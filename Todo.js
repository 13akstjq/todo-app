import React , {Component} from "react";
import {View,Text,TouchableOpacity, StyleSheet,Dimensions} from "react-native";

const {height , width} = Dimensions.get("window");
export default class Todo extends Component {
    state = {
        isEditing : false,
        isCompleted : false
    }
    render(){
        const {isCompleted} = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompletedCircle]}></View>
                </TouchableOpacity>
                <Text style={styles.text} >Hello I'dm Todo</Text>
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
}


const styles = StyleSheet.create({
  container : {
    // backgroundColor : "#000",
    width : width -50,
    flexDirection :"row",
    borderBottomColor : "#bbb",
    borderBottomWidth : StyleSheet.hairlineWidth
  },
  completeCircle : {
      borderColor : "red"

  },
  uncompletedCircle : {
      borderColor : "#999"
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
  }
});