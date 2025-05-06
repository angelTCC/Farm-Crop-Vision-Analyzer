
import { StyleSheet } from 'react-native';
export const AddReportStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff'
    },
    scrollContent: {
      paddingBottom: 40
    },
    inputGroup: {
      marginBottom: 20,
      position: 'relative'
    },
    label: {
      marginBottom: 8,
      fontWeight: '500',
      color: '#333'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#fff'
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    flex1: {
      flex: 1
    },
    iconButton: {
      marginLeft: 10,
      padding: 8
    },
    suggestionsContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginTop: 4,
      zIndex: 10,
      maxHeight: 200,
      elevation: 3
    },
    suggestionItem: {
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    },
    suggestionText: {
      marginLeft: 8,
      fontSize: 16
    },
    pickerInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 12
    },
    placeholder: {
      color: '#999'
    },
    selectedValue: {
      color: '#000'
    },
    modalOptions: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10
    },
    modalOptionText: {
      fontSize: 16,
      padding: 12
    },
    multilineInput: {
      minHeight: 100,
      textAlignVertical: 'top'
    },
    submitButton: {
      backgroundColor: '#2e86c1',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20
    },
    submitButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16
    },
    errorText: {
      color: '#e74c3c',
      marginTop: 5,
      fontSize: 14
    }
  });