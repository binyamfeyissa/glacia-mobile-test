import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Glass,
  GlassContainer,
  Button,
  Switch,
  Slider,
  SegmentedControl,
  TabBar,
  Tabs,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardBody,
  CardFooter,
  IconButton,
  Chip,
  FAB,
  FABGroup,
  Text,
  colors,
} from 'glacia-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentBox } from '../components/ComponentBox';
import { useApp } from '../context/AppContext';

export function CoreSection() {
  const { isDark, dataset, addToast } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  // Local state initialized / synchronized with dataset
  const [sliderVal, setSliderVal] = useState<number>(dataset.sliderValue);
  const [switchChecked, setSwitchChecked] = useState<boolean>(dataset.switchChecked);
  const [segmentedIdx, setSegmentedIdx] = useState<number>(dataset.segmentedIndex);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeTabBarId, setActiveTabBarId] = useState<string>('flights');
  const [chipSelected, setChipSelected] = useState<boolean>(true);
  const [fabGroupOpen, setFabGroupOpen] = useState<boolean>(false);

  // Sync state if dataset changes
  React.useEffect(() => {
    setSliderVal(dataset.sliderValue);
    setSwitchChecked(dataset.switchChecked);
    setSegmentedIdx(dataset.segmentedIndex);
  }, [dataset]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text variant="title" style={styles.sectionTitle}>
        Core & Glass Components
      </Text>
      <Text variant="body" muted style={styles.sectionSubtitle}>
        Fundamental primitives, buttons, controls, card hierarchy, and navigation bars.
      </Text>

      {/* Button */}
      <ComponentBox
        name="Button"
        description="Pressable button with glass, filled, and ghost variants in sm, md, lg sizes."
      >
        <View style={styles.rowWrap}>
          <Button
            variant="glass"
            size="md"
            accessibilityLabel="Glass Button"
            icon={<Ionicons name="airplane-outline" size={18} color={theme.fill} />}
            onPress={() => addToast(`Tapped: ${dataset.buttonLabel}`, 'info')}
          >
            {dataset.buttonLabel}
          </Button>

          <Button
            variant="filled"
            size="sm"
            accessibilityLabel="Filled Button"
            onPress={() => addToast('Filled button pressed', 'success')}
          >
            Filled Action
          </Button>

          <Button
            variant="ghost"
            size="sm"
            accessibilityLabel="Ghost Button"
            onPress={() => addToast('Ghost button pressed', 'neutral')}
          >
            Ghost Option
          </Button>

          <Button
            variant="glass"
            size="sm"
            disabled
            accessibilityLabel="Disabled Button"
          >
            Disabled State
          </Button>
        </View>
      </ComponentBox>

      {/* Switch */}
      <ComponentBox
        name="Switch"
        description="Custom animated track on springs token with haptics. Toggles on click."
      >
        <View style={styles.rowBetween}>
          <Text variant="body">
            Haptic Status: {switchChecked ? 'Enabled (Active)' : 'Disabled (Muted)'}
          </Text>
          <Switch
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
            accessibilityLabel="Core Switch"
          />
        </View>
      </ComponentBox>

      {/* Slider */}
      <ComponentBox
        name="Slider"
        description="Continuous draggable value track with step snapping and measured touch position."
      >
        <View style={{ gap: 8 }}>
          <View style={styles.rowBetween}>
            <Text variant="body">Track Value:</Text>
            <Text variant="label" style={{ fontWeight: '700' }}>
              {Math.round(sliderVal)}%
            </Text>
          </View>
          <Slider
            min={0}
            max={100}
            step={5}
            value={sliderVal}
            onValueChange={setSliderVal}
            accessibilityLabel="Volume Slider"
          />
        </View>
      </ComponentBox>

      {/* SegmentedControl */}
      <ComponentBox
        name="SegmentedControl"
        description="Mutually exclusive choices with animated sliding glass pill."
      >
        <SegmentedControl
          values={['Standard', 'Pro Mode', 'Ultra HDR']}
          selectedIndex={segmentedIdx}
          onValueChange={(_, idx) => {
            setSegmentedIdx(idx);
            addToast(`Segment switched to index ${idx}`, 'neutral');
          }}
        />
      </ComponentBox>

      {/* Tabs */}
      <ComponentBox
        name="Tabs"
        description="Lifted inner glass rail tabs for subview navigation."
      >
        <Tabs
          items={[
            { id: 'overview', label: 'Overview', icon: <Ionicons name="apps-outline" size={14} color={theme.fill} /> },
            { id: 'metrics', label: 'Metrics', icon: <Ionicons name="analytics-outline" size={14} color={theme.fill} /> },
            { id: 'logs', label: 'Logs', icon: <Ionicons name="terminal-outline" size={14} color={theme.fill} /> },
          ]}
          activeId={activeTab}
          onTabChange={(id) => {
            setActiveTab(id);
            addToast(`Tabs changed to: ${id}`, 'neutral');
          }}
        />
        <View style={{ marginTop: 8, padding: 8 }}>
          <Text variant="caption" muted>
            Active Tab Content: {activeTab.toUpperCase()} View Selected
          </Text>
        </View>
      </ComponentBox>

      {/* TabBar (Standalone Showcase) */}
      <ComponentBox
        name="TabBar"
        description="Bottom application navigation bar on liquid glass."
      >
        <TabBar
          items={[
            { id: 'flights', label: 'Flights', icon: <Ionicons name="airplane" size={16} color={theme.fill} /> },
            { id: 'pass', label: 'Pass', icon: <Ionicons name="qr-code" size={16} color={theme.fill} /> },
            { id: 'status', label: 'Status', icon: <Ionicons name="compass-outline" size={16} color={theme.fill} /> },
          ]}
          activeId={activeTabBarId}
          onTabChange={(id) => {
            setActiveTabBarId(id);
            addToast(`Core TabBar item selected: ${id}`, 'neutral');
          }}
        />
      </ComponentBox>

      {/* Card (with CardHeader, CardTitle, CardDescription, CardContent, CardBody, CardFooter) */}
      <ComponentBox
        name="Card (with CardHeader, CardTitle, CardDescription, CardContent, CardBody, CardFooter)"
        description="Boarding pass layout demonstrating all 7 Card subcomponents with live dataset values."
      >
        <Card effect="regular" style={styles.cardExample}>
          <CardHeader>
            <View style={styles.rowBetween}>
              <CardTitle>{dataset.boardingPass.flight}</CardTitle>
              <Text variant="caption" style={{ color: '#007AFF', fontWeight: '700' }}>
                {dataset.boardingPass.classType}
              </Text>
            </View>
            <CardDescription>
              {dataset.boardingPass.from} ➔ {dataset.boardingPass.to}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <View style={styles.passGrid}>
              <View>
                <Text variant="caption" muted>
                  PASSENGER
                </Text>
                <Text variant="body" style={{ fontWeight: '600' }}>
                  {dataset.boardingPass.passenger}
                </Text>
              </View>
              <View>
                <Text variant="caption" muted>
                  GATE
                </Text>
                <Text variant="body" style={{ fontWeight: '700', color: '#34C759' }}>
                  {dataset.boardingPass.gate}
                </Text>
              </View>
              <View>
                <Text variant="caption" muted>
                  SEAT
                </Text>
                <Text variant="body" style={{ fontWeight: '700' }}>
                  {dataset.boardingPass.seat}
                </Text>
              </View>
            </View>
          </CardContent>

          {/* CardBody (alias of CardContent, explicitly exercised) */}
          <CardBody>
            <View style={styles.boardingTimeRow}>
              <Ionicons name="time-outline" size={16} color={theme.muted} />
              <Text variant="caption" muted>
                Boarding Time: {dataset.boardingPass.time}
              </Text>
            </View>
          </CardBody>

          <CardFooter>
            <View style={styles.rowBetween}>
              <Text variant="caption" muted>
                Glacia Boarding Pass Standard
              </Text>
              <Button
                size="sm"
                variant="filled"
                accessibilityLabel="View Ticket"
                onPress={() => addToast(`Opening pass for ${dataset.boardingPass.passenger}`, 'success')}
              >
                View Pass
              </Button>
            </View>
          </CardFooter>
        </Card>
      </ComponentBox>

      {/* Glass & GlassContainer Primitives */}
      <ComponentBox
        name="Glass & GlassContainer"
        description="Glass surface in regular & clear effect wrapped in a GlassContainer."
      >
        <GlassContainer spacing={8}>
          <View style={styles.rowWrap}>
            <Glass effect="regular" style={styles.miniGlass}>
              <Text variant="caption" style={{ fontWeight: '600' }}>
                Glass effect="regular"
              </Text>
              <Text variant="caption" muted>
                Ambient Blur
              </Text>
            </Glass>
            <Glass effect="clear" style={styles.miniGlass}>
              <Text variant="caption" style={{ fontWeight: '600' }}>
                Glass effect="clear"
              </Text>
              <Text variant="caption" muted>
                High Specular
              </Text>
            </Glass>
          </View>
        </GlassContainer>
      </ComponentBox>

      {/* IconButton */}
      <ComponentBox
        name="IconButton"
        description="Icon-only button on glass in sm, md, lg and ghost variants."
      >
        <View style={styles.rowWrap}>
          <IconButton
            size="sm"
            accessibilityLabel="Refresh sm"
            icon={<Ionicons name="refresh-outline" size={16} color={theme.fill} />}
            onPress={() => addToast('Small IconButton pressed', 'neutral')}
          />
          <IconButton
            size="md"
            accessibilityLabel="Heart md"
            icon={<Ionicons name="heart-outline" size={20} color="#FF2D55" />}
            onPress={() => addToast('Medium Heart IconButton pressed', 'info')}
          />
          <IconButton
            size="lg"
            accessibilityLabel="Share lg"
            icon={<Ionicons name="share-outline" size={24} color={theme.fill} />}
            onPress={() => addToast('Large Share IconButton pressed', 'neutral')}
          />
          <IconButton
            size="md"
            variant="ghost"
            accessibilityLabel="Ghost IconButton"
            icon={<Ionicons name="ellipsis-horizontal" size={20} color={theme.fill} />}
            onPress={() => addToast('Ghost IconButton pressed', 'neutral')}
          />
        </View>
      </ComponentBox>

      {/* Chip */}
      <ComponentBox
        name="Chip"
        description="Filter and tag pills with active glass tint and close affordance."
      >
        <View style={styles.rowWrap}>
          <Chip
            label={chipSelected ? 'iOS 26 Liquid (Selected)' : 'iOS 26 Liquid'}
            selected={chipSelected}
            onPress={() => setChipSelected(!chipSelected)}
            icon={<Ionicons name="water-outline" size={14} color={theme.fill} />}
          />
          <Chip
            label="Tag With Close"
            icon={<Ionicons name="pricetag-outline" size={14} color={theme.fill} />}
            onClose={() => addToast('Closed tag chip', 'neutral')}
          />
          <Chip
            label="Disabled Tag"
            disabled
          />
        </View>
      </ComponentBox>

      {/* FAB & FABGroup */}
      <ComponentBox
        name="FAB & FABGroup"
        description="Floating Action Button (circular and extended) and expandable FABGroup."
      >
        <View style={{ gap: 14 }}>
          <View style={styles.rowWrap}>
            <FAB
              accessibilityLabel="Add New Entry"
              icon={<Ionicons name="add" size={24} color={theme.fill} />}
              onPress={() => addToast('Circular FAB tapped', 'info')}
            />
            <FAB
              accessibilityLabel="Extended Compose FAB"
              label="Compose Message"
              icon={<Ionicons name="create-outline" size={18} color={theme.fill} />}
              onPress={() => addToast('Extended FAB tapped', 'info')}
            />
          </View>

          {/* Inline FABGroup demo */}
          <View style={styles.fabGroupContainer}>
            <Text variant="caption" muted style={{ marginBottom: 6 }}>
              Tap to expand FABGroup:
            </Text>
            <FABGroup
              open={fabGroupOpen}
              onOpenChange={setFabGroupOpen}
              accessibilityLabel="Action Group"
              icon={<Ionicons name="apps" size={22} color={theme.fill} />}
              actions={[
                {
                  label: 'Book Seat',
                  icon: <Ionicons name="airplane-outline" size={18} color={theme.fill} />,
                  onPress: () => {
                    setFabGroupOpen(false);
                    addToast('FABGroup: Book Seat tapped', 'info');
                  },
                },
                {
                  label: 'Download Ticket',
                  icon: <Ionicons name="download-outline" size={18} color={theme.fill} />,
                  onPress: () => {
                    setFabGroupOpen(false);
                    addToast('FABGroup: Download Ticket tapped', 'success');
                  },
                },
                {
                  label: 'Flight Alert',
                  icon: <Ionicons name="notifications-outline" size={18} color={theme.fill} />,
                  onPress: () => {
                    setFabGroupOpen(false);
                    addToast('FABGroup: Flight Alert tapped', 'neutral');
                  },
                },
              ]}
            />
          </View>
        </View>
      </ComponentBox>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardExample: {
    width: '100%',
    padding: 16,
  },
  passGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  boardingTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 6,
  },
  miniGlass: {
    flex: 1,
    minWidth: 140,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  fabGroupContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'flex-start',
  },
});
