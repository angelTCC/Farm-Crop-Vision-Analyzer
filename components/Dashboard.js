import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Dashboard() {
    // Example data
    const totalRevenue = 15000;
    const averageSales = 1250;
    const maxRevenue = 5000;
    const minRevenue = 800;
    const growth = 10;

    // Example KPIs
    const salesPerEmployee = 500;
    const averageOrderValue = 200;
    const conversionRate = 3.5; // percentage
    const customerAcquisitionCost = 50;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            <View style={styles.statsContainer}>
                <Text style={styles.stat}>Total Revenue: ${totalRevenue}</Text>
                <Text style={styles.stat}>Average Monthly Sales: ${averageSales}</Text>
                <Text style={styles.stat}>Maximum Revenue: ${maxRevenue}</Text>
                <Text style={styles.stat}>Minimum Revenue: ${minRevenue}</Text>
                <Text style={styles.stat}>Growth: +{growth}% from last month</Text>
            </View>

            <View style={styles.kpisContainer}>
                <Text style={styles.kpiTitle}>Key Performance Indicators (KPIs)</Text>
                <Text style={styles.kpi}>Sales per Employee: ${salesPerEmployee}</Text>
                <Text style={styles.kpi}>Average Order Value: ${averageOrderValue}</Text>
                <Text style={styles.kpi}>Conversion Rate: {conversionRate}%</Text>
                <Text style={styles.kpi}>Customer Acquisition Cost: ${customerAcquisitionCost}</Text>
            </View>

            <View style={styles.chartDescriptionContainer}>
                <Text style={styles.chartTitle}>Chart Descriptions</Text>
                <Text style={styles.chartDescription}>1. Line Chart (Trends over Time): This would show how sales or revenue change over time (e.g., monthly sales for the year).</Text>
                <Text style={styles.chartDescription}>2. Bar Chart (Comparison between Categories): This would compare sales or performance across different products or categories (e.g., product-wise sales).</Text>
            </View>

            <View style={styles.insightsContainer}>
                <Text style={styles.insightTitle}>Insights:</Text>
                <Text style={styles.insight}>- Sales have been steadily growing. Consider increasing marketing budget for higher-performing products.</Text>
                <Text style={styles.insight}>- Product B is underperforming; investigate further to identify causes.</Text>
                <Text style={styles.insight}>- The average order value is slightly lower than expected, consider cross-selling or upselling to boost it.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    statsContainer: {
        marginBottom: 30,
    },
    stat: {
        fontSize: 18,
        marginBottom: 5,
    },
    kpisContainer: {
        marginBottom: 30,
    },
    kpiTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    kpi: {
        fontSize: 18,
        marginBottom: 5,
    },
    chartDescriptionContainer: {
        marginBottom: 30,
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chartDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    insightsContainer: {
        marginBottom: 30,
    },
    insightTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    insight: {
        fontSize: 16,
        marginBottom: 5,
    },
});
