import * as React from 'react';
import { TextInput, View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';

export default class App extends React.Component {

getword=(word)=>{
  var searchKeyword=word.toLowerCase()
  var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
  //console.log(url)
  return fetch(url)
  .then((data)=>{
    if(data.status===200)
    {
      return data.json()
    }
    else
    {
      return null
    }
  })
  .then((response)=>{
      console.log(response)

      var responseObject = response
      //var word = responseObject.word
      //var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
      if(responseObject)
      {
        var wordData = responseObject.definitions[0]
        //console.log(responseObject.definitions[0])
        var definition=wordData.description
        var lexicalCategory=wordData.wordtype
        //console.log(lexicalCategory)
        this.setState({
          "word" : this.state.text, 
          "definition" :definition,
          "lexicalCategory": lexicalCategory     
          
        })
      }
      else
      {
        this.setState({
          "word" : this.state.text, 
          "definition" :"Not Found",
          
        })

      }
  
  })
}

  constructor(){
    super()
    this.state={
      word:'',
      defination:'',
      example:[],
      lexicalCategory:'',
      text:''
      
    }
  }
  render() {
    return (
      <View style={style.a}>
        <SafeAreaProvider>
          <Header
            backgroundColor={'orange'}
            centerComponent={{
              text: 'My Dictionary',
              style: { color: 'black', fontWeight: 'bold' },
            }}
            leftComponent={{ icon: 'menu' }}
            rightComponent={{ icon: 'home' }}
          />
          <Text style={style.e}>Search For a Word!!!</Text>
          <View>
          <TextInput
            placeholder="Enter a Word"
            style={style.b}
            onChangeText={(text)=>{
            this.setState({
              text:text,
              word:'loading...',
              lexicalCategory:'',
              example:[],
              defination:''
              })
           }
          }
          value={this.state.search}             
            >              
          </TextInput>
          <TouchableOpacity
            style={style.c}
            onPress={
             this.getword(this.state.text)
           }
            >
           <Text 
           style={style.d}
           >
             Search
           </Text>
          </TouchableOpacity>
          </View>
          <View>

          <View style={{ marginTop:50, height:30, paddingTop:5, paddingLeft:5, flexDirection:'row'}}>
          <Text style={{fontWeight:'bold'}}>Word:{""}</Text>
          <Text style={{fontWeight:'bold', marginLeft:6}}>{this.state.word}</Text>

          </View>
          
          
           <View style={{ marginTop:50, height:30, paddingTop:5, paddingLeft:5, flexDirection:'row'}}>
          <Text style={{fontWeight:'bold'}}>Type:{""}</Text>
          <Text style={{fontWeight:'bold', marginLeft:6}}>{this.state.lexicalCategory}</Text>

          </View>
          
          
           <View style={{ marginTop:50, height:30, paddingTop:5, paddingLeft:5,flexDirection:'row', }}>
          <Text style={{fontWeight:'bold'}}>Definition:{""}</Text>
          <Text style={{fontWeight:'bold', marginLeft:6}}>{this.state.definition}</Text>

          </View>
</View>
        </SafeAreaProvider>
      </View>
    );
  }



}

const style = StyleSheet.create({

    a:{
        backgroundColor: 'rgb(32, 137, 220)' ,
        flex:1
    },

    b:{
        borderWidth: 3,
        backgroundColor: 'white',
        width: 230,
        height: 30,
        marginTop: 50,
        paddingHorizontal: 65,
        marginLeft: 12,
      },
      c:{
        backgroundColor:'black',
        width:50,
        marginLeft:252, 
        marginTop:-30, 
        height:30 

      },
      d:{
          color:'white',
          marginTop:5,
          marginLeft:3
    },
    e:{
      fontWeight:'bold',
      marginTop:40,
      marginBottom:-35,
      marginHorizontal:99
    }
      
    })
