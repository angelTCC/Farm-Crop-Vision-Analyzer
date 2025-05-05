import * as React from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Styles } from './styles';

export default function AddReport() {
    const [ farmeName, setFarmName ] = React.useState('')
    const [ gpsCoordinates, setGpsCoordinates ] = React.useState('')
    const [ cropType, setCropType ] = React.useState('')
    const [ growthStage, setGrowthStage ] = React.useState('')
    const [ pestType, setPestType ] = React.useState('')
    const [ pestDescription, setPestDescription ] = React.useState('')

    return (
        <View style={{ flex:1, padding: 30}}>
            <ScrollView keyboardDismissMode='on-drag'>
            <TextInput
                style={ Styles.input}
                value={ farmeName }
                onChange={ setFarmName }
                placeholder='Farm name'
            />
            <TextInput
                style={ Styles.input}
                value={ gpsCoordinates }
                onChange={ setGpsCoordinates}
                placeholder='GPS coordinates'
            />
            <TextInput 
                style={ Styles.input }
                value={ cropType }
                onChange={ setCropType}
                placeholder='Crop type'
            />
            <TextInput
                style={ Styles.input }
                value={ growthStage }
                onChange={ setGrowthStage }
                placeholder='Growth stage'
            />
            <TextInput
                style={ Styles.input }
                value={ pestType }
                onChange={ setPestType }
                placeholder='Pest type'
            />
            <TextInput
                style={ Styles.input }
                value={ pestDescription }
                onChange={ setPestDescription }
                placeholder='Pest description'
            />
            <Pressable
                style={Styles.button} >
                <Text style={{color:'white'}}>Submit</Text>
            </Pressable>
            </ScrollView>
        </View>
    )
}