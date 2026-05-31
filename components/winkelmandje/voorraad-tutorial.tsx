import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

interface VoorraadTutorialProps {
  onClose: () => void;
}

const BG = '#14342B';
const YELLOW = '#F5C842';
const YELLOW_DARK_TEXT = '#0F172A';
const STEP_INACTIVE = '#3D5249';
const TOTAL_STEPS = 5;

export function VoorraadTutorial({ onClose }: VoorraadTutorialProps) {
  const insets = useSafeAreaInsets();
  // page 0 = welkom, 1..5 = stappen
  const [page, setPage] = useState(0);

  const goNext = () => setPage((p) => Math.min(p + 1, 5));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {page === 0 ? (
          <WelcomePage onStart={goNext} onSkip={onClose} />
        ) : (
          <StepPage page={page} onNext={goNext} onBack={goPrev} onFinish={onClose} />
        )}
      </ScrollView>
    </View>
  );
}

/* ---------------- Welcome ---------------- */

function WelcomePage({ onStart, onSkip }: { onStart: () => void; onSkip: () => void }) {
  return (
    <Animated.View entering={FadeIn.duration(280)} style={styles.welcomeRoot}>
      <View style={styles.welcomeTop}>
        <Text style={styles.welcomeTitle}>
          Welkom bij{'\n'}
          <Text style={styles.welcomeTitleAccent}>voorraadbeheer!</Text>
        </Text>
        <Text style={styles.welcomeSubtitle}>
          Help mee door ontbrekende producten te verzamelen en in te leveren bij de BuurtHub.
        </Text>
        <Image
          source={require('../../public/vooradbeheer1.png')}
          style={styles.welcomeImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.welcomeBottom}>
        <Pressable
          onPress={onStart}
          style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.88 }]}
        >
          <Text style={styles.primaryBtnText}>Start uitleg</Text>
        </Pressable>
        <Pressable onPress={onSkip} hitSlop={10} style={({ pressed }) => pressed && { opacity: 0.6 }}>
          <Text style={styles.skipLink}>Overslaan</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

/* ---------------- Steps wrapper ---------------- */

function StepPage({
  page,
  onNext,
  onBack,
  onFinish,
}: {
  page: number;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  const isLast = page === 5;

  return (
    <Animated.View entering={FadeIn.duration(260)} style={styles.stepRoot}>
      <ProgressBar active={page - 1} />

      <View style={styles.stepHeader}>
        <Text style={styles.stepCounter}>Stap {page} van {TOTAL_STEPS}</Text>
        <Text style={styles.stepTitle}>{STEP_TITLES[page - 1]}</Text>
      </View>

      <View style={styles.stepBody}>
        {page === 1 && <Step1Body />}
        {page === 2 && <Step2Body />}
        {page === 3 && <Step3Body />}
        {page === 4 && <Step4Body />}
        {page === 5 && <Step5Body />}
      </View>

      {isLast ? (
        <View style={styles.lastNav}>
          <Pressable
            onPress={onFinish}
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.88 }]}
          >
            <Text style={styles.primaryBtnText}>Ik snap het</Text>
          </Pressable>
          <Pressable onPress={onBack} hitSlop={10} style={({ pressed }) => pressed && { opacity: 0.6 }}>
            <Text style={styles.terugLink}>terug</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.navRow}>
          <Pressable
            onPress={onBack}
            hitSlop={10}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
          >
            <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
            <Text style={styles.backText}>Vorige</Text>
          </Pressable>
          <Pressable
            onPress={onNext}
            style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.88 }]}
          >
            <Text style={styles.nextText}>Volgende</Text>
            <MaterialIcons name="arrow-forward" size={18} color={YELLOW_DARK_TEXT} />
          </Pressable>
        </View>
      )}
    </Animated.View>
  );
}

const STEP_TITLES = [
  'Voeg producten toe',
  'Controleer je winkelmandje',
  'Koop de producten',
  'Geef de spullen af bij de BuurtHub',
  'Scan en lever in',
];

function ProgressBar({ active }: { active: number }) {
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.progressSeg,
            { backgroundColor: i === active ? YELLOW : STEP_INACTIVE },
          ]}
        />
      ))}
    </View>
  );
}

/* ---------------- Step bodies ---------------- */

function ProductCard({ countTone, withPlus = false }: { countTone: 'red' | 'yellow'; withPlus?: boolean }) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productThumb}>
        <Text style={styles.productThumbBrand}>Unox</Text>
        <Text style={styles.productThumbName}>Tomaten{'\n'}soep</Text>
      </View>
      <View style={styles.productDivider} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Soep in blik</Text>
        <Text style={styles.productMeta}>Unox, 100 g</Text>
        <View
          style={[
            styles.countBadge,
            { backgroundColor: countTone === 'red' ? '#EF4444' : YELLOW },
          ]}
        >
          <Text style={styles.countBadgeText}>12/20</Text>
        </View>
      </View>
      {withPlus && (
        <View style={styles.plusBtn}>
          <MaterialIcons name="add" size={18} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

function CurvedArrow({ direction = 'up-right' }: { direction?: 'up-right' | 'up-left' }) {
  const path =
    direction === 'up-right'
      ? 'M 20 120 Q 40 60 130 20'
      : 'M 130 120 Q 110 60 20 20';
  const arrowHead =
    direction === 'up-right'
      ? 'M 130 20 L 118 22 M 130 20 L 124 32'
      : 'M 20 20 L 32 22 M 20 20 L 26 32';
  return (
    <View style={styles.arrowWrap}>
      <Svg width={150} height={140} viewBox="0 0 150 140">
        <Path
          d={path}
          stroke={YELLOW}
          strokeWidth={2}
          strokeDasharray="5,6"
          fill="none"
          strokeLinecap="round"
        />
        <Path d={arrowHead} stroke={YELLOW} strokeWidth={2} fill="none" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

function Step1Body() {
  return (
    <View style={styles.stepBodyInner}>
      <ProductCard countTone="red" withPlus />
      <CurvedArrow direction="up-right" />
      <Text style={styles.stepCaption}>
        Tik op het + -icoon om het aan je{'\n'}winkelmandje toe te voegen.
      </Text>
    </View>
  );
}

function Step2Body() {
  return (
    <View style={styles.stepBodyInner}>
      <ProductCard countTone="yellow" />
      <View style={styles.cartBubble}>
        <MaterialIcons name="shopping-cart" size={22} color="#FFFFFF" />
        <View style={styles.cartBubbleBadge}>
          <Text style={styles.cartBubbleBadgeText}>1</Text>
        </View>
      </View>
      <CurvedArrow direction="up-right" />
      <Text style={styles.stepCaption}>
        Open je winkelmandje en controleer{'\n'}hoeveel producten je gaat meenemen.
      </Text>
    </View>
  );
}

function Step3Body() {
  return (
    <View style={styles.stepBodyInner}>
      <Image
        source={require('../../public/vooradbeheer4.png')}
        style={styles.stepPhoto}
        resizeMode="cover"
      />
      <Text style={[styles.stepCaption, { marginTop: 18 }]}>
        Koop de producten in de winkel en{'\n'}ga daarna naar de BuurtHub om ze{'\n'}in te leveren.
      </Text>
      <View style={styles.tipBox}>
        <MaterialIcons name="lightbulb" size={16} color="#1BD15D" />
        <Text style={styles.tipBoldDark}>Tip:</Text>
        <Text style={styles.tipTextDark}>Hou de winkelmand erbij tijdens het winkelen</Text>
      </View>
    </View>
  );
}

function Step4Body() {
  return (
    <View style={styles.stepBodyInner}>
      <View style={styles.deliverBtnMock}>
        <MaterialCommunityIcons name="cart" size={20} color="#FFFFFF" />
        <Text style={styles.deliverBtnMockText}>Afgeven bij de BuurtHub</Text>
      </View>
      <CurvedArrow direction="up-right" />
      <Text style={styles.stepCaption}>
        Klik op de groene button bij jouw{'\n'}winkelmandje. Vervolgens krijg je de{'\n'}QR-code die kan gebruiken bij het{'\n'}inleveren van de producten.
      </Text>
    </View>
  );
}

function Step5Body() {
  return (
    <View style={styles.stepBodyInner}>
      <Image
        source={require('../../public/vooradbeheer5.png')}
        style={styles.stepPhotoTall}
        resizeMode="contain"
      />
      <View style={styles.numberList}>
        <Text style={styles.numberLine}>1. Scan de QR-code bij de BuurtHub</Text>
        <Text style={styles.numberLine}>2. Plaats de producten in de bak</Text>
        <Text style={styles.numberLine}>3. Je winkelmandje wordt voltooid</Text>
      </View>
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BG,
    zIndex: 100,
  },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },

  // Welcome
  welcomeRoot: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 600,
  },
  welcomeTop: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 48,
  },
  welcomeTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  welcomeTitleAccent: {
    color: YELLOW,
  },
  welcomeSubtitle: {
    marginTop: 16,
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.92,
    lineHeight: 20,
    paddingHorizontal: 14,
  },
  welcomeBottom: {
    alignItems: 'center',
    marginTop: 24,
  },
  primaryBtn: {
    backgroundColor: YELLOW,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: YELLOW_DARK_TEXT,
    letterSpacing: -0.2,
  },
  skipLink: {
    fontSize: 11,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },

  // Welcome / step images
  welcomeImage: {
    width: '100%',
    aspectRatio: 388 / 240,
    marginTop: 32,
  },
  stepIllustration: {
    width: '100%',
    aspectRatio: 364 / 296,
    marginBottom: 6,
  },
  stepPhoto: {
    width: '100%',
    aspectRatio: 320 / 262,
    borderRadius: 16,
  },
  stepPhotoTall: {
    width: '72%',
    alignSelf: 'center',
    aspectRatio: 795 / 927,
    borderRadius: 16,
  },

  // Basket
  basketWrap: {
    marginTop: 36,
    alignItems: 'center',
  },
  basketBox: {
    width: 220,
    alignItems: 'center',
  },
  basketItemsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginBottom: -14,
    zIndex: 1,
  },
  basketItem: {
    width: 38,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 6,
  },
  bottleNeck: {
    position: 'absolute',
    top: -14,
    width: 12,
    height: 16,
    backgroundColor: '#2F6E3F',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  basketItemLabel: {
    fontSize: 7,
    fontWeight: '800',
    color: '#0F172A',
    textTransform: 'lowercase',
  },
  basketBase: {
    width: 220,
    height: 96,
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 22,
    paddingHorizontal: 14,
  },
  basketBaseInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  basketShield: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basketTagline: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 16,
  },

  // Step shared
  stepRoot: {
    flex: 1,
    minHeight: 600,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  progressSeg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 18,
  },
  pinWrap: {
    alignItems: 'center',
    marginBottom: 6,
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: YELLOW,
    borderWidth: 3,
    borderColor: '#1F6BB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinLetter: {
    fontSize: 11,
    fontWeight: '900',
    color: YELLOW_DARK_TEXT,
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1F6BB3',
    marginTop: -3,
  },
  stepCounter: {
    fontSize: 12,
    fontWeight: '800',
    color: YELLOW,
    marginBottom: 6,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  stepBody: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 6,
  },
  stepBodyInner: {
    alignItems: 'center',
  },
  stepCaption: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 4,
  },

  // Product card
  productCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  productThumb: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#C92A1F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  productThumbBrand: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  productThumbName: {
    fontSize: 7,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  productDivider: {
    width: 1,
    height: 56,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  productInfo: {
    flex: 1,
    gap: 3,
  },
  productName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  productMeta: {
    fontSize: 10,
    color: '#6B7280',
  },
  countBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
  },
  countBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  plusBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  // Cart bubble (step 2)
  cartBubble: {
    position: 'absolute',
    right: -10,
    top: 56,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBubbleBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: YELLOW,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBubbleBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: YELLOW_DARK_TEXT,
  },

  // Arrow
  arrowWrap: {
    marginTop: -10,
    marginBottom: -6,
  },

  // Photo card (step 3)
  photoCard: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#2A4F44',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  photoCardText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    backgroundColor: '#F1FAEC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: 'stretch',
  },
  tipBoldDark: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },
  tipTextDark: {
    flex: 1,
    fontSize: 10,
    color: '#0F172A',
  },

  // Step 4 deliver button mock
  deliverBtnMock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1BD15D',
    paddingVertical: 16,
    borderRadius: 14,
    alignSelf: 'stretch',
  },
  deliverBtnMockText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },

  // Step 5
  qrPhotoCard: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#2A4F44',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  qrMock: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberList: {
    alignSelf: 'flex-start',
    gap: 4,
    marginTop: 4,
  },
  numberLine: {
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 24,
  },

  // Nav row (steps 1–4)
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    minHeight: 60,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingRight: 12,
  },
  backText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: YELLOW,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextText: {
    fontSize: 11,
    fontWeight: '800',
    color: YELLOW_DARK_TEXT,
    letterSpacing: -0.2,
  },

  // Last step nav
  lastNav: {
    alignItems: 'center',
    paddingTop: 18,
  },
  terugLink: {
    fontSize: 11,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});
