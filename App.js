import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { gray, green } from 'ansi-colors';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: '',
      result: ''
    }
  }

  handleOp(op) {
    if(op === 'C'){
      this.setState({
        display: '',
        result: ''
      })
    } else if(op === '='){
      this.setState({
        display: this.state.result,
        result: ''
      })
    } else {
      const display = this.state.display + op
      let result = this.state.result

      try {
        let fixedOperator = display.split('x').join('*')
        fixedOperator = fixedOperator.split('÷').join('/')
        fixedOperator = fixedOperator.split(',').join('.')
        result = new String(eval(fixedOperator)).toString()
      } catch(e) {}

      this.setState({
        display,
        result
      })
  }
  }

  render(){
    const col1Buttons = [
      ['7','8','9'],
      ['4','5','6'],
      ['1','2','3'],
      [',','0','=']
    ]
  
    const col2Buttons = ['C', '÷', 'x', '-', '+']

    return(
      <View style={styles.container}>
      <Text style={styles.display}>{this.state.display}</Text>
      <Text style={styles.result}>{this.state.result}</Text>
      <View style={styles.buttons}>
        <View style={styles.col1}>
          { col1Buttons.map((line, ind) => <View key={ind} style={styles.line}>
             { line.map( op=>  
                <TouchableOpacity key={op} style={styles.btn} onPress={ () => this.handleOp(op)}>
                  <Text style={styles.btnText}>{op}</Text>
                </TouchableOpacity>
              )}   
            </View>
          )}
        </View>
        <View style={styles.col2}>
          { col2Buttons.map( op=>  
            <TouchableOpacity key={op} style={styles.btn} onPress={ () => this.handleOp(op)}>
              <Text style={styles.btnText}>{op}</Text>
            </TouchableOpacity>
          )}   
        </View>
      </View>
    </View>
    )
  }
}
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    fontSize: 80,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  result: {
    flex: 0.5,
    backgroundColor: '#EFEFEF',
    fontSize: 40,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10
  },
  buttons: {
    flex: 5,
    flexDirection: 'row'
  },
  col1: {
    flex: 3,
    backgroundColor: '#000000'
  },
  line: {
    flex: 1,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white'

  },
  col2: {
    flex: 1,
    backgroundColor: '#0b0b0b'
  }
})
