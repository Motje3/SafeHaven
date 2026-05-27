import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface BaseProps {
  timestamp: string;
}

interface PlainProps extends BaseProps {
  variant: 'plain';
  message: string;
}

interface AlertProps extends BaseProps {
  variant: 'alert';
  who: string;
  location: string;
}

interface ReplyProps extends BaseProps {
  variant: 'reply';
  message: string;
  onYes?: () => void;
  onNo?: () => void;
}

type NotificationItemProps = PlainProps | AlertProps | ReplyProps;

export function NotificationItem(props: NotificationItemProps) {
  if (props.variant === 'alert') {
    return (
      <View style={styles.row}>
        <View style={styles.alertIcon}>
          <MaterialCommunityIcons name="shield-alert" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.bodyCol}>
          <Text style={styles.alertBold}>
            <Text style={styles.alertBoldItalic}>{props.who}</Text> vraagt om hulp.
          </Text>
          <Text style={styles.alertSub}>
            <Text style={styles.alertSubItalic}>Locatie: {props.location}</Text>
          </Text>
        </View>
        <Text style={styles.time}>{props.timestamp}</Text>
      </View>
    );
  }

  if (props.variant === 'reply') {
    return (
      <View style={styles.row}>
        <View style={styles.bodyCol}>
          <Text style={styles.boldMessage}>{props.message}</Text>
          <View style={styles.replyRow}>
            <Text style={styles.replyLabel}>Reageer</Text>
            <Pressable
              onPress={props.onYes}
              style={({ pressed }) => [styles.replyBtn, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.replyBtnText}>Ja</Text>
            </Pressable>
            <Pressable
              onPress={props.onNo}
              style={({ pressed }) => [styles.replyBtn, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.replyBtnText}>Nee</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.time}>{props.timestamp}</Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.bodyCol}>
        <Text style={styles.plainItalic}>{props.message}</Text>
      </View>
      <Text style={styles.time}>{props.timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyCol: {
    flex: 1,
    gap: 2,
  },
  plainItalic: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#0F172A',
    lineHeight: 20,
  },
  alertBold: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
  },
  alertBoldItalic: {
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#0F172A',
  },
  alertSub: {
    fontSize: 10,
    color: '#0F172A',
    lineHeight: 18,
  },
  alertSubItalic: {
    fontStyle: 'italic',
  },
  boldMessage: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
  },
  replyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  replyLabel: {
    fontSize: 10,
    color: '#0F172A',
    fontWeight: '500',
  },
  replyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  replyBtnText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  time: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
});
