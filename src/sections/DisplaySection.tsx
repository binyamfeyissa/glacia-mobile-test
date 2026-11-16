import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import {
  Text,
  Avatar,
  Badge,
  Separator,
  Skeleton,
  Spinner,
  Progress,
  Rating,
  Banner,
  List,
  ListItem,
  ListSection,
  Accordion,
  Carousel,
  PageControl,
  NativeTable,
  NativeScrollArea,
  NativeImage,
  colors,
} from 'glacia-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentBox } from '../components/ComponentBox';
import { useApp } from '../context/AppContext';

export function DisplaySection() {
  const { isDark, dataset, addToast } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  // Local interactive state
  const [ratingVal, setRatingVal] = useState<number>(dataset.ratingValue);
  const [carouselIdx, setCarouselIdx] = useState<number>(0);
  const [accordionOpen, setAccordionOpen] = useState<string[]>(['sec-1']);
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);

  // Sync state if dataset changes
  React.useEffect(() => {
    setRatingVal(dataset.ratingValue);
    setBannerVisible(true);
  }, [dataset]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text variant="title" style={styles.sectionTitle}>
        Display & Data Presentation
      </Text>
      <Text variant="body" muted style={styles.sectionSubtitle}>
        Text variants, avatars, progress indicators, tables, swipeable lists, and carousels.
      </Text>

      {/* Text Hierarchy */}
      <ComponentBox
        name="Text"
        description="Themed typography scale ensuring contrast across light and dark modes."
      >
        <View style={{ gap: 6 }}>
          <Text variant="title">Title Scale (28pt bold)</Text>
          <Text variant="heading">Heading Scale (20pt semibold)</Text>
          <Text variant="body">Body Scale (15pt regular) with crisp anti-aliasing.</Text>
          <Text variant="body" muted>Body Muted for supporting descriptions and metadata.</Text>
          <Text variant="label" style={{ fontWeight: '700' }}>Label Scale (13pt medium) for controls.</Text>
          <Text variant="caption">Caption Scale (11pt) for micro-copy.</Text>
          <Text variant="body" destructive>Destructive Tone: Critical error or warning statement.</Text>
        </View>
      </ComponentBox>

      {/* Avatar & Badge */}
      <ComponentBox
        name="Avatar & Badge"
        description="Avatars with initials fallback and status dots, combined with badge overlays."
      >
        <View style={{ gap: 14 }}>
          <View style={styles.rowWrap}>
            <Avatar name="Alex Morgan" size="lg" status="online" />
            <Avatar name="Evelyn Reed" size="md" status="busy" />
            <Avatar name="Glacia System" size="sm" status="offline" />

            {/* Badge overlay on Avatar */}
            <Badge tone="destructive" overlay={<Avatar name="Dev Admin" size="md" status="online" />}>
              {dataset.badgeCount}
            </Badge>

            {/* Badge standalone tones */}
            <Badge tone="fill">Active ({dataset.badgeCount})</Badge>
            <Badge tone="success">Verified</Badge>
            <Badge tone="muted">Draft</Badge>
          </View>
        </View>
      </ComponentBox>

      {/* Separator */}
      <ComponentBox
        name="Separator"
        description="Hairline 1pt divider in horizontal and vertical orientations."
      >
        <View style={{ gap: 8 }}>
          <Text variant="caption" muted>
            Horizontal with 16pt inset:
          </Text>
          <Separator orientation="horizontal" inset={16} />
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 24, gap: 12 }}>
            <Text variant="caption">Left Block</Text>
            <Separator orientation="vertical" />
            <Text variant="caption">Middle Block</Text>
            <Separator orientation="vertical" />
            <Text variant="caption">Right Block</Text>
          </View>
        </View>
      </ComponentBox>

      {/* Skeleton & Spinner */}
      <ComponentBox
        name="Skeleton & Spinner"
        description="Gentle spring pulsing placeholder and SVG arc rotation spinners."
      >
        <View style={{ gap: 12 }}>
          <Text variant="caption" muted>
            Skeleton shapes (line, rect, circle):
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Skeleton shape="circle" width={40} height={40} />
            <View style={{ gap: 6, flex: 1 }}>
              <Skeleton shape="line" width="70%" height={12} />
              <Skeleton shape="line" width="95%" height={12} />
            </View>
          </View>
          <Skeleton shape="rect" width="100%" height={40} />

          <Text variant="caption" muted style={{ marginTop: 4 }}>
            Spinner sizes (sm, md, lg):
          </Text>
          <View style={styles.rowWrap}>
            <Spinner size="sm" accessibilityLabel="Small loading spinner" />
            <Spinner size="md" tint="#007AFF" accessibilityLabel="Medium loading spinner" />
            <Spinner size="lg" tint="#34C759" accessibilityLabel="Large loading spinner" />
          </View>
        </View>
      </ComponentBox>

      {/* Progress & Rating */}
      <ComponentBox
        name="Progress & Rating"
        description="Linear bar, circular ring, and interactive star rating with half-star precision."
      >
        <View style={{ gap: 14 }}>
          <View style={{ gap: 6 }}>
            <View style={styles.rowBetween}>
              <Text variant="body">Linear Progress Bar:</Text>
              <Text variant="caption" style={{ fontWeight: '700' }}>
                {dataset.progressValue}%
              </Text>
            </View>
            <Progress value={dataset.progressValue} variant="bar" />
          </View>

          <View style={styles.rowBetween}>
            <View style={{ gap: 4 }}>
              <Text variant="body">Circular Progress Ring:</Text>
              <Text variant="caption" muted>
                Clamped value: {dataset.progressRingValue}%
              </Text>
            </View>
            <Progress value={dataset.progressRingValue} variant="ring" tint="#34C759" />
          </View>

          <View style={styles.rowBetween}>
            <View>
              <Text variant="body">Star Rating:</Text>
              <Text variant="caption" muted>
                Current Score: {ratingVal.toFixed(1)} / 5.0
              </Text>
            </View>
            <Rating
              value={ratingVal}
              onChange={(val) => {
                setRatingVal(val);
                addToast(`Rating updated to ${val.toFixed(1)} stars`, 'info');
              }}
              size="md"
              accessibilityLabel="Product Rating"
            />
          </View>
        </View>
      </ComponentBox>

      {/* Banner */}
      <ComponentBox
        name="Banner"
        description="Inline alert with tone edge styling, dismiss button, and action."
      >
        {bannerVisible ? (
          <Banner
            title={dataset.banner.title}
            message={dataset.banner.message}
            tone={dataset.banner.tone}
            icon={<Ionicons name="information-circle-outline" size={20} color={theme.fill} />}
            onDismiss={() => {
              setBannerVisible(false);
              addToast('Banner dismissed', 'neutral');
            }}
            action={{
              label: 'Details',
              onPress: () => addToast('Banner action tapped', 'info'),
            }}
          />
        ) : (
          <View style={styles.rowBetween}>
            <Text variant="caption" muted>
              Banner was dismissed.
            </Text>
            <Pressable onPress={() => setBannerVisible(true)}>
              <Text
                variant="caption"
                style={{ color: '#007AFF', fontWeight: '700' }}
              >
                Restore Banner
              </Text>
            </Pressable>
          </View>
        )}
      </ComponentBox>

      {/* List, ListItem, ListSection */}
      <ComponentBox
        name="List, ListItem, ListSection"
        description="Grouped inset settings list with swipeable actions, chevrons, and headers."
      >
        <List inset>
          <ListSection header="TELEMETRY PREFERENCES">
            {dataset.listItems.map((item, idx) => (
              <ListItem
                key={item.id}
                title={item.title}
                description={item.description}
                chevron
                leading={
                  <Ionicons
                    name={idx === 0 ? 'wifi-outline' : idx === 1 ? 'shield-checkmark-outline' : 'cloud-outline'}
                    size={20}
                    color="#007AFF"
                  />
                }
                trailing={
                  item.trailingText ? (
                    <Text variant="caption" style={{ fontWeight: '600', color: theme.muted }}>
                      {item.trailingText}
                    </Text>
                  ) : null
                }
                onPress={() => addToast(`Tapped: ${item.title}`, 'neutral')}
                swipeActions={[
                  {
                    label: 'Sync',
                    color: '#007AFF',
                    icon: <Ionicons name="sync" size={16} color="#fff" />,
                    onPress: () => addToast(`Synced ${item.title}`, 'success'),
                  },
                  {
                    label: 'Delete',
                    color: '#FF3B30',
                    icon: <Ionicons name="trash" size={16} color="#fff" />,
                    onPress: () => addToast(`Deleted ${item.title}`, 'error'),
                  },
                ]}
              />
            ))}
          </ListSection>
        </List>
      </ComponentBox>

      {/* Accordion */}
      <ComponentBox
        name="Accordion"
        description="Expandable disclosure panels measured and animated on the springs token."
      >
        <Accordion
          multiple
          openSections={accordionOpen}
          onOpenSectionsChange={setAccordionOpen}
          sections={[
            {
              value: 'sec-1',
              title: 'Liquid Glass Rendering Engine',
              description: 'Metal & Vulkan shader pipeline',
              content: (
                <Text variant="body" muted style={{ paddingVertical: 6 }}>
                  Apple's UIGlassEffect provides real-time refraction and specular highlights on iOS 26.
                  Glacia Native ensures graceful translucent fallback across older OS builds.
                </Text>
              ),
            },
            {
              value: 'sec-2',
              title: 'Haptic Feedback & Accessibility',
              description: 'Integrated selection ticks',
              content: (
                <Text variant="body" muted style={{ paddingVertical: 6 }}>
                  Built-in selection haptics fire exclusively on value changes, respecting system
                  accessibility switches and reduce motion preferences.
                </Text>
              ),
            },
          ]}
        />
      </ComponentBox>

      {/* Carousel & PageControl */}
      <ComponentBox
        name="Carousel & PageControl"
        description="Horizontally paging swiper with animated spring page control dots."
      >
        <View style={{ gap: 10 }}>
          <Carousel
            index={carouselIdx}
            onIndexChange={setCarouselIdx}
            gap={12}
            slides={[
              <View key="slide-1" style={[styles.slideCard, { backgroundColor: 'rgba(0, 122, 255, 0.15)' }]}>
                <Ionicons name="sparkles" size={28} color="#007AFF" />
                <Text variant="heading" style={{ marginTop: 8 }}>
                  Real Apple Glass
                </Text>
                <Text variant="caption" muted style={{ textAlign: 'center' }}>
                  Native UIGlassEffect rendered by @callstack/liquid-glass on iOS 26.
                </Text>
              </View>,
              <View key="slide-2" style={[styles.slideCard, { backgroundColor: 'rgba(52, 199, 89, 0.15)' }]}>
                <Ionicons name="phone-portrait-outline" size={28} color="#34C759" />
                <Text variant="heading" style={{ marginTop: 8 }}>
                  Universal Android Fallback
                </Text>
                <Text variant="caption" muted style={{ textAlign: 'center' }}>
                  Identical layout and tinted glass styling without platform divergence.
                </Text>
              </View>,
              <View key="slide-3" style={[styles.slideCard, { backgroundColor: 'rgba(175, 82, 222, 0.15)' }]}>
                <Ionicons name="git-merge-outline" size={28} color="#AF52DE" />
                <Text variant="heading" style={{ marginTop: 8 }}>
                  Connected Liquid Glass
                </Text>
                <Text variant="caption" muted style={{ textAlign: 'center' }}>
                  GlassContainer blends adjacent surfaces into a single liquid membrane.
                </Text>
              </View>,
            ]}
          />
          <View style={{ alignItems: 'center', marginTop: 4 }}>
            <PageControl
              count={3}
              activeIndex={carouselIdx}
              onChange={setCarouselIdx}
              tint="#007AFF"
            />
          </View>
        </View>
      </ComponentBox>

      {/* NativeTable */}
      <ComponentBox
        name="NativeTable"
        description="Tabular data with responsive row layout, column alignment, and selection."
      >
        <NativeTable
          caption="FLIGHT MANIFEST & TELEMETRY"
          columns={[
            { key: 'flight', header: 'FLIGHT', width: 2, primary: true },
            { key: 'route', header: 'ROUTE', width: 2 },
            { key: 'status', header: 'STATUS', width: 2 },
            { key: 'gate', header: 'GATE', width: 1 },
            { key: 'fare', header: 'FARE', width: 1, align: 'right' },
          ]}
          rows={dataset.tableRows}
          onRowPress={(row) => addToast(`Tapped Table Row: ${row.id}`, 'neutral')}
        />
      </ComponentBox>

      {/* NativeScrollArea */}
      <ComponentBox
        name="NativeScrollArea"
        description="Bounded scroll region with native momentum bounce and optional border."
      >
        <NativeScrollArea maxHeight={110} bordered>
          <View style={{ padding: 10, gap: 4 }}>
            <Text variant="caption" style={{ fontFamily: 'Courier', fontWeight: '600' }}>
              [SYSTEM_LOG 17:40:02] Engine initialized.
            </Text>
            <Text variant="caption" style={{ fontFamily: 'Courier', color: '#34C759' }}>
              [SYSTEM_LOG 17:40:05] UIGlassEffect shader linked.
            </Text>
            <Text variant="caption" style={{ fontFamily: 'Courier', color: '#007AFF' }}>
              [SYSTEM_LOG 17:40:10] Spring physics verified at 120 FPS.
            </Text>
            <Text variant="caption" style={{ fontFamily: 'Courier', color: theme.muted }}>
              [SYSTEM_LOG 17:40:14] Telemetry dataset stream synchronized.
            </Text>
            <Text variant="caption" style={{ fontFamily: 'Courier', color: '#FF9500' }}>
              [SYSTEM_LOG 17:40:18] Haptics ready on selection channels.
            </Text>
          </View>
        </NativeScrollArea>
      </ComponentBox>

      {/* NativeImage */}
      <ComponentBox
        name="NativeImage"
        description="Image with placeholder Skeleton, error fallback, and smooth fade-in."
      >
        <View style={{ gap: 10 }}>
          <NativeImage
            source={{ uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600' }}
            accessibilityLabel="Architectural Glass Refraction"
            fadeIn
            style={{ width: '100%', height: 160, borderRadius: 14, overflow: 'hidden' }}
            placeholder={<Skeleton shape="rect" width="100%" height={160} />}
          />
          <Text variant="caption" muted>
            Loaded from remote CDN with Skeleton loading state.
          </Text>
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
  slideCard: {
    width: 290,
    height: 140,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
