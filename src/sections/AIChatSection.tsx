import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import {
  NativeAIInput,
  NativeImageGeneration,
  NativePanelside,
  NativePlan,
  NativeResponse,
  NativeSources,
  NativeTask,
  NativeSoundwave,
  NativeThinkingOrb,
  Message,
  MessageBubble,
  MessageAttachment,
  Text,
  colors,
} from 'glacia-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentBox } from '../components/ComponentBox';
import { useApp } from '../context/AppContext';

interface ChatItem {
  id: string;
  name: string;
  time: string;
  outgoing: boolean;
  text: string;
  attachment?: {
    name: string;
    size: string;
  };
}

export function AIChatSection() {
  const { isDark, dataset, addToast } = useApp();
  const theme = isDark ? colors.dark : colors.light;

  // Active chat conversation list
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: 'm1',
      name: 'Glacia Assistant',
      time: '18:42',
      outgoing: false,
      text: dataset.aiChat.assistantMessage,
      attachment: {
        name: dataset.aiChat.attachmentName,
        size: dataset.aiChat.attachmentSize,
      },
    },
    {
      id: 'm2',
      name: dataset.boardingPass.passenger,
      time: '18:43',
      outgoing: true,
      text: dataset.aiChat.userMessage,
    },
    {
      id: 'm3',
      name: 'Glacia Assistant',
      time: '18:44',
      outgoing: false,
      text: dataset.aiChat.followUp,
    },
  ]);

  // Sync if dataset changes
  React.useEffect(() => {
    setMessages([
      {
        id: 'm1',
        name: 'Glacia Assistant',
        time: '18:42',
        outgoing: false,
        text: dataset.aiChat.assistantMessage,
        attachment: {
          name: dataset.aiChat.attachmentName,
          size: dataset.aiChat.attachmentSize,
        },
      },
      {
        id: 'm2',
        name: dataset.boardingPass.passenger,
        time: '18:43',
        outgoing: true,
        text: dataset.aiChat.userMessage,
      },
      {
        id: 'm3',
        name: 'Glacia Assistant',
        time: '18:44',
        outgoing: false,
        text: dataset.aiChat.followUp,
      },
    ]);
  }, [dataset]);

  // Composer input text & busy state
  const [composerText, setComposerText] = useState<string>('');
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [panelVal, setPanelVal] = useState<string>('c1');

  // Streaming response simulation characters
  const [revealedChars, setRevealedChars] = useState<number>(45);

  const handleSendMessage = () => {
    if (!composerText.trim()) return;
    const userText = composerText.trim();
    setComposerText('');

    const newId = `msg-${Date.now()}`;
    const userMsg: ChatItem = {
      id: newId,
      name: dataset.boardingPass.passenger,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      outgoing: true,
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsBusy(true);

    setTimeout(() => {
      setIsBusy(false);
      const botMsg: ChatItem = {
        id: `bot-${Date.now()}`,
        name: 'Glacia Assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        outgoing: false,
        text: `Acknowledged: "${userText}". Liquid glass shader kernels recompiled at 120Hz.`,
      };
      setMessages((prev) => [...prev, botMsg]);
      addToast('New response received from Assistant', 'info');
    }, 1200);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text variant="title" style={styles.sectionTitle}>
        AI & Chat Interface
      </Text>
      <Text variant="body" muted style={styles.sectionSubtitle}>
        Conversation transcripts, composers, multi-step plans, waveforms, and generation states.
      </Text>

      {/* Live Working Chat Conversation (Message, MessageBubble, MessageAttachment, NativeAIInput) */}
      <ComponentBox
        name="Message, MessageBubble, MessageAttachment & NativeAIInput"
        description="Live chat thread with incoming flat wash, outgoing glassActive, file attachments, and active composer."
      >
        <View style={styles.chatContainer}>
          {messages.map((item) => (
            <Message
              key={item.id}
              name={item.name}
              time={item.time}
              avatar
              outgoing={item.outgoing}
            >
              <MessageBubble outgoing={item.outgoing}>
                <Text
                  variant="body"
                  style={{ color: item.outgoing ? '#fff' : theme.fill, fontSize: 14 }}
                >
                  {item.text}
                </Text>
              </MessageBubble>

              {item.attachment ? (
                <View style={{ marginTop: 6 }}>
                  <MessageAttachment
                    name={item.attachment.name}
                    size={item.attachment.size}
                    icon={<Ionicons name="document-text-outline" size={16} color={theme.fill} />}
                    onPress={() => addToast(`Opening ${item.attachment?.name}`, 'success')}
                  />
                </View>
              ) : null}
            </Message>
          ))}

          {/* NativeAIInput Composer */}
          <View style={{ marginTop: 14 }}>
            <NativeAIInput
              value={composerText}
              onChangeText={setComposerText}
              onSubmit={handleSendMessage}
              placeholder="Ask Glacia Assistant anything..."
              busy={isBusy}
              sendLabel="Send"
              footer={
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="hardware-chip-outline" size={14} color={theme.muted} />
                  <Text variant="caption" muted>
                    Metal 3.0 Accelerated · iOS 26 UIGlassEffect
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </ComponentBox>

      {/* NativeThinkingOrb */}
      <ComponentBox
        name="NativeThinkingOrb"
        description="Pulsing glass orb indicating model background computation."
      >
        <View style={{ alignItems: 'center', paddingVertical: 12 }}>
          <NativeThinkingOrb label="Synthesizing liquid glass shader bytecode..." size={72} />
        </View>
      </ComponentBox>

      {/* NativeSoundwave */}
      <ComponentBox
        name="NativeSoundwave"
        description="Audio waveform amplitude visualizer driven by live level arrays."
      >
        <NativeSoundwave
          active
          height={48}
          levels={[0.2, 0.45, 0.8, 0.95, 0.7, 0.35, 0.85, 0.5, 0.9, 0.6, 0.25, 0.75, 0.4]}
          color="#007AFF"
          label="Voice Command Ambient Input"
        />
      </ComponentBox>

      {/* NativePlan */}
      <ComponentBox
        name="NativePlan"
        description="Sequential execution steps with pending, running, done, and failed states."
      >
        <NativePlan
          title="Metal Glass Pipeline Setup"
          steps={[
            {
              id: 'p1',
              title: 'Allocate UIGlassEffect backbuffer',
              detail: 'Resolved via @callstack/liquid-glass',
              status: 'done',
            },
            {
              id: 'p2',
              title: 'Compute chromatic aberration blur',
              detail: 'Bilateral filtering pass active',
              status: 'running',
            },
            {
              id: 'p3',
              title: 'Merge specular envelopes in GlassContainer',
              detail: 'Pending intersection evaluation',
              status: 'pending',
            },
          ]}
        />
      </ComponentBox>

      {/* NativeSources */}
      <ComponentBox
        name="NativeSources"
        description="Citations and evidence links behind model answers."
      >
        <NativeSources
          title="Verified Technical Citations"
          sources={[
            {
              id: 's1',
              title: 'Apple Human Interface Guidelines: Liquid Glass Materials',
              url: 'https://developer.apple.com/design/human-interface-guidelines',
              domain: 'developer.apple.com',
              snippet: 'Liquid Glass refracts ambient background content while maintaining high contrast.',
            },
            {
              id: 's2',
              title: 'Callstack Liquid Glass Architecture Specification',
              url: 'https://github.com/callstack/liquid-glass',
              domain: 'github.com',
              snippet: 'TurboModule bridging UIGlassEffect on iOS 26 with zero JS thread overhead.',
            },
          ]}
          onSourcePress={(src) => addToast(`Opening source: ${src.title}`, 'neutral')}
        />
      </ComponentBox>

      {/* NativeResponse */}
      <ComponentBox
        name="NativeResponse"
        description="Progressively revealed stream response with caret indicator."
      >
        <View style={{ gap: 8 }}>
          <NativeResponse
            text="Glacia Native renders real Apple liquid glass on iOS 26+ and smoothly falls back to an identical tinted glass layout on Android."
            revealed={revealedChars}
            streaming={revealedChars < 120}
          />
          <View style={styles.rowBetween}>
            <Text variant="caption" muted>
              Revealed: {revealedChars} characters
            </Text>
            <Pressable onPress={() => setRevealedChars((prev) => (prev >= 120 ? 30 : prev + 30))}>
              <Text
                variant="caption"
                style={{ color: '#007AFF', fontWeight: '700' }}
              >
                Advance Stream
              </Text>
            </Pressable>
          </View>
        </View>
      </ComponentBox>

      {/* NativeTask */}
      <ComponentBox
        name="NativeTask"
        description="Long-running background task status and progress tracker."
      >
        <NativeTask
          task={{
            label: 'Backdrop Shader Optimization',
            detail: 'Compiling 64 Metal compute kernels',
            progress: dataset.progressValue / 100,
            status: 'running',
          }}
        />
      </ComponentBox>

      {/* NativePanelside */}
      <ComponentBox
        name="NativePanelside"
        description="AI workspace side rail for conversation threads and pinned prompts."
      >
        <NativePanelside
          title="Workspace Sessions"
          value={panelVal}
          onValueChange={(val) => {
            setPanelVal(val);
            addToast(`Switched workspace to: ${val}`, 'neutral');
          }}
          items={[
            { id: 'c1', label: 'Flight GL-2601 Manifest', count: 4 },
            { id: 'c2', label: 'Shader Profiler Logs', count: 12 },
            { id: 'c3', label: 'iOS 26 Liquid Glass Specs', count: 2 },
          ]}
        />
      </ComponentBox>

      {/* NativeImageGeneration */}
      <ComponentBox
        name="NativeImageGeneration"
        description="Generated image asset with prompt text, loading placeholder, and progress."
      >
        <NativeImageGeneration
          prompt="Futuristic supersonic aircraft cabin with transparent liquid glass displays at sunset."
          status="done"
          image={{
            url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
            alt: 'Generated Supersonic Aircraft Concept',
            width: 320,
            height: 180,
          }}
        />
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
  chatContainer: {
    width: '100%',
    padding: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
