import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Input,
  Textarea,
  Label,
  Field,
  Checkbox,
  RadioGroup,
  Select,
  SearchBar,
  Stepper,
  Toggle,
  ToggleGroup,
  InputOTP,
  Combobox,
  ColorPicker,
  ButtonGroup,
  Text,
  colors,
} from 'glacia-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentBox } from '../components/ComponentBox';
import { useApp } from '../context/AppContext';

export function FormsSection() {
  const { isDark, dataset, addToast } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  // Local state initialized / synchronized with dataset
  const [inputText, setInputText] = useState<string>(dataset.inputText);
  const [textareaText, setTextareaText] = useState<string>(dataset.textareaText);
  const [searchQuery, setSearchQuery] = useState<string>(dataset.searchQuery);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);
  const [radioValue, setRadioValue] = useState<string>(dataset.radioValue);
  const [selectValue, setSelectValue] = useState<string>(dataset.selectValue);
  const [stepperVal, setStepperVal] = useState<number>(dataset.stepperValue);
  const [togglePressed, setTogglePressed] = useState<boolean>(true);
  const [toggleGroupVal, setToggleGroupVal] = useState<string | string[]>(['bold']);
  const [otpVal, setOtpVal] = useState<string>(dataset.otpCode);
  const [comboboxVal, setComboboxVal] = useState<string>(dataset.comboboxValue);
  const [pickedColor, setPickedColor] = useState<string>(dataset.selectedColor);

  // Sync state if dataset changes
  React.useEffect(() => {
    setInputText(dataset.inputText);
    setTextareaText(dataset.textareaText);
    setSearchQuery(dataset.searchQuery);
    setRadioValue(dataset.radioValue);
    setSelectValue(dataset.selectValue);
    setStepperVal(dataset.stepperValue);
    setOtpVal(dataset.otpCode);
    setComboboxVal(dataset.comboboxValue);
    setPickedColor(dataset.selectedColor);
  }, [dataset]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text variant="title" style={styles.sectionTitle}>
        Forms & Input Controls
      </Text>
      <Text variant="body" muted style={styles.sectionSubtitle}>
        Text fields, checkboxes, radios, steppers, pickers, and verification inputs.
      </Text>

      {/* Input */}
      <ComponentBox
        name="Input"
        description="Single-line text input with themed placeholder, prefix icon, and suffix action."
      >
        <View style={{ gap: 10 }}>
          <Input
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter passenger email"
            accessibilityLabel="Passenger Email"
            prefix={<Ionicons name="mail-outline" size={18} color={theme.muted} style={{ marginLeft: 8 }} />}
            suffix={
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#34C759"
                style={{ marginRight: 8 }}
              />
            }
          />
          <Input
            placeholder="Error / Invalid state demo"
            invalid
            accessibilityLabel="Invalid field"
            prefix={<Ionicons name="alert-circle-outline" size={18} color="#FF3B30" style={{ marginLeft: 8 }} />}
          />
        </View>
      </ComponentBox>

      {/* Textarea */}
      <ComponentBox
        name="Textarea"
        description="Multi-line text area with rows prop, preserving single-line vertical discipline."
      >
        <Textarea
          value={textareaText}
          onChangeText={setTextareaText}
          rows={3}
          placeholder="Enter flight notes or shader comments..."
          accessibilityLabel="Shader Notes"
        />
      </ComponentBox>

      {/* Label & Field */}
      <ComponentBox
        name="Label & Field"
        description="Field stacks Label, Control, and Helper/Error message with proper accessibility ordering."
      >
        <View style={{ gap: 14 }}>
          <View>
            <Label required>Direct Label with Required Asterisk</Label>
            <Input placeholder="Direct input linked by Label" accessibilityLabel="Direct input" />
          </View>

          <Field
            label="Frequent Flyer Number"
            description="Enter your 8-digit SkyPriority or Glacia Club ID."
            required
          >
            <Input placeholder="e.g. GL-99283741" accessibilityLabel="Frequent Flyer ID" />
          </Field>

          <Field
            label="Passport Expiry Date"
            error="Document must be valid for at least 6 months from travel date."
            required
          >
            <Input placeholder="YYYY-MM-DD" invalid accessibilityLabel="Passport Expiry" />
          </Field>
        </View>
      </ComponentBox>

      {/* Checkbox */}
      <ComponentBox
        name="Checkbox"
        description="Custom glass-bordered checkbox with description and indeterminate mode."
      >
        <View style={{ gap: 12 }}>
          <Checkbox
            label="Include TSA PreCheck & Priority Lane"
            description="Expedited screening at Terminal 4 security gates."
            checked={checkboxChecked}
            onCheckedChange={setCheckboxChecked}
          />
          <Checkbox
            label="Indeterminate Master Sync Checkbox"
            description="Child tasks partially completed."
            indeterminate
            checked={false}
          />
          <Checkbox
            label="Disabled Checked Preference"
            description="Locked by enterprise organization policy."
            checked
            disabled
          />
        </View>
      </ComponentBox>

      {/* RadioGroup */}
      <ComponentBox
        name="RadioGroup"
        description="Mutually exclusive choices in vertical or horizontal orientation."
      >
        <Text variant="caption" muted style={{ marginBottom: 6 }}>
          Payment Method:
        </Text>
        <RadioGroup
          value={radioValue}
          onValueChange={(val) => {
            setRadioValue(val);
            addToast(`Selected payment: ${val}`, 'neutral');
          }}
          options={[
            { value: 'applepay', label: 'Apple Pay / Liquid Wallet', description: 'Instant biometric authorization' },
            { value: 'credit', label: 'Credit Card (Visa / Amex)', description: 'Earn 3x SkyPoints on travel' },
            { value: 'crypto', label: 'Crypto Voucher', description: 'Direct on-chain settlement' },
          ]}
        />
      </ComponentBox>

      {/* Select */}
      <ComponentBox
        name="Select"
        description="Inline mutually exclusive dropdown select with chevron and smooth toggle."
      >
        <Select
          value={selectValue}
          onValueChange={(val) => {
            setSelectValue(val);
            addToast(`Cabin Class: ${val}`, 'info');
          }}
          placeholder="Choose Cabin Class"
          options={[
            { value: 'first', label: 'Liquid First Class (Private Suite)' },
            { value: 'business', label: 'Executive Business (Lie-flat bed)' },
            { value: 'premium', label: 'Premium Economy (Extra legroom)' },
            { value: 'economy', label: 'Standard Cabin' },
          ]}
        />
      </ComponentBox>

      {/* SearchBar */}
      <ComponentBox
        name="SearchBar"
        description="Search field with magnifier icon, cancel button, and clear affordance."
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search components or flight numbers..."
          showCancel
          onCancel={() => {
            setSearchQuery('');
            addToast('Search canceled', 'neutral');
          }}
          onSubmit={(query) => addToast(`Searching for: ${query}`, 'neutral')}
        />
      </ComponentBox>

      {/* Stepper */}
      <ComponentBox
        name="Stepper"
        description="Minus / value / plus counter with min/max clamping and screen reader support."
      >
        <View style={styles.rowBetween}>
          <View>
            <Text variant="body" style={{ fontWeight: '600' }}>
              Travelers (Min 1, Max 9):
            </Text>
            <Text variant="caption" muted>
              Currently selected: {stepperVal} Guests
            </Text>
          </View>
          <Stepper
            value={stepperVal}
            onValueChange={setStepperVal}
            min={1}
            max={9}
            step={1}
            accessibilityLabel="Number of Travelers"
            formatValue={(v) => `${v} pax`}
          />
        </View>
      </ComponentBox>

      {/* Toggle & ToggleGroup */}
      <ComponentBox
        name="Toggle & ToggleGroup"
        description="Buttons that stay pressed with glassActive fill in single or multiple modes."
      >
        <View style={{ gap: 12 }}>
          <View style={styles.rowWrap}>
            <Toggle
              pressed={togglePressed}
              onPressedChange={setTogglePressed}
              icon={<Ionicons name="star" size={16} color={togglePressed ? '#FF9500' : theme.muted} />}
            >
              Favorite ({togglePressed ? 'ON' : 'OFF'})
            </Toggle>
            <Toggle
              variant="ghost"
              accessibilityLabel="Pin Action"
              icon={<Ionicons name="pin-outline" size={16} color={theme.fill} />}
            >
              Pin
            </Toggle>
          </View>

          <View>
            <Text variant="caption" muted style={{ marginBottom: 4 }}>
              ToggleGroup (Format Toolbar):
            </Text>
            <ToggleGroup
              multiple
              value={toggleGroupVal}
              onValueChange={setToggleGroupVal}
              items={[
                { value: 'bold', label: 'B', icon: <Ionicons name="text" size={14} color={theme.fill} /> },
                { value: 'italic', label: 'I', icon: <Ionicons name="code-slash" size={14} color={theme.fill} /> },
                { value: 'underline', label: 'U', icon: <Ionicons name="remove-outline" size={14} color={theme.fill} /> },
              ]}
            />
          </View>
        </View>
      </ComponentBox>

      {/* InputOTP */}
      <ComponentBox
        name="InputOTP"
        description="One text field driving multiple digit boxes with paste and autofill support."
      >
        <View style={{ gap: 8 }}>
          <Text variant="caption" muted>
            Enter 4-Digit Verification Code:
          </Text>
          <InputOTP
            length={4}
            value={otpVal}
            onChange={setOtpVal}
            onComplete={(code) => addToast(`OTP Completed: ${code}`, 'success')}
            accessibilityLabel="Verification Code"
          />
          <Text variant="caption" muted>
            Current value: "{otpVal}"
          </Text>
        </View>
      </ComponentBox>

      {/* Combobox */}
      <ComponentBox
        name="Combobox"
        description="Type-to-search dropdown whose list dynamically filters as you type."
      >
        <Combobox
          placeholder="Type to filter airport hubs..."
          label="Airport Destination"
          value={comboboxVal}
          onChange={(val) => {
            setComboboxVal(val);
            addToast(`Selected Hub: ${val}`, 'info');
          }}
          options={[
            { value: 'jfk', label: 'JFK - John F. Kennedy', description: 'New York, United States' },
            { value: 'lhr', label: 'LHR - London Heathrow', description: 'London, United Kingdom' },
            { value: 'sfo', label: 'SFO - San Francisco Intl', description: 'California, United States' },
            { value: 'hnd', label: 'HND - Tokyo Haneda', description: 'Tokyo, Japan' },
            { value: 'cdg', label: 'CDG - Paris Charles de Gaulle', description: 'Paris, France' },
            { value: 'dxb', label: 'DXB - Dubai International', description: 'Dubai, UAE' },
          ]}
        />
      </ComponentBox>

      {/* ColorPicker */}
      <ComponentBox
        name="ColorPicker"
        description="Palette grid plus custom hue gradient slider with live hex readout."
      >
        <View style={{ gap: 10 }}>
          <View style={styles.rowBetween}>
            <Text variant="body">Picked Color:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: pickedColor,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.4)',
                }}
              />
              <Text variant="caption" style={{ fontFamily: 'Courier', fontWeight: '700' }}>
                {pickedColor.toUpperCase()}
              </Text>
            </View>
          </View>
          <ColorPicker
            value={pickedColor}
            onChange={setPickedColor}
            allowCustom
            size="md"
            accessibilityLabel="Accent Color Picker"
          />
        </View>
      </ComponentBox>

      {/* ButtonGroup */}
      <ComponentBox
        name="ButtonGroup"
        description="Stateless connected row of buttons in attached or segmented variant."
      >
        <View style={{ gap: 10 }}>
          <Text variant="caption" muted>
            Variant: attached (Shared edges)
          </Text>
          <ButtonGroup
            variant="attached"
            items={[
              { label: 'Day', onPress: () => addToast('ButtonGroup: Day', 'neutral') },
              { label: 'Week', onPress: () => addToast('ButtonGroup: Week', 'neutral') },
              { label: 'Month', onPress: () => addToast('ButtonGroup: Month', 'neutral') },
              { label: 'Year', onPress: () => addToast('ButtonGroup: Year', 'neutral') },
            ]}
          />

          <Text variant="caption" muted style={{ marginTop: 4 }}>
            Variant: segmented (Gaps between buttons)
          </Text>
          <ButtonGroup
            variant="segmented"
            size="sm"
            items={[
              { label: 'Left', onPress: () => addToast('ButtonGroup: Left', 'neutral') },
              { label: 'Center', onPress: () => addToast('ButtonGroup: Center', 'neutral') },
              { label: 'Right', onPress: () => addToast('ButtonGroup: Right', 'neutral') },
            ]}
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
