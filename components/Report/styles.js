import React from 'react';
import { StyleSheet } from 'react-native';

export const reportStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    innerContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
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
