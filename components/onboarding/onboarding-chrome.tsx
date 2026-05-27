import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressDots } from './progress-dots';

interface OnboardingChromeProps {
  totalSteps: number;
  activeStepIndex: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showProgress?: boolean;
}

export function OnboardingChrome({
  totalSteps,
  activeStepIndex,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = 'Volgende',
  showProgress = true,
}: OnboardingChromeProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 16 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {showProgress && (
            <View style={styles.progressWrap}>
              <ProgressDots total={totalSteps} activeIndex={activeStepIndex} />
            </View>
          )}

          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

          <View style={styles.body}>{children}</View>

          <View style={styles.navRow}>
            <View style={styles.navSide}>
              {onBack && (
                <Pressable
                  onPress={onBack}
                  hitSlop={10}
                  style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
                >
                  <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
                  <Text style={styles.backText}>Vorige</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.navSide}>
              {onNext && (
                <Pressable
                  onPress={onNext}
                  style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.88 }]}
                >
                  <Text style={styles.nextText}>{nextLabel}</Text>
                  <MaterialIcons name="arrow-forward" size={18} color="#0F172A" />
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoText}>i</Text>
            </View>
            <Text style={styles.footerLink}>Waarvoor gebruiken wij jouw gegevens?</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#14342B',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  progressWrap: {
    paddingHorizontal: 4,
    marginBottom: 18,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.95,
  },
  body: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 20,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    minHeight: 60,
  },
  navSide: {
    minHeight: 48,
    justifyContent: 'center',
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
    backgroundColor: '#F5C842',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  footer: {
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
