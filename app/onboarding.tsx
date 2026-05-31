import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AGE_CATEGORIES, AgeSelectModal, type AgeCategory } from '@/components/onboarding/age-select-modal';
import { FormField } from '@/components/onboarding/form-field';
import { OnboardingChrome } from '@/components/onboarding/onboarding-chrome';
import { PasswordField } from '@/components/onboarding/password-field';
import { PillToggle } from '@/components/onboarding/pill-toggle';
import { YesNoButtons } from '@/components/onboarding/yes-no-buttons';

const TOTAL_STEPS = 8;

type YesNo = 'ja' | 'nee' | null;

type Bewoner = {
  id: string;
  category: AgeCategory;
};

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  street: string;
  postcode: string;
  city: string;
  bewoners: Bewoner[];
  meds: YesNo;
  health: YesNo;
  healthHelp: string[];
  support: YesNo;
  wantBuddy: YesNo;
  helpWith: string[];
};

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirm: '',
  street: '',
  postcode: '',
  city: '',
  bewoners: [{ id: 'init-1', category: 'volwassene' }],
  meds: null,
  health: null,
  healthHelp: [],
  support: null,
  wantBuddy: null,
  helpWith: [],
};

function categoryLabel(key: AgeCategory) {
  return AGE_CATEGORIES.find((c) => c.key === key)?.label ?? '';
}
function categoryRange(key: AgeCategory) {
  return AGE_CATEGORIES.find((c) => c.key === key)?.range ?? '';
}

type Page =
  | { type: 'profile-form'; step: number }
  | { type: 'password-form'; step: number }
  | { type: 'address-form'; step: number }
  | { type: 'map'; step: number }
  | { type: 'household'; step: number }
  | { type: 'yesno'; step: number; key: 'meds' | 'health' | 'support' | 'wantBuddy'; title: string; question: string; showIf?: (d: FormData) => boolean }
  | { type: 'pills'; step: number; key: 'healthHelp' | 'helpWith'; title: string; question: string; options: string[]; showIf?: (d: FormData) => boolean }
  | { type: 'done' };

const PAGES: Page[] = [
  { type: 'profile-form', step: 0 },
  { type: 'password-form', step: 1 },
  { type: 'address-form', step: 2 },
  { type: 'map', step: 3 },
  { type: 'household', step: 4 },
  {
    type: 'yesno',
    step: 5,
    key: 'meds',
    title: 'Extra benodigheden',
    question: 'Gebruikt u medische middelen die te allen tijde gekoeld moet blijven?',
  },
  {
    type: 'yesno',
    step: 6,
    key: 'health',
    title: 'Gezondheid',
    question: 'Is er iets belangrijks rondom uw gezondheid of veiligheid waarvan je wilt dat wij op de hoogte zijn?',
  },
  {
    type: 'pills',
    step: 6,
    key: 'healthHelp',
    title: 'Gezondheid',
    question: 'Ik heb hulp nodig bij:',
    options: ['Gezelschap', 'Boodschappen', 'Mobiliteit', 'Medische ondersteuning', 'Anders'],
    showIf: (d) => d.health === 'ja',
  },
  {
    type: 'yesno',
    step: 7,
    key: 'support',
    title: 'Buddy systeem',
    question: 'Ben je in staat om kwetsbare buren te ondersteunen?',
  },
  {
    type: 'yesno',
    step: 7,
    key: 'wantBuddy',
    title: 'Buddy systeem',
    question: 'Wil gekoppeld worden aan een buddy?',
    showIf: (d) => d.support === 'ja',
  },
  {
    type: 'pills',
    step: 7,
    key: 'helpWith',
    title: 'Buddy systeem',
    question: 'Ik kan helpen bij:',
    options: [
      'Zorg / ondersteuning',
      'Klussen / reparaties',
      'Boodschappen',
      'Mobiliteit',
      'Gezelschap',
      'EHBO / BHV',
      'Vertalen / talen',
    ],
    showIf: (d) => d.support === 'ja',
  },
  { type: 'done' },
];

function findNext(idx: number, data: FormData): number {
  let next = idx + 1;
  while (next < PAGES.length) {
    const p = PAGES[next];
    if ('showIf' in p && p.showIf && !p.showIf(data)) {
      next++;
    } else {
      return next;
    }
  }
  return PAGES.length - 1;
}

function findPrev(idx: number, data: FormData): number {
  let prev = idx - 1;
  while (prev >= 0) {
    const p = PAGES[prev];
    if ('showIf' in p && p.showIf && !p.showIf(data)) {
      prev--;
    } else {
      return prev;
    }
  }
  return 0;
}

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [ageModalFor, setAgeModalFor] = useState<string | 'new' | null>(null);

  const page = PAGES[pageIndex];

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const addBewoner = (category: AgeCategory) => {
    setData((prev) => ({
      ...prev,
      bewoners: [...prev.bewoners, { id: `b-${Date.now()}`, category }],
    }));
  };

  const updateBewoner = (id: string, category: AgeCategory) => {
    setData((prev) => ({
      ...prev,
      bewoners: prev.bewoners.map((b) => (b.id === id ? { ...b, category } : b)),
    }));
  };

  const togglePill = (key: 'healthHelp' | 'helpWith') => (option: string) =>
    setData((prev) => {
      const current = prev[key];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [key]: next };
    });

  const goNext = () => setPageIndex((i) => findNext(i, data));
  const goPrev = () => setPageIndex((i) => findPrev(i, data));
  const canGoBack = pageIndex > 0;

  const handleYesNo = (key: 'meds' | 'health' | 'support' | 'wantBuddy') => (value: 'ja' | 'nee') => {
    setData((prev) => {
      const updated = { ...prev, [key]: value };
      setPageIndex((i) => findNext(i, updated));
      return updated;
    });
  };

  if (page.type === 'done') {
    return (
      <View style={styles.doneRoot}>
        <View style={[styles.doneContent, { paddingTop: insets.top }]}>
          <Text style={styles.doneTitle}>U bent klaar voor gebruik</Text>
        </View>

        <View style={[styles.doneFooter, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.doneNavRow}>
            <Pressable
              onPress={goPrev}
              hitSlop={10}
              style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
            >
              <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
              <Text style={styles.backText}>Vorige</Text>
            </Pressable>

            <Pressable
              onPress={() => router.replace('/(tabs)')}
              style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.88 }]}
            >
              <Text style={styles.saveText}>Opslaan</Text>
            </Pressable>
          </View>

          <View style={styles.doneFooterLink}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoText}>i</Text>
            </View>
            <Text style={styles.footerLink}>Waarvoor gebruiken wij jouw gegevens?</Text>
          </View>
        </View>
      </View>
    );
  }

  const isFirstStep = pageIndex === 0;

  switch (page.type) {
    case 'profile-form':
      return (
        <OnboardingChrome
          totalSteps={TOTAL_STEPS}
          activeStepIndex={page.step}
          title="Profiel instellen"
          onBack={canGoBack ? goPrev : undefined}
          onNext={goNext}
        >
          <View style={styles.photoWrap}>
            <View style={styles.photoCircle}>
              <Image
                source={require('../public/gavin.png')}
                style={styles.photoImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={16} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.fieldsCol}>
            <FormField
              label="Voornaam"
              required
              value={data.firstName}
              onChangeText={(t) => update('firstName', t)}
              placeholder="Gavin"
            />
            <FormField
              label="Achternaam"
              required
              value={data.lastName}
              onChangeText={(t) => update('lastName', t)}
              placeholder="van den Berg"
            />

            <FormField
              label="Telefoonnummer"
              required
              value={data.phone}
              onChangeText={(t) => update('phone', t)}
              keyboardType="phone-pad"
              placeholder="06 123456789"
            />
            <FormField
              label="E-mail"
              value={data.email}
              onChangeText={(t) => update('email', t)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="naam@example.com"
            />
          </View>
        </OnboardingChrome>
      );

    case 'password-form':
      return (
        <OnboardingChrome
          totalSteps={TOTAL_STEPS}
          activeStepIndex={page.step}
          title="Wachtwoord instellen"
          subtitle="Stel een wachtwoord in"
          onBack={canGoBack ? goPrev : undefined}
          onNext={goNext}
        >
          <View style={styles.fieldsCol}>
            <PasswordField
              label="Wachtwoord"
              required
              value={data.password}
              onChangeText={(t) => update('password', t)}
              placeholder="••••••••••••"
            />
            <PasswordField
              label="Wachtwoord bevestigen"
              required
              value={data.passwordConfirm}
              onChangeText={(t) => update('passwordConfirm', t)}
              placeholder="••••••••••••"
            />
          </View>
        </OnboardingChrome>
      );

    case 'address-form':
      return (
        <OnboardingChrome
          totalSteps={TOTAL_STEPS}
          activeStepIndex={page.step}
          title="Adresgegevens"
          subtitle="Vul je adresgegevens in"
          onBack={canGoBack ? goPrev : undefined}
          onNext={goNext}
        >
          <View style={styles.fieldsCol}>
            <FormField
              label="Straat + huisnummer"
              required
              value={data.street}
              onChangeText={(t) => update('street', t)}
              placeholder="Waterleliekade 5"
            />
            <FormField
              label="Postcode"
              required
              value={data.postcode}
              onChangeText={(t) => update('postcode', t)}
              placeholder="1234 AB"
              autoCapitalize="characters"
            />
            <FormField
              label="Plaats"
              value={data.city}
              onChangeText={(t) => update('city', t)}
              placeholder="Den Haag"
            />
          </View>
        </OnboardingChrome>
      );

    case 'map':
      return (
        <OnboardingChrome
          totalSteps={TOTAL_STEPS}
          activeStepIndex={page.step}
          title="BuurtHub locatie"
          subtitle="Hier staat jouw BuurtHub:"
          onBack={canGoBack ? goPrev : undefined}
          onNext={goNext}
        >
          <View style={styles.mapWrap}>
            <View style={styles.mapCard}>
              <Image
                source={require('../public/map.png')}
                style={styles.mapImage}
                resizeMode="cover"
              />
            </View>

            {/* User location */}
            <View style={styles.userDot} />

            {/* BuurtHub destination pin */}
            <MaterialIcons
              name="place"
              size={36}
              color="#16A34A"
              style={styles.mapPin}
            />

            <View style={styles.mapWrongPill}>
              <MaterialIcons name="error-outline" size={14} color="#0F172A" />
              <Text style={styles.mapWrongText}>Deze locatie klopt niet</Text>
            </View>
            <View style={styles.walkingPill}>
              <MaterialIcons name="directions-walk" size={16} color="#0F172A" />
              <Text style={styles.walkingText}>5 minuten lopen</Text>
            </View>
          </View>
        </OnboardingChrome>
      );

    case 'household':
      return (
        <OnboardingChrome
          totalSteps={TOTAL_STEPS}
          activeStepIndex={page.step}
          title="Instellen huishouden"
          onBack={canGoBack ? goPrev : undefined}
          onNext={goNext}
        >
          <View style={styles.householdBlock}>
            <Text style={styles.question}>Uit hoeveel mensen bestaat jouw huishouden?</Text>

            <View style={styles.bewonersList}>
              {data.bewoners.map((b, i) => (
                <Pressable
                  key={b.id}
                  onPress={() => setAgeModalFor(b.id)}
                  style={({ pressed }) => [styles.bewonerRow, pressed && { opacity: 0.85 }]}
                >
                  <Text style={styles.bewonerText}>
                    {i + 1}. {categoryLabel(b.category)} ({categoryRange(b.category)})
                  </Text>
                  <MaterialIcons name="edit" size={18} color="#6B6357" />
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={() => setAgeModalFor('new')}
              hitSlop={8}
              style={({ pressed }) => [styles.addBewonerBtn, pressed && { opacity: 0.7 }]}
            >
              <MaterialIcons name="add" size={18} color="#FFFFFF" />
              <Text style={styles.addBewonerText}>Bewoner toevoegen</Text>
            </Pressable>
          </View>

          <AgeSelectModal
            visible={ageModalFor !== null}
            onClose={() => setAgeModalFor(null)}
            onSelect={(cat) => {
              if (ageModalFor === 'new') {
                addBewoner(cat);
              } else if (ageModalFor) {
                updateBewoner(ageModalFor, cat);
              }
            }}
          />
        </OnboardingChrome>
      );

    case 'yesno':
      return (
        <OnboardingChrome
          totalSteps={TOTAL_STEPS}
          activeStepIndex={page.step}
          title={page.title}
          onBack={canGoBack ? goPrev : undefined}
        >
          <View style={styles.centeredBlock}>
            <Text style={styles.question}>{page.question}</Text>
            <YesNoButtons value={data[page.key] as YesNo} onChange={handleYesNo(page.key)} />
          </View>
        </OnboardingChrome>
      );

    case 'pills':
      return (
        <OnboardingChrome
          totalSteps={TOTAL_STEPS}
          activeStepIndex={page.step}
          title={page.title}
          onBack={canGoBack ? goPrev : undefined}
          onNext={goNext}
        >
          <View style={styles.centeredBlock}>
            <Text style={styles.question}>{page.question}</Text>
            <PillToggle
              options={page.options}
              selected={data[page.key]}
              onToggle={togglePill(page.key)}
            />
          </View>
        </OnboardingChrome>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  photoWrap: {
    alignSelf: 'center',
    marginBottom: 22,
  },
  photoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoImage: {
    width: 140,
    height: 140,
  },
  editBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#14342B',
  },
  fieldsCol: {
    gap: 10,
  },
  illustrationWrap: {
    marginBottom: 22,
    paddingHorizontal: 8,
  },
  mapWrap: {
    position: 'relative',
  },
  mapCard: {
    width: '100%',
    height: 340,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPin: {
    position: 'absolute',
    left: '57%',
    top: '30%',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userDot: {
    position: 'absolute',
    left: '43%',
    top: '57%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  walkingPill: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  walkingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  mapWrongPill: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  mapWrongText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0F172A',
  },
  centeredBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    paddingHorizontal: 8,
    minHeight: 320,
  },
  householdBlock: {
    paddingHorizontal: 4,
  },
  bewonersList: {
    gap: 10,
    marginTop: 22,
  },
  bewonerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0EDE0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  bewonerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  addBewonerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    marginTop: 6,
  },
  addBewonerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  question: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  // Done screen
  doneRoot: {
    flex: 1,
    backgroundColor: '#14342B',
  },
  doneContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  doneFooter: {
    paddingHorizontal: 20,
  },
  doneNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  saveBtn: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  saveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  doneFooterLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
  },
  infoIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 13,
  },
  footerLink: {
    fontSize: 10,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});
