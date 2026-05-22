import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile & Credits</Text>
      <Text style={styles.sub}>Karma points & digital key</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#F4F4F6' },
  title: { fontSize: 26, fontWeight: '700', color: '#0F172A' },
  sub: { fontSize: 14, color: '#6B7280' },
});
