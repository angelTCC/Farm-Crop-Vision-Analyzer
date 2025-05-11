import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>📊 Dashboard Agrícola</Text>

      {/* Comentario visible para explicar propósito general del dashboard */}
      <Text style={styles.comment}>Este panel proporciona una visión general de datos agrícolas para apoyar decisiones de campo.</Text>

      {/* === Clima Actual === */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌦 Clima Actual</Text>
        <Text style={styles.comment}>Muestra las condiciones climáticas actuales en la zona de cultivo.</Text>
        <Text style={styles.cardText}>Ubicación: [Nombre de la zona]</Text>
        <Text style={styles.cardText}>Temperatura: [XX°C]</Text>
        <Text style={styles.cardText}>Humedad: [XX%]</Text>
        <Text style={styles.cardText}>Estado del cielo: [Soleado/Nublado]</Text>
      </View>

      {/* === Estadísticas del Cultivo === */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📈 Estadísticas del Cultivo</Text>
        <Text style={styles.comment}>Resumen de los reportes ingresados por el usuario: plagas, etapas del cultivo, tipo.</Text>
        <Text style={styles.cardText}>Número total de reportes: [X]</Text>
        <Text style={styles.cardText}>Tipo de cultivo más reportado: [Nombre]</Text>
        <Text style={styles.cardText}>Etapa más común: [Etapa]</Text>
        <Text style={styles.cardText}>Tipo de plaga más frecuente: [Nombre]</Text>
      </View>

      {/* === Recomendaciones IA (imagen) === */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 Recomendaciones IA (imagen)</Text>
        <Text style={styles.comment}>Procesa imágenes subidas por el usuario para detectar plagas con inteligencia artificial.</Text>
        <Text style={styles.cardText}>Resultado del análisis de imagen:</Text>
        <Text style={styles.cardText}>- Posible plaga: [Nombre]</Text>
        <Text style={styles.cardText}>- Severidad: [Baja/Media/Alta]</Text>
        <Text style={styles.cardText}>- Recomendación: [Texto de IA]</Text>
      </View>

      {/* === Recomendaciones IA (descripción) === */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 Recomendaciones IA (descripción)</Text>
        <Text style={styles.comment}>Usa texto ingresado por el usuario para diagnosticar problemas y recomendar acciones.</Text>
        <Text style={styles.cardText}>Descripción: "[Texto del usuario]"</Text>
        <Text style={styles.cardText}>Diagnóstico: [Nombre]</Text>
        <Text style={styles.cardText}>Recomendación: [Texto de IA]</Text>
      </View>

      {/* === Predicciones Futuras === */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Predicciones Futuras</Text>
        <Text style={styles.comment}>Provee estimaciones basadas en modelos predictivos: clima, plagas y rendimiento.</Text>
        <Text style={styles.cardText}>Clima estimado: [Resumen]</Text>
        <Text style={styles.cardText}>Riesgo de plaga: [Bajo/Medio/Alto]</Text>
        <Text style={styles.cardText}>Rendimiento estimado: [Kg/hectárea]</Text>
      </View>

      {/* === Información Útil === */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ℹ️ Información Útil</Text>
        <Text style={styles.comment}>Contenido educativo y alertas agrícolas para mejorar el manejo del campo.</Text>
        <Text style={styles.cardText}>- Calendario de siembra</Text>
        <Text style={styles.cardText}>- Alertas fitosanitarias</Text>
        <Text style={styles.cardText}>- Consejos según zona</Text>
      </View>
    </ScrollView>
  );
}

// Estilos visuales
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  comment: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
