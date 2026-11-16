import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Text, colors, radii } from 'glacia-native';
import { useApp } from '../context/AppContext';

interface ComponentBoxProps {
  name: string;
  description?: string;
  children: ReactNode;
  style?: ViewStyle;
}

export function ComponentBox({ name, description, children, style }: ComponentBoxProps) {
  const { isDark } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: isDark ? 'rgba(0, 122, 255, 0.18)' : 'rgba(0, 122, 255, 0.12)',
              borderColor: isDark ? 'rgba(0, 122, 255, 0.35)' : 'rgba(0, 122, 255, 0.25)',
            },
          ]}
        >
          <Text
            variant="caption"
            style={{
              color: isDark ? '#64D2FF' : '#007AFF',
              fontWeight: '700',
              fontFamily: 'Courier',
              letterSpacing: 0.4,
            }}
          >
            {name}
          </Text>
        </View>
        {description ? (
          <Text variant="caption" muted style={styles.description}>
            {description}
          </Text>
        ) : null}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 14,
    borderRadius: radii.lg,
    borderWidth: 1,
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
    borderWidth: 0.5,
  },
  description: {
    fontSize: 11,
    flex: 1,
  },
  content: {
    width: '100%',
  },
});
