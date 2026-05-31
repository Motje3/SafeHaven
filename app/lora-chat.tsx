/**
 * Data-free chat — standalone test screen.
 *
 * Connects to a TTGO LoRa32 board over Bluetooth and exchanges text that the
 * board relays over LoRa radio. No internet, no cellular. Route: /lora-chat
 *
 * Reminder: this needs a dev build (react-native-ble-plx is native). In Expo Go
 * it shows the "not available" notice instead of working.
 */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { ChatMessage, ConnState, useLoraChat } from '@/lib/ble/lora-chat';

const PURPLE = '#7C6FE0';

const STATUS_LABEL: Record<ConnState, string> = {
  idle: 'Niet verbonden',
  scanning: 'Zoeken naar bord…',
  connecting: 'Verbinden…',
  connected: 'Verbonden',
  disconnected: 'Verbinding verbroken',
  error: 'Fout',
};

const STATUS_COLOR: Record<ConnState, string> = {
  idle: '#94A3B8',
  scanning: '#F59E0B',
  connecting: '#F59E0B',
  connected: '#1BD15D',
  disconnected: '#94A3B8',
  error: '#EF4444',
};

function Bubble({ message }: { message: ChatMessage }) {
  const outgoing = message.direction === 'out';
  return (
    <View
      style={[
        styles.bubbleRow,
        { justifyContent: outgoing ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View style={[styles.bubble, outgoing ? styles.bubbleOut : styles.bubbleIn]}>
        <Text style={outgoing ? styles.bubbleTextOut : styles.bubbleTextIn}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

export default function LoraChatScreen() {
  const insets = useSafeAreaInsets();
  const {
    isBleAvailable,
    state,
    deviceName,
    error,
    messages,
    connect,
    disconnect,
    send,
  } = useLoraChat();

  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const connected = state === 'connected';
  const busy = state === 'scanning' || state === 'connecting';

  const onSend = () => {
    if (!draft.trim()) return;
    send(draft);
    setDraft('');
  };

  // Expo Go / missing native module — explain why and stop here.
  if (!isBleAvailable) {
    return (
      <View style={styles.root}>
        <ScreenTopBar title="Data-vrij gesprek" showBack />
        <View style={styles.notice}>
          <MaterialIcons name="bluetooth-disabled" size={40} color="#94A3B8" />
          <Text style={styles.noticeTitle}>Bluetooth niet beschikbaar</Text>
          <Text style={styles.noticeBody}>
            Deze functie heeft een dev build nodig. Bluetooth werkt niet in Expo Go.
            {'\n\n'}Sluit Expo Go en start met:{'\n'}
            <Text style={styles.code}>npx expo run:android</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScreenTopBar title="Data-vrij gesprek" showBack />

      {/* Status row */}
      <View style={styles.statusRow}>
        <View style={styles.statusLeft}>
          <View style={[styles.dot, { backgroundColor: STATUS_COLOR[state] }]} />
          <Text style={styles.statusText}>
            {STATUS_LABEL[state]}
            {connected && deviceName ? ` · ${deviceName}` : ''}
          </Text>
        </View>
        <Pressable
          onPress={connected ? disconnect : connect}
          disabled={busy}
          style={({ pressed }) => [
            styles.connectBtn,
            connected && styles.disconnectBtn,
            (pressed || busy) && { opacity: 0.6 },
          ]}
        >
          <Text style={[styles.connectText, connected && styles.disconnectText]}>
            {connected ? 'Verbreken' : busy ? '…' : 'Verbinden'}
          </Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <Bubble message={item} />}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="radio" size={36} color="#CBD5E1" />
            <Text style={styles.emptyText}>
              {connected
                ? 'Verbonden. Typ een bericht om te beginnen.'
                : 'Verbind met een bord om te chatten.'}
            </Text>
          </View>
        }
      />

      {/* Composer */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <View style={[styles.composer, { paddingBottom: insets.bottom + 10 }]}>
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder={connected ? 'Bericht…' : 'Eerst verbinden'}
            placeholderTextColor="#94A3B8"
            editable={connected}
            onSubmitEditing={onSend}
            returnKeyType="send"
            multiline
          />
          <Pressable
            onPress={onSend}
            disabled={!connected || !draft.trim()}
            style={({ pressed }) => [
              styles.sendBtn,
              (!connected || !draft.trim()) && styles.sendBtnDisabled,
              pressed && { opacity: 0.7 },
            ]}
          >
            <MaterialIcons name="send" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F6' },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  statusLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  statusText: { fontSize: 13, fontWeight: '600', color: '#475569', flexShrink: 1 },

  connectBtn: {
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  disconnectBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(124,111,224,0.45)',
  },
  connectText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  disconnectText: { color: PURPLE },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 6,
  },

  listContent: { paddingHorizontal: 16, paddingVertical: 8, flexGrow: 1 },

  bubbleRow: { flexDirection: 'row', marginVertical: 4 },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
  },
  bubbleOut: { backgroundColor: PURPLE, borderBottomRightRadius: 5 },
  bubbleIn: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#E8E8EE',
  },
  bubbleTextOut: { color: '#FFFFFF', fontSize: 15 },
  bubbleTextIn: { color: '#1A1A2E', fontSize: 15 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 80 },
  emptyText: { color: '#94A3B8', fontSize: 14, textAlign: 'center', paddingHorizontal: 40 },

  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8EE',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: '#F1F1F4',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 11,
    fontSize: 15,
    color: '#1A1A2E',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#CBD5E1' },

  notice: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 40 },
  noticeTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A2E' },
  noticeBody: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 21 },
  code: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: PURPLE, fontWeight: '600' },
});
