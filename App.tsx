import React, { useState } from 'react';
import { StyleSheet, View, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  AppBar,
  TabBar,
  Button,
  Text,
  colors,
} from 'glacia-native';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider, useApp } from './src/context/AppContext';
import { CoreSection } from './src/sections/CoreSection';
import { FormsSection } from './src/sections/FormsSection';
import { DisplaySection } from './src/sections/DisplaySection';
import { OverlaysSection } from './src/sections/OverlaysSection';
import { AIChatSection } from './src/sections/AIChatSection';
import { ChartsSection } from './src/sections/ChartsSection';
import { GlassSection } from './src/sections/GlassSection';

type SectionId = 'core' | 'forms' | 'display' | 'overlays' | 'ai' | 'charts' | 'glass';

function MainApp() {
  const insets = useSafeAreaInsets();
  const { isDark, toggleDark, dataVersion, toggleData, dataset } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  const [activeSection, setActiveSection] = useState<SectionId>('core');

  const renderSection = () => {
    switch (activeSection) {
      case 'core':
        return <CoreSection />;
      case 'forms':
        return <FormsSection />;
      case 'display':
        return <DisplaySection />;
      case 'overlays':
        return <OverlaysSection />;
      case 'ai':
        return <AIChatSection />;
      case 'charts':
        return <ChartsSection />;
      case 'glass':
        return <GlassSection />;
      default:
        return <CoreSection />;
    }
  };

  const navItems = [
    {
      id: 'core',
      label: 'Core',
      icon: <Ionicons name="cube-outline" size={16} color={activeSection === 'core' ? theme.fill : theme.muted} />,
    },
    {
      id: 'forms',
      label: 'Forms',
      icon: <Ionicons name="create-outline" size={16} color={activeSection === 'forms' ? theme.fill : theme.muted} />,
    },
    {
      id: 'display',
      label: 'Display',
      icon: <Ionicons name="list-outline" size={16} color={activeSection === 'display' ? theme.fill : theme.muted} />,
    },
    {
      id: 'overlays',
      label: 'Overlays',
      icon: <Ionicons name="albums-outline" size={16} color={activeSection === 'overlays' ? theme.fill : theme.muted} />,
    },
    {
      id: 'ai',
      label: 'AI/Chat',
      icon: <Ionicons name="chatbubbles-outline" size={16} color={activeSection === 'ai' ? theme.fill : theme.muted} />,
    },
    {
      id: 'charts',
      label: 'Charts',
      icon: <Ionicons name="stats-chart-outline" size={16} color={activeSection === 'charts' ? theme.fill : theme.muted} />,
    },
    {
      id: 'glass',
      label: 'Glass',
      icon: <Ionicons name="water-outline" size={16} color={activeSection === 'glass' ? '#64D2FF' : theme.muted} />,
    },
  ];

  return (
    <View style={[styles.rootContainer, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Top Application Header (AppBar from glacia-native) */}
      <AppBar
        title="Glacia Native Test"
        subtitle={`v0.5.1 · ${dataset.name.split(' ')[1]}`}
        topInset={insets.top}
        scrolled
        leading={{
          accessibilityLabel: 'Brand Logo',
          icon: <Ionicons name="sparkles" size={20} color="#007AFF" />,
          onPress: toggleData,
        }}
        actions={[
          {
            accessibilityLabel: 'Toggle Data',
            icon: <Ionicons name="swap-horizontal" size={22} color={theme.fill} />,
            onPress: toggleData,
          },
          {
            accessibilityLabel: 'Toggle Dark Mode',
            icon: <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color={theme.fill} />,
            onPress: toggleDark,
          },
        ]}
      />

      {/* Persistent Global Controls Banner visible across every section */}
      <View
        style={[
          styles.globalControlBar,
          {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          },
        ]}
      >
        <Button
          variant="filled"
          size="sm"
          accessibilityLabel="Swap Global Dataset"
          icon={<Ionicons name="refresh" size={14} color="#fff" />}
          onPress={toggleData}
        >
          {dataVersion === 0 ? 'Change to Dataset B' : 'Change to Dataset A'}
        </Button>

        <View style={styles.dataBadge}>
          <Text variant="caption" style={{ fontWeight: '700', color: isDark ? '#64D2FF' : '#007AFF' }}>
            {dataVersion === 0 ? 'SET A (Flight)' : 'SET B (Telemetry)'}
          </Text>
        </View>

        <Button
          variant="ghost"
          size="sm"
          accessibilityLabel="Theme Toggle"
          icon={<Ionicons name={isDark ? 'sunny' : 'moon'} size={14} color={theme.fill} />}
          onPress={toggleDark}
        >
          {isDark ? 'Light' : 'Dark'}
        </Button>
      </View>

      {/* Section Content Area */}
      <View style={styles.contentArea}>{renderSection()}</View>

      {/* Persistent Bottom Navigation (TabBar from glacia-native) */}
      <View style={[styles.bottomBarContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TabBar
          items={navItems}
          activeId={activeSection}
          onTabChange={(id) => setActiveSection(id as SectionId)}
          style={styles.tabBar}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  globalControlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  dataBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.12)',
  },
  contentArea: {
    flex: 1,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
    zIndex: 99,
  },
  tabBar: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
});
