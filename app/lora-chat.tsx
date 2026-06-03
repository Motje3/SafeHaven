/**
 * Data-free chat — neighbourhood messaging over LoRa.
 *
 * Connects to a TTGO LoRa32 board over Bluetooth and exchanges text that the
 * board relays over LoRa radio. No internet, no cellular. Route: /lora-chat
 *
 * Reminder: this needs a dev build (react-native-ble-plx is native). In Expo Go
 * it shows the "not available" notice instead of working.
 *
 * NOTE: the LoRa/BLE wiring lives in useLoraChat() and is intentionally left
 * untouched — this file only handles presentation. The "Hele wijk" group is the
 * live LoRa channel (real send/receive); the other chats are local demo data.
 */
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { ConnState, useLoraChat } from '@/lib/ble/lora-chat';

const GREEN = '#1BD15D';
const DARK = '#14342B';

type Msg = { id: string; text: string; mine: boolean };

type Chat = {
  id: string;
  name: string;
  group?: boolean;
  members?: number;
  initials?: string;
  tint?: string;
  preview: string;
  time: string;
  unread?: number;
  lora?: boolean; // the live LoRa channel
};

const CHATS: Chat[] = [
  { id: 'buurman12', name: 'Buurman 12', initials: 'B', tint: '#BFE0EE', preview: 'Tik om een gesprek te starten', time: '' },
  { id: 'lola', name: 'Lola', initials: 'L', tint: '#F5D38A', preview: 'Ik kom zo even langs 👋', time: '14:02', unread: 1 },
  { id: 'sven', name: 'Sven', initials: 'S', tint: '#C9E4C5', preview: 'Top, bedankt!', time: '11:45' },
  { id: 'wijk', name: 'Hele wijk', group: true, members: 150, preview: 'Groep voor de hele buurt · via LoRa', time: '', lora: true },
];

// Pre-filled demo threads (for portfolio screenshots). The LoRa group is empty
// and driven by the real messages from useLoraChat().
const SEED: Record<string, Msg[]> = {
  buurman12: [],
  lola: [
    { id: 'a1', text: 'Hey! Heb je de buurt-app al gezien?', mine: false },
    { id: 'a2', text: 'Ja, super handig! Werkt zelfs zonder internet 🙌', mine: true },
    { id: 'a3', text: 'Precies waarvoor het bedoeld is 😄', mine: false },
    { id: 'a4', text: 'Ik kom zo even langs 👋', mine: false },
  ],
  sven: [
    { id: 'b1', text: 'Heb je de noodradio nog liggen?', mine: false },
    { id: 'b2', text: 'Die ligt klaar, kom maar halen', mine: true },
    { id: 'b3', text: 'Top, bedankt!', mine: false },
  ],
};

const STATUS_LABEL: Record<ConnState, string> = {
  idle: 'Niet verbonden',
  scanning: 'Zoeken naar bord…',
  connecting: 'Verbinden…',
  connected: 'Verbonden',
  disconnected: 'Verbinding verbroken',
  error: 'Fout',
};

function Avatar({ chat, size = 50 }: { chat: Chat; size?: number }) {
  if (chat.group) {
    return (
      <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: DARK }]}>
        <MaterialIcons name="groups" size={size * 0.5} color="#FFFFFF" />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: chat.tint ?? '#E9F2E1' },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.36 }]}>{chat.initials}</Text>
    </View>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  return (
    <View style={[styles.bubbleRow, { justifyContent: msg.mine ? 'flex-end' : 'flex-start' }]}>
      <View style={[styles.bubble, msg.mine ? styles.bubbleOut : styles.bubbleIn]}>
        <Text style={msg.mine ? styles.bubbleTextOut : styles.bubbleTextIn}>{msg.text}</Text>
      </View>
    </View>
  );
}

export default function LoraChatScreen() {
  const insets = useSafeAreaInsets();
  const { isBleAvailable, state, deviceName, error, messages, connect, disconnect, send } = useLoraChat();

  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [threads, setThreads] = useState<Record<string, Msg[]>>(SEED);
  const listRef = useRef<FlatList<Msg>>(null);

  const connected = state === 'connected';
  const busy = state === 'scanning' || state === 'connecting';
  const openChat = CHATS.find((c) => c.id === openId) ?? null;

  // Live LoRa messages mapped into the unified bubble shape.
  const loraThread: Msg[] = messages.map((m) => ({ id: m.id, text: m.text, mine: m.direction === 'out' }));
  const thread: Msg[] = openChat ? (openChat.lora ? loraThread : threads[openChat.id] ?? []) : [];

  const onSend = () => {
    const text = draft.trim();
    if (!text || !openChat) return;
    if (openChat.lora) {
      if (!connected) return;
      send(text); // real LoRa broadcast — untouched backend
    } else {
      setThreads((prev) => ({
        ...prev,
        [openChat.id]: [
          ...(prev[openChat.id] ?? []),
          { id: `${openChat.id}-${(prev[openChat.id]?.length ?? 0)}-${Date.now()}`, text, mine: true },
        ],
      }));
    }
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

  /* ---------------- Inbox ---------------- */
  if (!openChat) {
    return (
      <View style={styles.root}>
        <ScreenTopBar title="Data-vrij gesprek" showBack />

        <View style={styles.banner}>
          <MaterialCommunityIcons name="radio-tower" size={18} color={GREEN} />
          <Text style={styles.bannerText}>
            Berichten gaan via LoRa-radio — geen internet of data nodig.
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
          {CHATS.map((c, i) => (
            <Pressable
              key={c.id}
              onPress={() => setOpenId(c.id)}
              style={({ pressed }) => [
                styles.inboxRow,
                !c.lora && styles.inboxRowExample,
                pressed && { backgroundColor: '#F1F1F4' },
              ]}
            >
              <Avatar chat={c} />
              <View style={styles.inboxBody}>
                <View style={styles.inboxTopRow}>
                  <Text style={styles.inboxName} numberOfLines={1}>{c.name}</Text>
                  {c.lora ? (
                    <View style={[styles.liveTag, connected && styles.liveTagOn]}>
                      <View style={[styles.liveDot, connected && styles.liveDotOn]} />
                      <Text style={[styles.liveTagText, connected && styles.liveTagTextOn]}>LoRa</Text>
                    </View>
                  ) : (
                    <View style={styles.exampleTag}>
                      <Text style={styles.exampleTagText}>Voorbeeld</Text>
                    </View>
                  )}
                </View>
                <View style={styles.inboxBottomRow}>
                  <Text style={styles.inboxPreview} numberOfLines={1}>
                    {c.lora && connected ? 'Verbonden · klaar om te chatten' : c.preview}
                  </Text>
                  {c.unread ? (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{c.unread}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              {i < CHATS.length - 1 ? <View style={styles.inboxDivider} /> : null}
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  /* ---------------- Conversation ---------------- */
  const isLora = !!openChat.lora;
  const canType = isLora ? connected : true;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      {/* Conversation header */}
      <View style={[styles.convHeader, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={() => {
            setOpenId(null);
            setDraft('');
          }}
          hitSlop={10}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
        >
          <MaterialIcons name="chevron-left" size={28} color="#0F172A" />
        </Pressable>
        <Avatar chat={openChat} size={38} />
        <View style={styles.convTitleCol}>
          <Text style={styles.convName} numberOfLines={1}>{openChat.name}</Text>
          <Text style={styles.convSub} numberOfLines={1}>
            {isLora
              ? connected
                ? `Verbonden · ${deviceName ?? 'LoRa'}`
                : STATUS_LABEL[state]
              : openChat.group
                ? `${openChat.members} leden`
                : 'online'}
          </Text>
        </View>
        {isLora && (
          <Pressable
            onPress={connected ? disconnect : connect}
            disabled={busy}
            style={({ pressed }) => [
              styles.connBtn,
              connected && styles.connBtnOn,
              (pressed || busy) && { opacity: 0.6 },
            ]}
          >
            <Text style={[styles.connBtnText, connected && styles.connBtnTextOn]}>
              {connected ? 'Verbreken' : busy ? '…' : 'Verbinden'}
            </Text>
          </Pressable>
        )}
      </View>

      {error && isLora ? <Text style={styles.errorText}>{error}</Text> : null}

      {!isLora ? (
        <View style={styles.exampleBanner}>
          <MaterialIcons name="info-outline" size={15} color="#92722A" />
          <Text style={styles.exampleBannerText}>
            Voorbeeldgesprek — gaat niet via LoRa. Gebruik “Hele wijk” voor de echte data-vrije chat.
          </Text>
        </View>
      ) : null}

      <FlatList
        ref={listRef}
        data={thread}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <Bubble msg={item} />}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons
                name={isLora ? 'radio-tower' : 'message-outline'}
                size={32}
                color={GREEN}
              />
            </View>
            <Text style={styles.emptyText}>
              {isLora
                ? connected
                  ? 'Verbonden. Stuur het eerste bericht naar de wijk.'
                  : 'Verbind met het LoRa-bord om te chatten.'
                : 'Nog geen berichten. Stuur er eentje 👋'}
            </Text>
          </View>
        }
      />

      <View style={[styles.composer, { paddingBottom: insets.bottom + 10 }]}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder={canType ? `Bericht naar ${openChat.name}…` : 'Eerst verbinden'}
          placeholderTextColor="#94A3B8"
          editable={canType}
          onSubmitEditing={onSend}
          returnKeyType="send"
          multiline
        />
        <Pressable
          onPress={onSend}
          disabled={!canType || !draft.trim()}
          style={({ pressed }) => [
            styles.sendBtn,
            (!canType || !draft.trim()) && styles.sendBtnDisabled,
            pressed && { opacity: 0.7 },
          ]}
        >
          <MaterialIcons name="send" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F6' },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#EAF7EE',
    borderRadius: 12,
  },
  bannerText: { flex: 1, fontSize: 11, color: DARK, fontWeight: '600', lineHeight: 16 },

  // Inbox
  inboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    position: 'relative',
  },
  avatar: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarText: { fontWeight: '800', color: DARK },
  inboxRowExample: { opacity: 0.55 },
  inboxBody: { flex: 1, gap: 3 },
  inboxTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inboxName: { fontSize: 14, fontWeight: '800', color: '#0F172A', letterSpacing: -0.3, flex: 1 },
  inboxTime: { fontSize: 10, color: '#94A3B8', fontWeight: '600' },
  inboxBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  inboxPreview: { flex: 1, fontSize: 12, color: '#6B7280' },
  inboxDivider: {
    position: 'absolute',
    left: 80,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#ECECEF',
  },
  unreadBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { fontSize: 9, fontWeight: '800', color: '#FFFFFF' },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#EEF1F4',
  },
  liveTagOn: { backgroundColor: '#EAF7EE' },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#94A3B8' },
  liveDotOn: { backgroundColor: GREEN },
  liveTagText: { fontSize: 9, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.3 },
  liveTagTextOn: { color: GREEN },
  exampleTag: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#FBF1D9',
  },
  exampleTagText: { fontSize: 9, fontWeight: '800', color: '#92722A', letterSpacing: 0.3 },
  exampleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#FBF1D9',
    borderRadius: 12,
  },
  exampleBannerText: { flex: 1, fontSize: 11, color: '#92722A', fontWeight: '600', lineHeight: 15 },

  // Conversation header
  convHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEF',
  },
  backBtn: { width: 30, alignItems: 'flex-start', justifyContent: 'center' },
  convTitleCol: { flex: 1 },
  convName: { fontSize: 14, fontWeight: '800', color: '#0F172A', letterSpacing: -0.3 },
  convSub: { fontSize: 10, color: '#6B7280', marginTop: 1 },
  connBtn: {
    backgroundColor: GREEN,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
  },
  connBtnOn: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: 'rgba(27,209,93,0.5)' },
  connBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  connBtnTextOn: { color: DARK },

  errorText: { color: '#EF4444', fontSize: 12, paddingHorizontal: 20, paddingTop: 8 },

  listContent: { paddingHorizontal: 16, paddingVertical: 10, flexGrow: 1 },
  bubbleRow: { flexDirection: 'row', marginVertical: 4 },
  bubble: { maxWidth: '78%', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 18 },
  bubbleOut: { backgroundColor: GREEN, borderBottomRightRadius: 5 },
  bubbleIn: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#E8E8EE',
  },
  bubbleTextOut: { color: '#FFFFFF', fontSize: 15 },
  bubbleTextIn: { color: '#1A1A2E', fontSize: 15 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingTop: 80 },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EAF7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#CBD5E1' },

  notice: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 40 },
  noticeTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A2E' },
  noticeBody: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 21 },
  code: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: GREEN, fontWeight: '600' },
});
