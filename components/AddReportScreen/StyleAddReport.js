
import { StyleSheet } from 'react-native';
export const AddReportStyles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      margin: 10,
      fontSize: 16,
      backgroundColor: '#fff'
    },
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#fff'
    },
    button: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      margin: 10,
      fontSize: 16,
      alignItems:'center',
      backgroundColor:'#ddd', 
    },
    imageButton:{
      flex:1, alignItems:'center', justifyContent:'center', 
      borderColor: '#ccc', borderStyle: 'dashed',borderRadius:8, 
      borderWidth:2, padding:10, margin:10,
      height:120
    },
    pressButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        margin: 10,
        fontSize: 16,
        backgroundColor:'rgb(151, 158, 165)', 
      }
  });