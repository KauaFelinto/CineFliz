import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171717',
    },
    header:{
      padding: 30,
      marginTop: 35
    },
    headerText:{
      fontSize: 25,
      lineHeight: 30,
      color: '#9e1c1c',
      fontWeight: 'bold',
      textAlign:'center'
    },
    containerInput: {
      backgroundColor: '#4a4949',
      height: 40,
      padding: 10,
      borderRadius: 16,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    input: {
      color: '#fff',
      width: '80%',
      paddingLeft: 15
    }
  });