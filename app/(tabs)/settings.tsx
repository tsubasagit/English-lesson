import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../src/constants/colors';
import { Card } from '../../src/components/ui/Card';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
}

function SettingItem({ icon, label, value, onPress }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <Ionicons name={icon} size={22} color={Colors.textSecondary} />
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {onPress && (
          <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile */}
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={Colors.textOnPrimary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Guest User</Text>
            <Text style={styles.profileEmail}>Sign in to save progress</Text>
          </View>
        </Card>

        {/* Practice Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice</Text>
          <Card padding={0}>
            <SettingItem
              icon="flag-outline"
              label="Daily Goal"
              value="3 sessions"
              onPress={() => Alert.alert('Coming soon')}
            />
            <View style={styles.separator} />
            <SettingItem
              icon="notifications-outline"
              label="Reminders"
              value="Off"
              onPress={() => Alert.alert('Coming soon')}
            />
          </Card>
        </View>

        {/* Community */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community</Text>
          <Card padding={0}>
            <SettingItem
              icon="people-outline"
              label="OSH English Community"
              onPress={() => Alert.alert('Coming soon', 'Circle.so link will be here')}
            />
          </Card>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Card padding={0}>
            <SettingItem icon="information-circle-outline" label="Version" value="1.0.0" />
            <View style={styles.separator} />
            <SettingItem
              icon="document-text-outline"
              label="Terms of Service"
              onPress={() => {}}
            />
            <View style={styles.separator} />
            <SettingItem
              icon="shield-checkmark-outline"
              label="Privacy Policy"
              onPress={() => {}}
            />
          </Card>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => Alert.alert('Sign Out', 'Sign in first to use this feature.')}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  profileEmail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: Spacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  settingLabel: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  settingValue: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginLeft: Spacing.xxl + Spacing.sm,
  },
  signOutButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  signOutText: {
    fontSize: FontSize.md,
    color: Colors.error,
    fontWeight: '600',
  },
});
