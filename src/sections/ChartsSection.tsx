import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  NativeAreaChart,
  NativeBarChart,
  NativeBubbleChart,
  NativeBumpChart,
  NativeCandlestickChart,
  NativeFunnelChart,
  NativeHeatmapChart,
  NativeHexChart,
  NativeLineChart,
  NativeLiveLineChart,
  NativeMirrorAreaChart,
  NativePlotChart,
  NativePolarAreaChart,
  NativePyramidChart,
  NativeRadarChart,
  NativeRingChart,
  NativeSankeyChart,
  NativeScatterChart,
  NativeTreemapChart,
  NativeWaterfallChart,
  Text,
} from 'glacia-native';
import { ComponentBox } from '../components/ComponentBox';
import { useApp } from '../context/AppContext';

export function ChartsSection() {
  const { isDark, dataset, addToast } = useApp();
  const screenWidth = Dimensions.get('window').width;
  // Fit comfortably inside 390pt screen with padding
  const chartWidth = Math.min(screenWidth - 60, 320);

  const c = dataset.charts;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text variant="title" style={styles.sectionTitle}>
        Charts & Visualization
      </Text>
      <Text variant="body" muted style={styles.sectionSubtitle}>
        All 20 native vector and layout charts with interactive selection and live dynamic data.
      </Text>

      {/* 1. NativeLineChart */}
      <ComponentBox
        name="1. NativeLineChart"
        description="Multi-series line chart with smooth bezier curves and touch point selection."
      >
        <NativeLineChart
          labels={c.line.labels}
          series={c.line.series}
          width={chartWidth}
          height={180}
          smooth
          showDots
          onPointPress={(idx) => addToast(`Line point ${c.line.labels[idx]} selected`, 'neutral')}
        />
      </ComponentBox>

      {/* 2. NativeBarChart */}
      <ComponentBox
        name="2. NativeBarChart"
        description="Grouped or stacked bars with rounded caps and bar press handlers."
      >
        <NativeBarChart
          labels={c.bar.labels}
          series={c.bar.series}
          width={chartWidth}
          height={180}
          radius={4}
          onBarPress={(idx) => addToast(`Bar ${c.bar.labels[idx]} selected`, 'neutral')}
        />
      </ComponentBox>

      {/* 3. NativeRingChart */}
      <ComponentBox
        name="3. NativeRingChart"
        description="Proportional slices as a ring with inner hole and legend readout."
      >
        <View style={{ alignItems: 'center' }}>
          <NativeRingChart
            data={c.ring}
            size={Math.min(chartWidth, 230)}
            thickness={26}
            showLegend
            onSlicePress={(idx) => addToast(`Ring slice: ${c.ring[idx]?.label}`, 'neutral')}
          />
        </View>
      </ComponentBox>

      {/* 4. NativeAreaChart */}
      <ComponentBox
        name="4. NativeAreaChart"
        description="Continuous series with shaded gradient area fill beneath the curve."
      >
        <NativeAreaChart
          labels={c.area.labels}
          series={c.area.series}
          width={chartWidth}
          height={180}
          smooth
          onPointPress={(idx) => addToast(`Area point ${c.area.labels[idx]} tapped`, 'neutral')}
        />
      </ComponentBox>

      {/* 5. NativeMirrorAreaChart */}
      <ComponentBox
        name="5. NativeMirrorAreaChart"
        description="Two series mirrored across a shared center zero axis on an honest scale."
      >
        <NativeMirrorAreaChart
          labels={c.mirrorArea.labels}
          series={c.mirrorArea.series}
          width={chartWidth}
          height={180}
          aboveColor="#007AFF"
          belowColor="#FF9500"
        />
      </ComponentBox>

      {/* 6. NativeScatterChart */}
      <ComponentBox
        name="6. NativeScatterChart"
        description="Two continuous numeric axes with discrete coordinate marks."
      >
        <NativeScatterChart
          series={c.scatter}
          width={chartWidth}
          height={180}
          radius={5}
          onPointPress={(sIdx, pIdx) =>
            addToast(`Scatter point: ${c.scatter[sIdx]?.points[pIdx]?.label}`, 'neutral')
          }
        />
      </ComponentBox>

      {/* 7. NativeBubbleChart */}
      <ComponentBox
        name="7. NativeBubbleChart"
        description="Scatter marks sized by a third magnitude value."
      >
        <NativeBubbleChart
          series={c.bubble}
          width={chartWidth}
          height={180}
          onPointPress={(sIdx, pIdx) =>
            addToast(`Bubble: ${c.bubble[sIdx]?.points[pIdx]?.label}`, 'neutral')
          }
        />
      </ComponentBox>

      {/* 8. NativeFunnelChart */}
      <ComponentBox
        name="8. NativeFunnelChart"
        description="Proportional conversion stages displaying dropoff and step efficiency."
      >
        <NativeFunnelChart
          stages={c.funnel}
          width={chartWidth}
          stageHeight={32}
          onStagePress={(idx) => addToast(`Funnel stage: ${c.funnel[idx]?.label}`, 'neutral')}
        />
      </ComponentBox>

      {/* 9. NativeHeatmapChart */}
      <ComponentBox
        name="9. NativeHeatmapChart"
        description="Two-dimensional grid where color gradient encodes value intensity."
      >
        <View style={{ alignItems: 'center' }}>
          <NativeHeatmapChart
            columns={c.heatmap.columns}
            rows={c.heatmap.rows}
            cellSize={34}
            cellGap={4}
            minColor="#007AFF20"
            maxColor="#007AFF"
            onCellPress={(r, col) =>
              addToast(
                `Heatmap [${c.heatmap.rows[r]?.label}, ${c.heatmap.columns[col]}]: ${c.heatmap.rows[r]?.values[col]}`,
                'neutral',
              )
            }
          />
        </View>
      </ComponentBox>

      {/* 10. NativeRadarChart */}
      <ComponentBox
        name="10. NativeRadarChart"
        description="Multi-axis radial polygon comparison with interactive touch targets."
      >
        <View style={{ alignItems: 'center' }}>
          <NativeRadarChart
            axes={c.radar.axes}
            series={c.radar.series}
            size={Math.min(chartWidth, 240)}
            rings={4}
            onAxisPress={(idx) => addToast(`Radar axis: ${c.radar.axes[idx]}`, 'neutral')}
          />
        </View>
      </ComponentBox>

      {/* 11. NativeWaterfallChart */}
      <ComponentBox
        name="11. NativeWaterfallChart"
        description="Sequential step changes bridging an opening and closing balance."
      >
        <NativeWaterfallChart
          steps={c.waterfall}
          width={chartWidth}
          height={180}
          onStepPress={(idx) => addToast(`Waterfall: ${c.waterfall[idx]?.label}`, 'neutral')}
        />
      </ComponentBox>

      {/* 12. NativePolarAreaChart */}
      <ComponentBox
        name="12. NativePolarAreaChart"
        description="Equal-angle wedges whose variable radius encodes magnitude."
      >
        <View style={{ alignItems: 'center' }}>
          <NativePolarAreaChart
            segments={c.polarArea}
            size={Math.min(chartWidth, 230)}
            onSegmentPress={(idx) => addToast(`Polar segment: ${c.polarArea[idx]?.label}`, 'neutral')}
          />
        </View>
      </ComponentBox>

      {/* 13. NativePyramidChart */}
      <ComponentBox
        name="13. NativePyramidChart"
        description="Stacked hierarchical horizontal bands narrowing toward the apex."
      >
        <NativePyramidChart
          levels={c.pyramid}
          width={chartWidth}
          levelHeight={32}
          onLevelPress={(idx) => addToast(`Pyramid: ${c.pyramid[idx]?.label}`, 'neutral')}
        />
      </ComponentBox>

      {/* 14. NativeLiveLineChart */}
      <ComponentBox
        name="14. NativeLiveLineChart"
        description="Fixed sliding window line chart keeping only the most recent data points."
      >
        <NativeLiveLineChart
          labels={c.liveLine.labels}
          series={c.liveLine.series}
          width={chartWidth}
          height={170}
        />
      </ComponentBox>

      {/* 15. NativeCandlestickChart */}
      <ComponentBox
        name="15. NativeCandlestickChart"
        description="Open, high, low, and close prices for each trading period."
      >
        <NativeCandlestickChart
          candles={c.candlestick}
          width={chartWidth}
          height={180}
          onCandlePress={(idx) => addToast(`Candle ${c.candlestick[idx]?.label} tapped`, 'neutral')}
        />
      </ComponentBox>

      {/* 16. NativeTreemapChart */}
      <ComponentBox
        name="16. NativeTreemapChart"
        description="Proportional nested rectangles for part-to-whole categorical comparison."
      >
        <NativeTreemapChart
          items={c.treemap}
          width={chartWidth}
          height={180}
          onItemPress={(idx) => addToast(`Treemap: ${c.treemap[idx]?.label}`, 'neutral')}
        />
      </ComponentBox>

      {/* 17. NativeSankeyChart */}
      <ComponentBox
        name="17. NativeSankeyChart"
        description="Flow between stages drawn as connected columns joined by proportional bands."
      >
        <NativeSankeyChart
          nodes={c.sankey.nodes}
          links={c.sankey.links}
          width={chartWidth}
          height={180}
        />
      </ComponentBox>

      {/* 18. NativeBumpChart */}
      <ComponentBox
        name="18. NativeBumpChart"
        description="Rank changes over chronological periods with vertical position reflecting rank."
      >
        <NativeBumpChart
          labels={c.bump.labels}
          series={c.bump.series}
          width={chartWidth}
          height={180}
          onPointPress={(s, p) =>
            addToast(`Bump: ${c.bump.series[s]?.name} rank in ${c.bump.labels[p]}`, 'neutral')
          }
        />
      </ComponentBox>

      {/* 19. NativeHexChart */}
      <ComponentBox
        name="19. NativeHexChart"
        description="Thousands of coordinate points aggregated into density-binned hexagonal cells."
      >
        <NativeHexChart
          points={c.hex}
          radius={12}
          width={chartWidth}
          height={180}
          onBinPress={(idx) => addToast(`Hex bin #${idx} tapped`, 'neutral')}
        />
      </ComponentBox>

      {/* 20. NativePlotChart */}
      <ComponentBox
        name="20. NativePlotChart"
        description="Numeric plot with real pixel scales and customizable mark rendering."
      >
        <NativePlotChart
          points={c.plot}
          width={chartWidth}
          height={180}
          xLabel="X Scale (Units)"
          yLabel="Y Scale (Value)"
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
});
