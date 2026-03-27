import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, User, MapPin, CreditCard, Bell, Moon, Globe, HelpCircle, Headphones, Shield, ChevronRight } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';
import { useAppStore } from '../../store/useAppStore';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAppStore();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.textPrimary} size={24} strokeWidth={2.5} />
        </TouchableOpacity>
        <Typography variant="h2" bold style={styles.headerTitle}>Profile & Settings</Typography>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Typography color={COLORS.textSecondary} style={styles.searchText}>Search in settings</Typography>
                <View style={[styles.menuIconContainer, { backgroundColor: COLORS.primary }]}>
                    <User color={COLORS.white} size={16} />
                </View>
            </View>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarRing}>
                <Image 
                    source={{ uri: 'https://i.pravatar.cc/150?u=alex' }} 
                    style={styles.avatar}
                />
            </View>
            <View style={styles.verifiedBadge}>
              <Check color={COLORS.white} size={12} strokeWidth={4} />
            </View>
          </View>
          
          <View style={styles.userNameContainer}>
            <Typography variant="h1" bold style={styles.userName}>{user?.name || 'Airpax Rider'}</Typography>
            <View style={styles.premiumIndicator}>
                <Typography variant="caption" bold color={COLORS.white}>Elite Member</Typography>
            </View>
          </View>
          
          <Typography variant="body" color={COLORS.textSecondary} style={styles.userHandle}>
            {user?.phone || '+91 00000 00000'} • {user?.email || 'rider@airpax.io'}
          </Typography>
        </View>

        <View style={styles.menuContainer}>
            <MenuGroup title="ACCOUNT SETTINGS">
              <MenuItem Icon={User} label="Personal Information" sublabel="Update name and phone" />
              <MenuItem Icon={MapPin} label="Saved Locations" sublabel="Home, Work and other points" />
              <MenuItem Icon={CreditCard} label="Payment Methods" sublabel={`Balance: ₹${user?.walletBalance || 0}`} onPress={() => navigation.navigate('Wallet')} />
            </MenuGroup>

            <MenuGroup title="PREFERENCES">
              <MenuItem Icon={Bell} label="Push Notifications" hasSwitch value={true} />
              <MenuItem Icon={Moon} label="Cinematic Dark Mode" hasSwitch value={false} />
              <MenuItem Icon={Globe} label="App Language" rightText="English (US)" />
            </MenuGroup>

            <MenuGroup title="SUPPORT & SAFETY">
              <MenuItem Icon={HelpCircle} label="Help & Documentation" />
              <MenuItem Icon={Headphones} label="Contact VIP Support" />
              <MenuItem Icon={Shield} label="Privacy & Safety" />
            </MenuGroup>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Typography bold color={COLORS.danger} style={styles.logoutText}>SIGN OUT</Typography>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.versionText}>
            AIRPAX PREMIUM EDITION • V1.2.0
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.menuGroup}>
    <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.groupTitle}>
      {title}
    </Typography>
    <View style={styles.menuCard}>{children}</View>
  </View>
);

const MenuItem = ({ 
  Icon, 
  label, 
  sublabel,
  rightText, 
  hasSwitch, 
  value,
  onPress 
}: { 
  Icon: any; 
  label: string; 
  sublabel?: string;
  rightText?: string; 
  hasSwitch?: boolean; 
  value?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.6} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIconContainer}>
        <Icon color={COLORS.white} size={18} strokeWidth={2} />
      </View>
      <View>
        <Typography variant="body" bold style={styles.menuItemLabel}>{label}</Typography>
        {sublabel && (
            <Typography variant="caption" color={COLORS.textSecondary}>{sublabel}</Typography>
        )}
      </View>
    </View>
    <View style={styles.menuItemRight}>
      {rightText && (
        <Typography variant="caption" color={COLORS.textSecondary} style={styles.rightText}>{rightText}</Typography>
      )}
      {hasSwitch ? (
        <Switch 
          value={value} 
          trackColor={{ false: COLORS.border, true: COLORS.accent }} 
          thumbColor={COLORS.white}
          ios_backgroundColor={COLORS.border}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      ) : (
        <ChevronRight color={COLORS.textSecondary} size={18} />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  headerTitle: {
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    paddingBottom: 40,
  },
  searchContainer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: RADII.round,
    ...SHADOWS.light,
  },
  searchText: {
    fontSize: 16,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  avatarWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  avatarRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    ...SHADOWS.heavy,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: COLORS.accent,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
    ...SHADOWS.light,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  userName: {
    fontSize: 26,
    color: COLORS.textPrimary,
  },
  premiumIndicator: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADII.round,
  },
  userHandle: {
    fontSize: 14,
    opacity: 0.6,
  },
  menuContainer: {
    paddingHorizontal: SPACING.xl,
  },
  menuGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    marginBottom: 16,
    letterSpacing: 1.5,
    fontSize: 11,
    opacity: 0.5,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADII.large,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightText: {
    fontSize: 13,
  },
  logoutButton: {
    marginHorizontal: SPACING.xl,
    height: 64,
    borderRadius: RADII.large,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(239, 68, 68, 0.1)',
    ...SHADOWS.medium,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 48,
    opacity: 0.4,
  },
  versionText: {
    fontSize: 10,
    letterSpacing: 1,
  },
});
