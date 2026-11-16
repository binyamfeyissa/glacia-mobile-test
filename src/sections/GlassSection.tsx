import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import {
  Glass,
  GlassContainer,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  TabBar,
  FAB,
  Button,
  Sheet,
  Text,
  isGlassSupported,
  colors,
} from 'glacia-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentBox } from '../components/ComponentBox';
import { useApp } from '../context/AppContext';

export function GlassSection() {
  const { isDark, dataset, addToast } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  const [glassSheetOpen, setGlassSheetOpen] = useState<boolean>(false);
  const [glassTabBarId, setGlassTabBarId] = useState<string>('g1');
  const [mergeTabBarId, setMergeTabBarId] = useState<string>('m2');

  return (
    <ImageBackground
      source={require('../../assets/glass-bg.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.glassHeaderBox}>
          <Text variant="title" style={[styles.sectionTitle, { color: '#ffffff' }]}>
            Liquid Glass Showcase
          </Text>
          <Text variant="body" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 8 }}>
            Real iOS 26 UIGlassEffect vs Glacia fallback. Look for edge refraction, specular highlights, and chromatic bending over this colorful graphic background.
          </Text>

          {/* isGlassSupported Sanity Check Callout */}
          <Glass effect="clear" style={styles.sanityBadge}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons
                name={isGlassSupported ? 'checkmark-circle' : 'information-circle'}
                size={24}
                color={isGlassSupported ? '#34C759' : '#FF9500'}
              />
              <View style={{ flex: 1 }}>
                <Text variant="body" style={{ fontWeight: '800', color: '#ffffff' }}>
                  isGlassSupported: {String(isGlassSupported)}
                </Text>
                <Text variant="caption" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {isGlassSupported
                    ? '🍏 Real Apple Liquid Glass (UIGlassEffect active via @callstack/liquid-glass).'
                    : '🤖 Glacia Translucent Tint Fallback active (Android, Expo Go, or iOS < 26).'}
                </Text>
              </View>
            </View>
          </Glass>
        </View>

        {/* 1. Glass: Regular vs Clear Effects */}
        <ComponentBox
          name="Glass (Regular & Clear Effects)"
          description="Notice how regular diffuses the high-frequency laser stripes while clear creates intense specular refraction."
          style={styles.componentBoxGlass}
        >
          <View style={styles.rowWrap}>
            <Glass effect="regular" style={styles.glassTile}>
              <Ionicons name="water-outline" size={24} color="#ffffff" />
              <Text variant="heading" style={{ color: '#ffffff', marginTop: 6 }}>
                effect="regular"
              </Text>
              <Text variant="caption" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Ambient Blur & Edge Highlight
              </Text>
            </Glass>

            <Glass effect="clear" style={styles.glassTile}>
              <Ionicons name="sparkles-outline" size={24} color="#ffffff" />
              <Text variant="heading" style={{ color: '#ffffff', marginTop: 6 }}>
                effect="clear"
              </Text>
              <Text variant="caption" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Ultra Translucent & High Specular
              </Text>
            </Glass>
          </View>
        </ComponentBox>

        {/* 2. Card on Glass */}
        <ComponentBox
          name="Card (Over Busy Photo Background)"
          description="Card material refracts the saturated neon circles and sharp diagonal lines beneath it."
          style={styles.componentBoxGlass}
        >
          <Card effect="regular" style={styles.glassCard}>
            <CardHeader>
              <View style={styles.rowBetween}>
                <CardTitle style={{ color: '#ffffff' }}>{dataset.boardingPass.flight}</CardTitle>
                <Text variant="caption" style={{ color: '#64D2FF', fontWeight: '800' }}>
                  {dataset.boardingPass.classType}
                </Text>
              </View>
              <CardDescription style={{ color: 'rgba(255,255,255,0.75)' }}>
                {dataset.boardingPass.from} ➔ {dataset.boardingPass.to}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="body" style={{ color: '#ffffff', marginVertical: 6 }}>
                Passenger: {dataset.boardingPass.passenger} · Seat: {dataset.boardingPass.seat}
              </Text>
            </CardContent>
            <CardFooter>
              <View style={styles.rowBetween}>
                <Text variant="caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Refracting busy backdrop
                </Text>
                <Button
                  size="sm"
                  variant="filled"
                  accessibilityLabel="Check In"
                  onPress={() => addToast('Card Action: Check-in confirmed', 'success')}
                >
                  Verify Refraction
                </Button>
              </View>
            </CardFooter>
          </Card>
        </ComponentBox>

        {/* 3. TabBar on Glass */}
        <ComponentBox
          name="TabBar (Standalone over Photo)"
          description="TabBar floating over multi-color background with sliding active item wash."
          style={styles.componentBoxGlass}
        >
          <TabBar
            items={[
              { id: 'g1', label: 'Refract', icon: <Ionicons name="water" size={16} color="#ffffff" /> },
              { id: 'g2', label: 'Specular', icon: <Ionicons name="sparkles" size={16} color="#ffffff" /> },
              { id: 'g3', label: 'Chromatic', icon: <Ionicons name="color-palette" size={16} color="#ffffff" /> },
            ]}
            activeId={glassTabBarId}
            onTabChange={(id) => {
              setGlassTabBarId(id);
              addToast(`Glass TabBar changed: ${id}`, 'neutral');
            }}
          />
        </ComponentBox>

        {/* 4. FAB on Glass */}
        <ComponentBox
          name="FAB (Floating Action Button over Photo)"
          description="Interactive circular glass sphere with real-time pressure response."
          style={styles.componentBoxGlass}
        >
          <View style={styles.rowWrap}>
            <FAB
              accessibilityLabel="Add item on glass"
              icon={<Ionicons name="add" size={26} color="#ffffff" />}
              onPress={() => addToast('Glass FAB pressed', 'info')}
            />
            <FAB
              accessibilityLabel="Extended Glass FAB"
              label="Liquid Action"
              icon={<Ionicons name="flash-outline" size={18} color="#ffffff" />}
              onPress={() => addToast('Extended Glass FAB pressed', 'success')}
            />
          </View>
        </ComponentBox>

        {/* 5. Sheet opened from a Button */}
        <ComponentBox
          name="Sheet (Opened from a Button)"
          description="Full-width liquid glass bottom sheet sliding over the colorful background."
          style={styles.componentBoxGlass}
        >
          <Button
            variant="glass"
            size="md"
            accessibilityLabel="Open Sheet on Glass"
            icon={<Ionicons name="layers-outline" size={18} color="#ffffff" />}
            onPress={() => setGlassSheetOpen(true)}
          >
            Open Liquid Glass Sheet
          </Button>

          <Sheet
            open={glassSheetOpen}
            onOpenChange={setGlassSheetOpen}
            title="Liquid Glass Sheet Overlay"
            showHandle
            snapPoints={[340, 560]}
            footer={
              <Button
                variant="filled"
                size="sm"
                accessibilityLabel="Close glass sheet"
                onPress={() => setGlassSheetOpen(false)}
              >
                Dismiss Sheet
              </Button>
            }
          >
            <View style={{ paddingVertical: 14, gap: 10 }}>
              <Text variant="body" style={{ fontWeight: '700' }}>
                Refracting Sheet Panel on iOS 26
              </Text>
              <Text variant="caption" muted>
                Notice how the scrim dims the background while the sheet panel itself refracts the colorful background underneath it.
              </Text>
              <View style={{ padding: 12, backgroundColor: 'rgba(0,122,255,0.1)', borderRadius: 10 }}>
                <Text variant="caption" style={{ color: '#007AFF', fontWeight: '600' }}>
                  Platform status: isGlassSupported = {String(isGlassSupported)}
                </Text>
              </View>
            </View>
          </Sheet>
        </ComponentBox>

        {/* 6. The GlassContainer Demo (Merging Surfaces) */}
        <ComponentBox
          name="The GlassContainer Demo (Merging Surfaces)"
          description="TabBar and FAB placed inside one GlassContainer with spacing=0. On iOS 26, watch the two glass surfaces merge into one continuous liquid membrane where they meet!"
          style={styles.componentBoxGlass}
        >
          <View style={styles.mergeDemoWrapper}>
            <Text variant="caption" style={{ color: '#ffffff', marginBottom: 12, fontWeight: '600' }}>
              iOS 26 Liquid Glass Merging Test Zone:
            </Text>

            <GlassContainer spacing={0} style={styles.glassContainerInner}>
              {/* TabBar */}
              <TabBar
                items={[
                  { id: 'm1', label: 'Merge A', icon: <Ionicons name="git-branch" size={16} color="#ffffff" /> },
                  { id: 'm2', label: 'Merge B', icon: <Ionicons name="git-merge" size={16} color="#ffffff" /> },
                  { id: 'm3', label: 'Merge C', icon: <Ionicons name="git-commit" size={16} color="#ffffff" /> },
                ]}
                activeId={mergeTabBarId}
                onTabChange={setMergeTabBarId}
                style={{ width: '100%' }}
              />

              {/* Floating FAB positioned touching the TabBar */}
              <View style={styles.touchingFabWrap}>
                <FAB
                  accessibilityLabel="Merging FAB"
                  icon={<Ionicons name="water" size={26} color="#ffffff" />}
                  onPress={() => addToast('Merged FAB pressed!', 'info')}
                />
              </View>
            </GlassContainer>

            <Text variant="caption" style={{ color: 'rgba(255,255,255,0.7)', marginTop: 12, textAlign: 'center' }}>
              On iOS 26, the specular highlight around the FAB flows seamlessly into the TabBar edge.
              On Android, they maintain identical positions without shifting.
            </Text>
          </View>
        </ComponentBox>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 130,
  },
  glassHeaderBox: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  sanityBadge: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 4,
  },
  componentBoxGlass: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  glassTile: {
    flex: 1,
    minWidth: 130,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassCard: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  mergeDemoWrapper: {
    width: '100%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  glassContainerInner: {
    width: '100%',
    alignItems: 'center',
  },
  touchingFabWrap: {
    marginTop: -8, // Touching the TabBar edge to trigger liquid merging on iOS 26
    alignItems: 'center',
  },
});
