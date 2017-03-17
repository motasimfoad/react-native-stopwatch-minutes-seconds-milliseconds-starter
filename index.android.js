const formatTime = require('minutes-seconds-milliseconds');

import React, { Component } from 'react';
import {ListItem , List} from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ToastAndroid,
  ScrollView,
  ListView,
  TouchableHighlight,
  View
} from 'react-native';

export default class StopWatch extends Component {


  constructor(){
    super();
    this.handleStartPress = this.handleStartPress.bind(this);
      this.handleLapPress = this.handleLapPress.bind(this);
      this.laps = this.laps.bind(this);
  this.state = {
    timeElapsed : null,
    running : false,
    startTime : null,
    laps : []
  };
}

  render() {
    return (
<View style = {styles.container}>
<View style = {[styles.header]}>
<View style = {[styles.timerWrapper]}>
<Text style = {styles.timer}>
{formatTime(this.state.timeElapsed)}
</Text>
</View>
<View style = {[styles.buttonWrapper]}>
{this.startStopButton()}
{this.lapButton()}
</View>
</View>

<View style = {[styles.footer]} >
<ScrollView style={{flex:1, backgroundColor:'#E0E0E0'}}>
{this.laps()}
</ScrollView>
</View>

</View>
    );
}

  laps(){
    return(

      this.state.laps.map((time, index) =>

      <View style = {styles.lap}>

      <Text style = {styles.lapText}>Lap # {index + 1}</Text>
      <Text style = {styles.lapText}>{formatTime(time)}</Text>



</View>

    )

    );
  }

  startStopButton() {

  let style = this.state.running ? styles.StopButton : styles.startButton;

    return (
       <TouchableHighlight

       onPress= {this.handleStartPress}
       underlayColor = "gray"
       style = {[styles.button, style]}
       >
       <Text>
{this.state.running ? 'Stop' : 'Start'}
       </Text>
       </TouchableHighlight>
    );
  }
  lapButton() {
    return (
      <TouchableHighlight style = {styles.button}
      onPress= {this.handleLapPress}
      underlayColor = "gray"
      >
    <Text>
    Lap
    </Text>
    </TouchableHighlight>
    );
  }

handleLapPress(){
let lap = this.state.timeElapsed;

this.setState({
  startTime: new Date(),
  laps: this.state.laps.concat([lap])
});
}

  handleStartPress() {

this.setState({
  startTime: new Date()
});

if (this.state.running) {
  clearInterval(this.interval);
  this.setState({running : false});
  return
}
this.interval = setInterval(() => {
 this.setState({
   timeElapsed : new Date() - this.state.startTime,
   running : true
 });
}, 10);
  }

}

const styles = StyleSheet.create({
container : {
  flex : 1,
  backgroundColor : '#9E9E9E',
  alignItems : 'stretch'
},
header :{
  flex : 1
},
timerWrapper: {
  flex : 5,
  justifyContent : 'center',
  alignItems : 'center'
},
buttonWrapper: {
  flex : 3,
  flexDirection : 'row',
  justifyContent : 'space-around',
  alignItems : 'center'
},
timer : {
  fontSize : 60
},
footer : {
  flex : 1
},
button : {
  borderWidth :2,
  height : 100,
  width : 100,
  borderRadius :50,
  justifyContent : 'center',
  alignItems : 'center'
},
startButton : {
  borderColor : '#00CC00'
},
StopButton : {
  borderColor : '#CC0000'
},
lap : {
  justifyContent : 'space-around',
  flexDirection : 'row'
},
lapText : {
  fontSize : 30
}


});

AppRegistry.registerComponent('StopWatch', () => StopWatch);
