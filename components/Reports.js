import * as React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const reportsData = [
    {
        farmName: 'Green Acres',
        gpsCoordinates: '12.345678, 98.765432',
        cropType: 'Wheat',
        growthStage: 'Vegetative',
        pestType: 'Aphids',
        pestDescription: 'Small green insects on the leaves.',
        id: '1A'
    },
    {
        farmName: 'Sunny Farm',
        gpsCoordinates: '13.456789, 99.876543',
        cropType: 'Corn',
        growthStage: 'Flowering',
        pestType: 'Locusts',
        pestDescription: 'Locusts eating the crops.',
        id: '2B'
    },
    {
        farmName: 'Mountain View Farm',
        gpsCoordinates: '14.567890, 97.654321',
        cropType: 'Soybean',
        growthStage: 'Seedling',
        pestType: 'Fungi',
        pestDescription: 'Fungal growth on the plant stems.',
        id: '3C'
    },
    // Add more items as needed...
];

export default function Reports() {
    const Item = ({ farmName, gpsCoordinates, cropType, growthStage, pestType, pestDescription }) => (
        <View style={styles.innerContainer}>
            <Text style={styles.itemTitle}>{farmName}</Text>
            <Text style={styles.itemText}>GPS: {gpsCoordinates}</Text>
            <Text style={styles.itemText}>Crop: {cropType}</Text>
            <Text style={styles.itemText}>Growth Stage: {growthStage}</Text>
            <Text style={styles.itemText}>Pest Type: {pestType}</Text>
            <Text style={styles.itemText}>Pest Description: {pestDescription}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item 
            farmName={item.farmName} 
            gpsCoordinates={item.gpsCoordinates} 
            cropType={item.cropType} 
            growthStage={item.growthStage} 
            pestType={item.pestType} 
            pestDescription={item.pestDescription} 
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reports</Text>
            <FlatList
                data={reportsData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
});
