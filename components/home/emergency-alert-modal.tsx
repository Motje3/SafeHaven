import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface EmergencyAlertModalProps {
  visible: boolean;
  title: string;
  timestamp: string;
  message: string;
  onAcknowledge: () => void;
}

export function EmergencyAlertModal({
  visible,
  title,
  timestamp,
  message,
  onAcknowledge,
}: EmergencyAlertModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onAcknowledge}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <MaterialIcons name="warning" size={22} color="#DC2626" />
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.timestamp}>{timestamp}</Text>
          <Text style={styles.message}>{message}</Text>

          <Pressable
            onPress={onAcknowledge}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Begrepen</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  timestamp: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: '#0F172A',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#14342B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
