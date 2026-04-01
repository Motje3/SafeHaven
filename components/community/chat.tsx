import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { LightVault } from '@/constants/theme';

const MOCK_MESSAGES = [
  { user: 'Anna', text: 'Is anyone else without power?', time: '19:02', mine: false },
  { user: 'Tom', text: 'Yeah, whole street is out here.', time: '19:03', mine: false },
  { user: 'You', text: 'Same here. Happened 10 minutes ago.', time: '19:04', mine: true },
  { user: 'Lisa', text: 'I heard a loud pop before it went out.', time: '19:05', mine: false },
  { user: 'Mark', text: 'Probably a transformer issue.', time: '19:05', mine: false },
  { user: 'You', text: 'Should we report it somewhere?', time: '19:06', mine: true },
  { user: 'Anna', text: 'I already called the utility company.', time: '19:07', mine: false },
  { user: 'Tom', text: 'Nice, thanks!', time: '19:08', mine: false },
];

export function Chat() {
  const scrollRef = React.useRef<Animated.ScrollView>(null);

  React.useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 50);
  }, []);

  return (
    <View style={styles.container}>
      {/* Messages */}
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_MESSAGES.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageRow,
              msg.mine ? styles.myRow : styles.otherRow,
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.mine ? styles.myBubble : styles.otherBubble,
              ]}
            >
              {!msg.mine && (
                <Text style={styles.username}>{msg.user}</Text>
              )}

              <Text
                style={[
                  styles.messageText,
                  msg.mine && styles.myMessageText,
                ]}
              >
                {msg.text}
              </Text>

              <Text
                style={[
                  styles.timestamp,
                  msg.mine && styles.myTimestamp,
                ]}
              >
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      {/* 💬 Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Send a message..."
          placeholderTextColor={LightVault.textMuted}
          style={styles.input}
        />
        <Pressable style={styles.sendBtn}>
          <MaterialIcons name="send" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  scroll: {
    flex: 1,
    gap: 10,
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 24,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: LightVault.textPrimary,
  },

  subtitle: {
    fontSize: 14,
    color: LightVault.textSecondary,
    marginBottom: 10,
  },

  messageRow: {
    flexDirection: 'row',
  },

  myRow: {
    justifyContent: 'flex-end',
  },

  otherRow: {
    justifyContent: 'flex-start',
  },

  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },

  myBubble: {
    backgroundColor: '#22D3EE',
  },

  otherBubble: {
    backgroundColor: LightVault.glassBase,
    borderWidth: 1,
    borderColor: LightVault.glassBorder,
  },

  username: {
    fontSize: 10,
    fontWeight: '700',
    color: LightVault.textMuted,
    marginBottom: 2,
  },

  messageText: {
    fontSize: 13,
    color: '#1A1A2E',
  },

  myMessageText: {
    color: '#FFFFFF',
  },

  timestamp: {
    fontSize: 10,
    color: LightVault.textMuted,
    marginTop: 4,
    alignSelf: 'flex-end',
  },

  myTimestamp: {
    color: 'rgba(255,255,255,0.7)',
  },

  /* 💬 Input bar */
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },

  input: {
    flex: 1,
    backgroundColor: LightVault.glassBase,
    borderWidth: 1,
    borderColor: LightVault.glassBorder,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: LightVault.textPrimary,
  },

  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22D3EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});