import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ActionCard, type ActionIconConfig } from '@/components/community/action-card';
import { ScreenTopBar } from '@/components/shared/screen-top-bar';
import { useEmergency } from '@/hooks/use-emergency';

const SCREEN_W = Dimensions.get('window').width;
const PAGE_PAD = 16;
const GRID_GAP = 12;
const CARD_W = (SCREEN_W - PAGE_PAD * 2 - GRID_GAP) / 2;

type GridAction = {
  label: string;
  icon: ActionIconConfig;
};

const EMERGENCY_ACTIONS: GridAction[] = [
  { label: 'Ik heb hulp nodig', icon: { lib: 'mc', name: 'shield-alert', color: '#EF2A2A', size: 44 } },
  { label: 'Ik ben bij de kast', icon: { lib: 'material', name: 'home', color: '#EF2A2A', size: 44 } },
  { label: 'Ik ben veilig', icon: { lib: 'material', name: 'favorite', color: '#EF2A2A', size: 44 } },
  { label: 'Wie is er bij de\nkast?', icon: { lib: 'mc', name: 'account-question', color: '#EF2A2A', size: 44 } },
];

export default function CommunityScreen() {
  const router = useRouter();
  const { emergency } = useEmergency();
  const [activeStatus, setActiveStatus] = useState<number | null>(emergency ? 0 : null);
  const [chatDraft, setChatDraft] = useState('');

  if (emergency) {
    return (
      <View style={styles.root}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <Animated.View entering={FadeInDown.duration(400).springify()}>
            <ScreenTopBar title="Community" showBack reserveRightGutter />
          </Animated.View>

          <View style={styles.body}>
            <Animated.View entering={FadeInDown.duration(500).delay(120).springify()} style={styles.grid}>
              {EMERGENCY_ACTIONS.map((a, i) => (
                <ActionCard
                  key={`${a.label}-${i}`}
                  label={a.label}
                  icon={a.icon}
                  width={CARD_W}
                  active={activeStatus === i}
                  onPress={() => setActiveStatus(i)}
                />
              ))}
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <ScreenTopBar title="Community" />
        </Animated.View>

        <View style={styles.body}>
          <Animated.View entering={FadeInDown.duration(500).delay(80).springify()}>
            <BuurtCard />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(140).springify()}>
            <GepindeBerichtenCard />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(200).springify()}>
            <BuurtchatCard
              draft={chatDraft}
              onDraftChange={setChatDraft}
              onPress={() => router.push('/berichten' as any)}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(260).springify()}>
            <AgendaCard onPress={() => router.push('/agenda' as any)} />
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(320).springify()}>
            <SpaarpotjeCard onPress={() => router.push('/spaarpotjes' as any)} />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

/* --------------- Sub-cards --------------- */

function BuurtCard() {
  return (
    <View style={styles.buurtCard}>
      <MaterialIcons name="location-pin" size={22} color="#1BD15D" />
      <View style={styles.buurtTextCol}>
        <Text style={styles.buurtTitle}>Buurt</Text>
        <Text style={styles.buurtSubtitle}>Ouden Noorden Rotterdam - 150 bewoners</Text>
      </View>
    </View>
  );
}

function GepindeBerichtenCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <MaterialIcons name="push-pin" size={18} color="#0F172A" style={{ transform: [{ rotate: '40deg' }] }} />
        <Text style={styles.cardHeaderTitle}>Gepinde berichten</Text>
      </View>

      <View style={styles.messageRow}>
        <Image source={require('../../public/dog.png')} style={styles.avatarSm} resizeMode="cover" />
        <View style={styles.messageBody}>
          <View style={styles.messageHeader}>
            <Text style={styles.messageWho}>Buurman nummer 12</Text>
            <Text style={styles.messageTime}>1 mei</Text>
          </View>
          <Text style={styles.messagePreview} numberOfLines={1}>
            Ik wilde een afspraak inplannen vo...
          </Text>
        </View>
      </View>
    </View>
  );
}

function BuurtchatCard({
  draft,
  onDraftChange,
  onPress,
}: {
  draft: string;
  onDraftChange: (v: string) => void;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <View style={styles.cardHeaderRow}>
        <MaterialIcons name="chat-bubble-outline" size={18} color="#0F172A" />
        <Text style={styles.cardHeaderTitle}>Buurtchat</Text>
        <View style={styles.flexFill} />
        <MaterialIcons name="chevron-right" size={22} color="#0F172A" />
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.messageRow}>
        <Image source={require('../../public/dog.png')} style={styles.avatarSm} resizeMode="cover" />
        <View style={styles.messageBody}>
          <View style={styles.messageHeader}>
            <Text style={styles.messageWho}>Buurman nummer 12</Text>
            <Text style={styles.messageTimeGreen}>12:45</Text>
          </View>
          <View style={styles.messagePreviewRow}>
            <Text style={styles.messagePreview} numberOfLines={1}>
              Ik wilde een afspraak inplanne...
            </Text>
            <View style={styles.unreadDot}>
              <Text style={styles.unreadDotText}>1</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.messageRow}>
        <Image source={require('../../public/dog.png')} style={styles.avatarSm} resizeMode="cover" />
        <View style={styles.messageBody}>
          <View style={styles.messageHeader}>
            <Text style={styles.messageWho}>Buurman nummer 12</Text>
            <Text style={styles.messageTimeGreen}>12:45</Text>
          </View>
          <View style={styles.messagePreviewRow}>
            <Text style={styles.messagePreview} numberOfLines={1}>
              Ik wilde een afspraak inplanne...
            </Text>
            <View style={styles.unreadDot}>
              <Text style={styles.unreadDotText}>1</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.chatInputRow}>
        <TextInput
          value={draft}
          onChangeText={onDraftChange}
          placeholder="Verstuur snel bericht."
          placeholderTextColor="#9CA3AF"
          style={styles.chatInput}
        />
        <Pressable hitSlop={8} style={({ pressed }) => [styles.chatSend, pressed && { opacity: 0.6 }]}>
          <MaterialIcons name="send" size={18} color="#0F172A" />
        </Pressable>
      </View>
    </Pressable>
  );
}

function AgendaCard({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <View style={styles.cardHeaderRow}>
        <MaterialIcons name="calendar-today" size={18} color="#0F172A" />
        <Text style={styles.cardHeaderTitle}>Agenda</Text>
        <View style={styles.flexFill} />
        <MaterialIcons name="chevron-right" size={22} color="#0F172A" />
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.eventRow}>
        <View style={[styles.eventIcon, { backgroundColor: '#1BD15D' }]}>
          <MaterialIcons name="groups" size={26} color="#FFFFFF" />
        </View>
        <View style={styles.eventBody}>
          <Text style={styles.eventMeta}>WO 19 mei - 10.00 - 12.00</Text>
          <Text style={styles.eventTitle}>Bijeenkomst noodplan</Text>
          <View style={styles.eventLocRow}>
            <MaterialIcons name="location-pin" size={13} color="#6B7280" />
            <Text style={styles.eventLoc}>Locatie: Buurthuis</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={22} color="#0F172A" />
      </View>

      <View style={styles.eventRow}>
        <View style={[styles.eventIcon, { backgroundColor: '#60A5FA' }]}>
          <MaterialIcons name="groups" size={26} color="#FFFFFF" />
        </View>
        <View style={styles.eventBody}>
          <Text style={styles.eventMeta}>DO 21 mei - 10.00 - 12.00</Text>
          <Text style={styles.eventTitle}>Bijeenkomst noodplan</Text>
          <View style={styles.eventLocRow}>
            <MaterialIcons name="location-pin" size={13} color="#6B7280" />
            <Text style={styles.eventLoc}>Locatie: Buurthuis</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={22} color="#0F172A" />
      </View>
    </Pressable>
  );
}

function SpaarpotjeCard({ onPress }: { onPress?: () => void }) {
  const filled = 8;
  const total = 12;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name="piggy-bank-outline" size={20} color="#0F172A" />
        <Text style={styles.cardHeaderTitle}>Spaarpotje</Text>
        <View style={styles.flexFill} />
        <MaterialIcons name="chevron-right" size={22} color="#0F172A" />
      </View>

      <Text style={styles.spaarGoal}>Doel €80 - Noodradio</Text>

      <View style={styles.spaarBarRow}>
        <Text style={styles.spaarAmount}>€32</Text>
        <View style={styles.spaarBar}>
          {Array.from({ length: total }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.spaarSeg,
                { backgroundColor: i < filled ? '#1BD15D' : '#E5E7EB' },
              ]}
            />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

/* --------------- Styles --------------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  scroll: {
    flex: 1,
  },
  content: {},
  body: {
    paddingHorizontal: PAGE_PAD,
    paddingTop: 12,
    gap: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },

  // Buurt card
  buurtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14342B',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  buurtTextCol: {
    flex: 1,
  },
  buurtTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  buurtSubtitle: {
    fontSize: 10,
    color: '#E5E7EB',
    marginTop: 2,
  },

  // Generic white card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F1F4',
    marginVertical: 10,
  },
  flexFill: {
    flex: 1,
  },

  // Messages
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  avatarSm: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBody: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageWho: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },
  messageTime: {
    fontSize: 9,
    color: '#6B7280',
  },
  messageTimeGreen: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1BD15D',
  },
  messagePreview: {
    flex: 1,
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
    marginTop: 2,
  },
  messagePreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unreadDot: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: '#1BD15D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDotText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Chat input
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 14,
  },
  chatInput: {
    flex: 1,
    fontSize: 10,
    color: '#0F172A',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  chatSend: {
    padding: 6,
  },

  // Agenda
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventBody: {
    flex: 1,
  },
  eventMeta: {
    fontSize: 8,
    color: '#6B7280',
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
    letterSpacing: -0.2,
  },
  eventLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  eventLoc: {
    fontSize: 9,
    color: '#6B7280',
  },

  // Spaarpotje
  spaarGoal: {
    fontSize: 10,
    color: '#0F172A',
    fontStyle: 'italic',
    marginTop: 12,
  },
  spaarBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  spaarAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  spaarBar: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  spaarSeg: {
    flex: 1,
    height: 14,
    borderRadius: 2,
  },
});
