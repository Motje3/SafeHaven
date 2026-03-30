import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Profile & Credits</ThemedText>
      <ThemedText style={styles.sub}>Karma points & digital key</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  sub: { opacity: 0.5 },
});
