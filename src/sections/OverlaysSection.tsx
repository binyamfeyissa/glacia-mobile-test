import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Dialog,
  DialogTrigger,
  AlertDialog,
  ActionSheet,
  Menu,
  Sheet,
  Drawer,
  Toast,
  ToastViewport,
  Calendar,
  DatePicker,
  TimePicker,
  Button,
  Text,
  colors,
} from 'glacia-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentBox } from '../components/ComponentBox';
import { useApp } from '../context/AppContext';

export function OverlaysSection() {
  const { isDark, toasts, addToast, dismissToast } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  // Overlay modal states
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [actionSheetOpen, setActionSheetOpen] = useState<boolean>(false);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [timePickerOpen, setTimePickerOpen] = useState<boolean>(false);

  // Pickers committed values
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(2026, 10, 16));
  const [committedDate, setCommittedDate] = useState<Date>(new Date(2026, 10, 16));
  const [committedTime, setCommittedTime] = useState<string>('18:45');

  // Standalone Toast state
  const [standaloneToastVisible, setStandaloneToastVisible] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text variant="title" style={styles.sectionTitle}>
        Overlays & Pickers
      </Text>
      <Text variant="body" muted style={styles.sectionSubtitle}>
        Modals, action sheets, anchored menus, draggable bottom sheets, drawers, and pickers.
      </Text>

      {/* Dialog & DialogTrigger */}
      <ComponentBox
        name="Dialog & DialogTrigger"
        description="Centered modal panel on liquid glass with dimmed backdrop and focus trap."
      >
        <View style={styles.rowWrap}>
          {/* Uncontrolled trigger */}
          <DialogTrigger
            label="Open Dialog via DialogTrigger"
            title="Flight Confirmation"
            description="Your reservation GL-2601 on Liquid Glass First Class is ready for check-in."
            footer={
              <Button
                variant="filled"
                size="sm"
                accessibilityLabel="Close confirmation"
                onPress={() => addToast('Confirmed booking dialog', 'success')}
              >
                Got It
              </Button>
            }
          >
            <View style={{ paddingVertical: 10 }}>
              <Text variant="body">Seat: 02A (Suite Window)</Text>
              <Text variant="caption" muted>
                Boarding passes will be stored in Apple Wallet & Glacia Cache.
              </Text>
            </View>
          </DialogTrigger>

          {/* Controlled Dialog */}
          <Button
            variant="glass"
            size="sm"
            accessibilityLabel="Open Controlled Dialog"
            onPress={() => setDialogOpen(true)}
          >
            Open Controlled Dialog
          </Button>

          <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Controlled Dialog Panel"
            description="This dialog is opened and closed using the open / onOpenChange props."
            footer={
              <Button
                size="sm"
                variant="filled"
                accessibilityLabel="Dismiss dialog"
                onPress={() => setDialogOpen(false)}
              >
                Dismiss
              </Button>
            }
          >
            <Text variant="body">Controlled dialog state managed in parent component.</Text>
          </Dialog>
        </View>
      </ComponentBox>

      {/* AlertDialog */}
      <ComponentBox
        name="AlertDialog"
        description="Confirmation modal requiring explicit user choice; backdrop taps do not dismiss."
      >
        <Button
          variant="filled"
          size="sm"
          accessibilityLabel="Trigger Alert Dialog"
          onPress={() => setAlertOpen(true)}
        >
          Open AlertDialog (Destructive)
        </Button>

        <AlertDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title="Cancel Reservation GL-2601?"
          description="This action cannot be undone. Your seat reservation and priority passes will be permanently released."
          confirmLabel="Yes, Cancel Booking"
          cancelLabel="Keep Reservation"
          destructive
          onConfirm={() => {
            setAlertOpen(false);
            addToast('Reservation cancelled', 'error');
          }}
          onCancel={() => {
            setAlertOpen(false);
            addToast('Cancelled alert: Reservation kept', 'neutral');
          }}
        />
      </ComponentBox>

      {/* ActionSheet */}
      <ComponentBox
        name="ActionSheet"
        description="Thumb-reachable action list anchored to the bottom edge with separate cancel row."
      >
        <Button
          variant="glass"
          size="sm"
          accessibilityLabel="Open ActionSheet"
          onPress={() => setActionSheetOpen(true)}
        >
          Open ActionSheet
        </Button>

        <ActionSheet
          open={actionSheetOpen}
          onOpenChange={setActionSheetOpen}
          title="Share Flight Itinerary"
          message="Choose an export method for your travel companion:"
          cancelLabel="Cancel"
          options={[
            {
              label: 'AirDrop Itinerary',
              onPress: () => {
                setActionSheetOpen(false);
                addToast('Shared via AirDrop', 'success');
              },
            },
            {
              label: 'Copy Boarding Pass Link',
              onPress: () => {
                setActionSheetOpen(false);
                addToast('Copied link to clipboard', 'neutral');
              },
            },
            {
              label: 'Delete Itinerary',
              destructive: true,
              onPress: () => {
                setActionSheetOpen(false);
                addToast('Itinerary deleted', 'error');
              },
            },
          ]}
        />
      </ComponentBox>

      {/* Menu */}
      <ComponentBox
        name="Menu"
        description="Anchored dropdown menu placed relative to its trigger with screen boundary flipping."
      >
        <Menu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          trigger={
            <Button
              variant="glass"
              size="sm"
              accessibilityLabel="Open Dropdown Menu"
              icon={<Ionicons name="ellipsis-vertical" size={16} color={theme.fill} />}
              onPress={() => setMenuOpen(true)}
            >
              Open Anchored Menu
            </Button>
          }
          items={[
            {
              label: 'Edit Reservation',
              icon: <Ionicons name="pencil-outline" size={16} color={theme.fill} />,
              onPress: () => {
                setMenuOpen(false);
                addToast('Menu: Edit Reservation', 'neutral');
              },
            },
            {
              label: 'Download Offline Pass',
              icon: <Ionicons name="cloud-download-outline" size={16} color={theme.fill} />,
              onPress: () => {
                setMenuOpen(false);
                addToast('Menu: Offline Pass downloaded', 'success');
              },
            },
            {
              label: 'Remove from Wallet',
              destructive: true,
              icon: <Ionicons name="trash-outline" size={16} color="#FF3B30" />,
              onPress: () => {
                setMenuOpen(false);
                addToast('Menu: Removed from Wallet', 'error');
              },
            },
          ]}
        />
      </ComponentBox>

      {/* Sheet */}
      <ComponentBox
        name="Sheet"
        description="Bottom sheet with drag handle, spring physics, and multi-height snap points."
      >
        <Button
          variant="glass"
          size="sm"
          accessibilityLabel="Open Draggable Sheet"
          onPress={() => setSheetOpen(true)}
        >
          Open Bottom Sheet (Drag enabled)
        </Button>

        <Sheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          title="Flight GL-2601 Amenities"
          showHandle
          snapPoints={[320, 540]}
          footer={
            <Button
              variant="filled"
              size="sm"
              accessibilityLabel="Close sheet"
              onPress={() => setSheetOpen(false)}
            >
              Close Sheet
            </Button>
          }
        >
          <View style={{ paddingVertical: 14, gap: 10 }}>
            <Text variant="body" style={{ fontWeight: '600' }}>
              Drag this sheet between 320pt and 540pt snap points.
            </Text>
            <Text variant="caption" muted>
              Dragging downward past the lower threshold smoothly dismisses the sheet on spring tokens.
            </Text>
            <View style={{ gap: 8, marginTop: 8 }}>
              <Text variant="caption">✓ High-speed Starlink Wi-Fi included</Text>
              <Text variant="caption">✓ 4K OLED HDR entertainment with spatial audio</Text>
              <Text variant="caption">✓ Chef-curated dining & sommelier wine selection</Text>
              <Text variant="caption">✓ Lie-flat suites with Italian linen bedding</Text>
            </View>
          </View>
        </Sheet>
      </ComponentBox>

      {/* Drawer */}
      <ComponentBox
        name="Drawer"
        description="Side navigation drawer with spring slide, backdrop scrim, and drag-to-dismiss."
      >
        <Button
          variant="glass"
          size="sm"
          accessibilityLabel="Open Side Drawer"
          icon={<Ionicons name="menu-outline" size={18} color={theme.fill} />}
          onPress={() => setDrawerOpen(true)}
        >
          Open Navigation Drawer
        </Button>

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          side="left"
          width={280}
        >
          <View style={{ padding: 20, paddingTop: 60, gap: 16 }}>
            <Text variant="title">Glacia Fly</Text>
            <Text variant="caption" muted>
              Swipe panel left to dismiss or tap scrim.
            </Text>
            <View style={{ gap: 12, marginTop: 16 }}>
              <Button
                variant="ghost"
                size="sm"
                accessibilityLabel="My Trips"
                onPress={() => {
                  setDrawerOpen(false);
                  addToast('Drawer: My Trips', 'neutral');
                }}
              >
                My Trips
              </Button>
              <Button
                variant="ghost"
                size="sm"
                accessibilityLabel="SkyPriority"
                onPress={() => {
                  setDrawerOpen(false);
                  addToast('Drawer: SkyPriority', 'info');
                }}
              >
                SkyPriority Lounge
              </Button>
              <Button
                variant="ghost"
                size="sm"
                accessibilityLabel="Settings"
                onPress={() => {
                  setDrawerOpen(false);
                  addToast('Drawer: Settings', 'neutral');
                }}
              >
                App Settings
              </Button>
            </View>
          </View>
        </Drawer>
      </ComponentBox>

      {/* Toast & ToastViewport */}
      <ComponentBox
        name="Toast & ToastViewport"
        description="Stacked transient notifications (max 3) with independent dismiss timers."
      >
        <View style={{ gap: 10 }}>
          <View style={styles.rowWrap}>
            <Button
              size="sm"
              variant="filled"
              accessibilityLabel="Trigger Success Toast"
              onPress={() => addToast('Boarding gate confirmed: B22', 'success')}
            >
              + Success Toast
            </Button>
            <Button
              size="sm"
              variant="glass"
              accessibilityLabel="Trigger Warning Toast"
              onPress={() => addToast('Turbulence advisory ahead on route', 'warning')}
            >
              + Alert Toast
            </Button>
            <Button
              size="sm"
              variant="ghost"
              accessibilityLabel="Trigger Standalone Toast"
              onPress={() => setStandaloneToastVisible(true)}
            >
              Show Standalone Toast
            </Button>
          </View>

          {/* Standalone Toast */}
          {standaloneToastVisible ? (
            <Toast
              message="Standalone Glacia Toast Pill (Auto-dismiss in 4s)"
              tone="info"
              duration={4000}
              onDismiss={() => setStandaloneToastVisible(false)}
              action={{
                label: 'Undo',
                onPress: () => {
                  setStandaloneToastVisible(false);
                  addToast('Undo pressed on standalone toast', 'neutral');
                },
              }}
            />
          ) : null}

          {/* ToastViewport live preview container */}
          <Text variant="caption" muted style={{ marginTop: 6 }}>
            Active ToastViewport Queue ({toasts.length} items, max 3 visible):
          </Text>
          <View style={{ minHeight: 90, paddingVertical: 4 }}>
            <ToastViewport
              toasts={toasts}
              onDismiss={dismissToast}
              max={3}
              position="bottom"
            />
          </View>
        </View>
      </ComponentBox>

      {/* Calendar */}
      <ComponentBox
        name="Calendar"
        description="Six-row month grid built from custom views, maintaining height consistency across months."
      >
        <View style={{ gap: 8 }}>
          <View style={styles.rowBetween}>
            <Text variant="body">Selected Calendar Date:</Text>
            <Text variant="label" style={{ fontWeight: '700' }}>
              {calendarDate.toDateString()}
            </Text>
          </View>
          <Calendar
            value={calendarDate}
            onChange={(d) => {
              setCalendarDate(d);
              addToast(`Calendar date selected: ${d.toLocaleDateString()}`, 'neutral');
            }}
          />
        </View>
      </ComponentBox>

      {/* DatePicker */}
      <ComponentBox
        name="DatePicker"
        description="Calendar in Sheet with separate confirm and cancel: cancel changes nothing."
      >
        <View style={{ gap: 8 }}>
          <View style={styles.rowBetween}>
            <Text variant="body">Committed Travel Date:</Text>
            <Text variant="label" style={{ fontWeight: '700', color: '#007AFF' }}>
              {committedDate.toDateString()}
            </Text>
          </View>
          <Button
            size="sm"
            variant="glass"
            accessibilityLabel="Open Date Picker"
            onPress={() => setDatePickerOpen(true)}
          >
            Change Date via DatePicker Sheet
          </Button>

          <DatePicker
            open={datePickerOpen}
            onOpenChange={setDatePickerOpen}
            value={committedDate}
            title="Select Departure Date"
            onConfirm={(d) => {
              setCommittedDate(d);
              setDatePickerOpen(false);
              addToast(`Committed Date: ${d.toDateString()}`, 'success');
            }}
            onCancel={() => {
              setDatePickerOpen(false);
              addToast('Date selection cancelled (no change)', 'neutral');
            }}
          />
        </View>
      </ComponentBox>

      {/* TimePicker */}
      <ComponentBox
        name="TimePicker"
        description="Tappable hour/minute drums inside a Sheet with 24-hr/12-hr support."
      >
        <View style={{ gap: 8 }}>
          <View style={styles.rowBetween}>
            <Text variant="body">Committed Departure Time:</Text>
            <Text variant="label" style={{ fontWeight: '700', color: '#34C759' }}>
              {committedTime}
            </Text>
          </View>
          <Button
            size="sm"
            variant="glass"
            accessibilityLabel="Open Time Picker"
            onPress={() => setTimePickerOpen(true)}
          >
            Change Time via TimePicker Sheet
          </Button>

          <TimePicker
            open={timePickerOpen}
            onOpenChange={setTimePickerOpen}
            value={committedTime}
            title="Set Boarding Time"
            use12Hour
            onConfirm={(time) => {
              setCommittedTime(time);
              setTimePickerOpen(false);
              addToast(`Committed Time: ${time}`, 'success');
            }}
            onCancel={() => {
              setTimePickerOpen(false);
              addToast('Time selection cancelled (no change)', 'neutral');
            }}
          />
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
});
