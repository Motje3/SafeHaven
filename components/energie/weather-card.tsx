import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WeatherCardProps {
  temperature?: number;
  condition?: string;
  location?: string;
  feelsLike?: number;
  humidity?: number;
  airQuality?: string;
}

export function WeatherCard({
  temperature = 18,
  condition = 'Licht bewolkt',
  location = 'Katendrecht',
  feelsLike = 15,
  humidity = 40,
  airQuality = 'Goed',
}: WeatherCardProps) {
  return (
    <LinearGradient
      colors={['#7DCBF0', '#A5DBF2']}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.card}
    >
      {/* Decorative clouds */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <MaterialCommunityIcons
          name="cloud"
          size={38}
          color="rgba(255,255,255,0.65)"
          style={[styles.cloud, { top: 14, left: 130 }]}
        />
        <MaterialCommunityIcons
          name="cloud"
          size={30}
          color="rgba(255,255,255,0.55)"
          style={[styles.cloud, { top: 70, left: 90 }]}
        />
        <MaterialCommunityIcons
          name="cloud"
          size={26}
          color="rgba(255,255,255,0.50)"
          style={[styles.cloud, { top: 30, left: 240 }]}
        />
      </View>

      {/* Sun icon */}
      <View style={styles.sunWrap} pointerEvents="none">
        <MaterialCommunityIcons name="weather-sunny" size={64} color="#FBBF24" />
        <MaterialCommunityIcons
          name="cloud"
          size={42}
          color="#FFFFFF"
          style={styles.sunCloud}
        />
      </View>

      <View style={styles.topRow}>
        <View>
          <Text style={styles.temp}>{temperature}°C</Text>
          <Text style={styles.condition}>{condition}</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="place" size={13} color="#FFFFFF" />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Gevoelstemp.</Text>
          <Text style={styles.statValue}>{feelsLike}°C</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Luchtvochtigheid</Text>
          <Text style={styles.statValue}>{humidity}%</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Luchtkwaliteit</Text>
          <Text style={styles.statValue}>{airQuality}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
  },
  cloud: {
    position: 'absolute',
  },
  sunWrap: {
    position: 'absolute',
    top: 10,
    right: 14,
    width: 90,
    height: 70,
  },
  sunCloud: {
    position: 'absolute',
    top: 24,
    left: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  temp: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1.2,
    lineHeight: 42,
  },
  condition: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.95,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  stat: {
    flex: 1,
    gap: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statValue: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.95,
  },
});
