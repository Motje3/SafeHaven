import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Community</ThemedText>
      <ThemedText style={styles.sub}>Requests & Offers</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#F0EFFE' },
  sub: { opacity: 0.45, color: '#1A1A2E' },
});
