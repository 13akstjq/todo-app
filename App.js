import React , {Component}from 'react';
import { StyleSheet, Text, View,StatusBar,Dimensions ,Platform } from 'react-native';

const {height,width} = Dimensions.get("window");
export default class App extends Component {
  render(){
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.title}>To-do App</Text>
        <View style={styles.card}>
          <Text>New to do</Text>
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
    fontSize : 25,
    marginTop : 20,
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
  }
});
