import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function EmergencyBadge() {
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.letter}>E</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#5BA2D8',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  inner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5C842',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
});
