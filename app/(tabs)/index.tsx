import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function VaultScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">The Vault</ThemedText>
      <ThemedText style={styles.sub}>Your SafeHaven hub</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#F0EFFE' },
  sub: { opacity: 0.45, color: '#1A1A2E' },
});
