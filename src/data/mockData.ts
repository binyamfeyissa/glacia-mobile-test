export interface AppDataset {
  name: string;
  badgeCount: number;
  progressValue: number;
  progressRingValue: number;
  sliderValue: number;
  stepperValue: number;
  switchChecked: boolean;
  segmentedIndex: number;
  buttonLabel: string;
  ratingValue: number;
  inputText: string;
  textareaText: string;
  searchQuery: string;
  selectedColor: string;
  otpCode: string;
  comboboxValue: string;
  selectValue: string;
  radioValue: string;
  boardingPass: {
    passenger: string;
    flight: string;
    from: string;
    to: string;
    gate: string;
    seat: string;
    time: string;
    classType: string;
  };
  tableRows: Array<{
    id: string;
    cells: Record<string, string>;
  }>;
  listItems: Array<{
    id: string;
    title: string;
    description: string;
    trailingText?: string;
  }>;
  banner: {
    title: string;
    message: string;
    tone: 'info' | 'success' | 'warning' | 'error';
  };
  toastMessage: string;
  aiChat: {
    assistantMessage: string;
    attachmentName: string;
    attachmentSize: string;
    userMessage: string;
    followUp: string;
  };
  charts: {
    line: {
      labels: string[];
      series: Array<{ name: string; values: number[]; color?: string }>;
    };
    bar: {
      labels: string[];
      series: Array<{ name: string; values: number[]; color?: string }>;
    };
    ring: Array<{ label: string; value: number; color?: string }>;
    area: {
      labels: string[];
      series: Array<{ name: string; values: number[]; color?: string }>;
    };
    mirrorArea: {
      labels: string[];
      series: { name: string; above: number[]; below: number[] };
    };
    scatter: Array<{
      name: string;
      points: Array<{ x: number; y: number; label?: string }>;
    }>;
    bubble: Array<{
      name: string;
      points: Array<{ x: number; y: number; size: number; label?: string }>;
    }>;
    funnel: Array<{ label: string; value: number; color?: string }>;
    heatmap: {
      columns: string[];
      rows: Array<{ label: string; values: number[] }>;
    };
    radar: {
      axes: string[];
      series: Array<{ name: string; values: number[]; color?: string }>;
    };
    waterfall: Array<{ label: string; value: number; isTotal?: boolean }>;
    polarArea: Array<{ label: string; value: number; color?: string }>;
    pyramid: Array<{ label: string; value: number; color?: string }>;
    liveLine: {
      labels: string[];
      series: Array<{ name: string; values: number[] }>;
    };
    candlestick: Array<{
      label: string;
      open: number;
      high: number;
      low: number;
      close: number;
    }>;
    treemap: Array<{ label: string; value: number; color?: string }>;
    sankey: {
      nodes: Array<{ id: string; label: string }>;
      links: Array<{ from: string; to: string; value: number }>;
    };
    bump: {
      labels: string[];
      series: Array<{ name: string; ranks: number[]; color?: string }>;
    };
    hex: Array<{ x: number; y: number; value: number; label?: string }>;
    plot: Array<{ x: number; y: number; label?: string }>;
  };
}

export const DATASET_A: AppDataset = {
  name: 'Dataset Alpha (Air & Transit)',
  badgeCount: 3,
  progressValue: 38,
  progressRingValue: 62,
  sliderValue: 40,
  stepperValue: 2,
  switchChecked: true,
  segmentedIndex: 0,
  buttonLabel: 'Confirm Flight Booking',
  ratingValue: 4.5,
  inputText: 'alex.morgan@glacia.design',
  textareaText: 'Testing liquid glass refraction with dynamic HDR specular highlights on iOS 26.',
  searchQuery: 'Flight GL-2601',
  selectedColor: '#007AFF',
  otpCode: '2601',
  comboboxValue: 'jfk',
  selectValue: 'first',
  radioValue: 'applepay',
  boardingPass: {
    passenger: 'Alex Morgan',
    flight: 'GL-2601',
    from: 'JFK (New York)',
    to: 'LHR (London Heathrow)',
    gate: 'B22',
    seat: '02A',
    time: '18:45 EDT',
    classType: 'Liquid First Class',
  },
  tableRows: [
    { id: '1', cells: { flight: 'GL-101', route: 'JFK → LHR', status: 'On Time', gate: 'B22', fare: '$850' } },
    { id: '2', cells: { flight: 'GL-204', route: 'SFO → HND', status: 'Boarding', gate: 'A14', fare: '$1,240' } },
    { id: '3', cells: { flight: 'GL-309', route: 'LAX → CDG', status: 'Delayed', gate: 'C08', fare: '$910' } },
  ],
  listItems: [
    { id: '1', title: 'Priority Boarding Pass', description: 'Seat 02A · Fast Track Security', trailingText: 'Issued' },
    { id: '2', title: 'Checked Baggage (2 pcs)', description: 'Tagged for GL-2601 direct transfer', trailingText: 'Loaded' },
    { id: '3', title: 'In-Flight Lounge Access', description: 'Terminal 4 Virgin Clubroom reservation', trailingText: 'Active' },
  ],
  banner: {
    title: 'Boarding Gate Announced',
    message: 'Flight GL-2601 is now boarding passengers in Groups 1 and 2 at Gate B22.',
    tone: 'info',
  },
  toastMessage: 'Flight reservation GL-2601 successfully updated!',
  aiChat: {
    assistantMessage: 'Hello Alex! I pulled your flight manifest GL-2601. In-flight Liquid Glass entertainment is configured.',
    attachmentName: 'e-ticket_gl2601_first.pdf',
    attachmentSize: '1.4 MB',
    userMessage: 'Can you show me the route weather and gate status for London?',
    followUp: 'Surface winds 12 kts at Heathrow, clear skies. Gate B22 on track for on-time departure.',
  },
  charts: {
    line: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        { name: 'Transatlantic', values: [32, 48, 64, 82, 75, 96], color: '#007AFF' },
        { name: 'Transpacific', values: [20, 35, 42, 60, 68, 79], color: '#34C759' },
      ],
    },
    bar: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [
        { name: 'Passengers (k)', values: [12, 19, 15, 22, 28], color: '#007AFF' },
        { name: 'Cargo (t)', values: [8, 11, 14, 10, 18], color: '#5856D6' },
      ],
    },
    ring: [
      { label: 'First Class', value: 45, color: '#007AFF' },
      { label: 'Business', value: 35, color: '#5856D6' },
      { label: 'Premium', value: 20, color: '#34C759' },
    ],
    area: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      series: [
        { name: 'Altitude (k ft)', values: [0, 34, 38, 41, 36, 0], color: '#007AFF' },
      ],
    },
    mirrorArea: {
      labels: ['08:00', '10:00', '12:00', '14:00', '16:00'],
      series: {
        name: 'Climb vs Descent',
        above: [15, 28, 45, 32, 12],
        below: [5, 10, 22, 35, 18],
      },
    },
    scatter: [
      {
        name: 'Airports',
        points: [
          { x: 15, y: 25, label: 'JFK' },
          { x: 35, y: 55, label: 'LHR' },
          { x: 60, y: 75, label: 'HND' },
          { x: 80, y: 40, label: 'CDG' },
          { x: 92, y: 88, label: 'DXB' },
        ],
      },
    ],
    bubble: [
      {
        name: 'Traffic Hubs',
        points: [
          { x: 20, y: 35, size: 14, label: 'JFK' },
          { x: 45, y: 70, size: 26, label: 'LHR' },
          { x: 68, y: 45, size: 18, label: 'CDG' },
          { x: 85, y: 80, size: 22, label: 'DXB' },
        ],
      },
    ],
    funnel: [
      { label: 'Search Routes', value: 12000, color: '#007AFF' },
      { label: 'Select Flight', value: 5800, color: '#5856D6' },
      { label: 'Seat Selection', value: 3400, color: '#AF52DE' },
      { label: 'Confirmed Ticket', value: 1650, color: '#34C759' },
    ],
    heatmap: {
      columns: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      rows: [
        { label: 'Morning', values: [20, 60, 85, 40, 90] },
        { label: 'Midday', values: [45, 75, 95, 60, 80] },
        { label: 'Evening', values: [70, 90, 80, 85, 100] },
      ],
    },
    radar: {
      axes: ['Range', 'Speed', 'Capacity', 'Comfort', 'Efficiency'],
      series: [
        { name: 'Boeing 787-9', values: [92, 88, 80, 95, 90], color: '#007AFF' },
        { name: 'Airbus A350', values: [95, 86, 85, 92, 94], color: '#34C759' },
      ],
    },
    waterfall: [
      { label: 'Base Fare', value: 650, isTotal: true },
      { label: 'Taxes', value: 120 },
      { label: 'Discount', value: -70 },
      { label: 'Luggage', value: 50 },
      { label: 'Final Total', value: 750, isTotal: true },
    ],
    polarArea: [
      { label: 'Europe', value: 85, color: '#007AFF' },
      { label: 'Asia', value: 65, color: '#5856D6' },
      { label: 'Americas', value: 92, color: '#34C759' },
      { label: 'Oceania', value: 40, color: '#FF9500' },
    ],
    pyramid: [
      { label: 'First Class (8)', value: 8, color: '#FF9500' },
      { label: 'Business (32)', value: 32, color: '#5856D6' },
      { label: 'Premium Economy (48)', value: 48, color: '#007AFF' },
      { label: 'Main Cabin (180)', value: 180, color: '#34C759' },
    ],
    liveLine: {
      labels: ['-4m', '-3m', '-2m', '-1m', 'Now'],
      series: [{ name: 'Ground Speed (kts)', values: [480, 505, 520, 515, 530] }],
    },
    candlestick: [
      { label: '09:00', open: 120, high: 135, low: 118, close: 132 },
      { label: '10:00', open: 132, high: 140, low: 128, close: 129 },
      { label: '11:00', open: 129, high: 145, low: 126, close: 142 },
      { label: '12:00', open: 142, high: 148, low: 139, close: 146 },
    ],
    treemap: [
      { label: 'Atlantic', value: 42, color: '#007AFF' },
      { label: 'Pacific', value: 31, color: '#34C759' },
      { label: 'Domestic', value: 25, color: '#5856D6' },
      { label: 'Regional', value: 12, color: '#FF9500' },
    ],
    sankey: {
      nodes: [
        { id: 'origin', label: 'JFK Check-in' },
        { id: 'security', label: 'TSA PreCheck' },
        { id: 'lounge', label: 'VIP Lounge' },
        { id: 'gate', label: 'Gate B22' },
      ],
      links: [
        { from: 'origin', to: 'security', value: 100 },
        { from: 'security', to: 'lounge', value: 40 },
        { from: 'security', to: 'gate', value: 60 },
        { from: 'lounge', to: 'gate', value: 40 },
      ],
    },
    bump: {
      labels: ['2023', '2024', '2025', '2026'],
      series: [
        { name: 'Liquid Air', ranks: [3, 2, 1, 1], color: '#007AFF' },
        { name: 'Skyway', ranks: [1, 1, 2, 2], color: '#FF9500' },
        { name: 'AeroJet', ranks: [2, 3, 3, 3], color: '#34C759' },
      ],
    },
    hex: [
      { x: 25, y: 30, value: 30 },
      { x: 45, y: 55, value: 85 },
      { x: 75, y: 80, value: 50 },
      { x: 90, y: 40, value: 95 },
      { x: 55, y: 90, value: 25 },
      { x: 80, y: 25, value: 70 },
    ],
    plot: [
      { x: 10, y: 22, label: 'Pt 1' },
      { x: 24, y: 48, label: 'Pt 2' },
      { x: 38, y: 35, label: 'Pt 3' },
      { x: 55, y: 72, label: 'Pt 4' },
      { x: 75, y: 60, label: 'Pt 5' },
    ],
  },
};

export const DATASET_B: AppDataset = {
  name: 'Dataset Beta (Quantum Cloud Telemetry)',
  badgeCount: 14,
  progressValue: 84,
  progressRingValue: 94,
  sliderValue: 80,
  stepperValue: 6,
  switchChecked: false,
  segmentedIndex: 2,
  buttonLabel: 'Deploy Cluster Update',
  ratingValue: 3.0,
  inputText: 'evelyn.reed@liquidglass.ai',
  textareaText: 'Compiling Metal compute kernels for real-time backdrop blur and optical distortion pass.',
  searchQuery: 'Node Cluster Alpha-9',
  selectedColor: '#FF2D55',
  otpCode: '8842',
  comboboxValue: 'sfo',
  selectValue: 'business',
  radioValue: 'credit',
  boardingPass: {
    passenger: 'Dr. Evelyn Reed',
    flight: 'GL-9482',
    from: 'SFO (San Francisco)',
    to: 'HND (Tokyo Haneda)',
    gate: 'E09',
    seat: '01F',
    time: '23:15 PST',
    classType: 'Quantum Suite',
  },
  tableRows: [
    { id: '1', cells: { flight: 'NODE-01', route: 'us-west-1', status: 'Optimal', gate: 'Core 16', fare: '1.2ms' } },
    { id: '2', cells: { flight: 'NODE-02', route: 'eu-central', status: 'Syncing', gate: 'Core 32', fare: '4.8ms' } },
    { id: '3', cells: { flight: 'NODE-03', route: 'ap-east-1', status: 'Standby', gate: 'Core 64', fare: '0.9ms' } },
  ],
  listItems: [
    { id: '1', title: 'Neural Engine Acceleration', description: 'CoreML 26 Liquid pipeline attached', trailingText: '99.9%' },
    { id: '2', title: 'Vulkan Fallback Shaders', description: 'Android SPIR-V compatibility layer active', trailingText: 'Ready' },
    { id: '3', title: 'Memory Footprint Budget', description: '12.4 MB shared VRAM across 4 surfaces', trailingText: 'Optimal' },
  ],
  banner: {
    title: 'Cluster Telemetry Synced',
    message: 'All 64 compute threads reported zero frame drops across 120Hz display transitions.',
    tone: 'success',
  },
  toastMessage: 'Cluster settings updated: Shader compilation completed.',
  aiChat: {
    assistantMessage: 'Evelyn, shader profiler indicates zero GPU pipeline stall on iOS 26 UIGlassEffect.',
    attachmentName: 'metal_perf_trace_051.trace',
    attachmentSize: '7.8 MB',
    userMessage: 'Did we observe any layout shift when running inside GlassContainer?',
    followUp: 'Zero layout shift. GlassContainer seamlessly combined the TabBar and FAB specular envelopes.',
  },
  charts: {
    line: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
      series: [
        { name: 'Compute FLOPS', values: [88, 76, 92, 65, 84, 98], color: '#FF2D55' },
        { name: 'Memory Bandwidth', values: [45, 62, 78, 85, 90, 94], color: '#FF9500' },
      ],
    },
    bar: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [
        { name: 'GPU Render (ms)', values: [6, 4, 8, 3, 5], color: '#FF2D55' },
        { name: 'CPU Layout (ms)', values: [14, 11, 9, 13, 8], color: '#AF52DE' },
      ],
    },
    ring: [
      { label: 'Compute', value: 65, color: '#FF2D55' },
      { label: 'Bandwidth', value: 20, color: '#FF9500' },
      { label: 'Overhead', value: 15, color: '#AF52DE' },
    ],
    area: {
      labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
      series: [
        { name: 'Frame Rate (FPS)', values: [118, 120, 119, 120, 117, 120], color: '#34C759' },
      ],
    },
    mirrorArea: {
      labels: ['10m', '20m', '30m', '40m', '50m'],
      series: {
        name: 'Ingress vs Egress',
        above: [48, 62, 75, 54, 88],
        below: [22, 35, 48, 30, 42],
      },
    },
    scatter: [
      {
        name: 'Nodes',
        points: [
          { x: 22, y: 84, label: 'us-w1' },
          { x: 42, y: 62, label: 'us-e2' },
          { x: 58, y: 40, label: 'eu-c1' },
          { x: 74, y: 22, label: 'ap-s1' },
          { x: 88, y: 15, label: 'sa-e1' },
        ],
      },
    ],
    bubble: [
      {
        name: 'Load Clusters',
        points: [
          { x: 25, y: 78, size: 24, label: 'Node Alpha' },
          { x: 48, y: 42, size: 12, label: 'Node Beta' },
          { x: 72, y: 65, size: 18, label: 'Node Gamma' },
          { x: 90, y: 30, size: 30, label: 'Node Delta' },
        ],
      },
    ],
    funnel: [
      { label: 'Raw Packets', value: 28000, color: '#FF2D55' },
      { label: 'Decoded Frames', value: 19400, color: '#FF9500' },
      { label: 'Geometry Pass', value: 14200, color: '#AF52DE' },
      { label: 'Rasterized Output', value: 9800, color: '#34C759' },
    ],
    heatmap: {
      columns: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      rows: [
        { label: 'GPU Core 1', values: [95, 80, 40, 75, 60] },
        { label: 'GPU Core 2', values: [60, 85, 90, 70, 95] },
        { label: 'GPU Core 3', values: [80, 65, 55, 90, 85] },
      ],
    },
    radar: {
      axes: ['Throughput', 'Low-Jitter', 'Low-Power', 'Fault-Tol', 'Fast-Boot'],
      series: [
        { name: 'Vulkan Target', values: [88, 82, 85, 90, 78], color: '#FF2D55' },
        { name: 'Metal Target', values: [96, 94, 91, 95, 92], color: '#34C759' },
      ],
    },
    waterfall: [
      { label: 'Initial VRAM', value: 200, isTotal: true },
      { label: 'Textures', value: 140 },
      { label: 'Garbage Collect', value: -85 },
      { label: 'Buffers', value: 65 },
      { label: 'Active Allocated', value: 320, isTotal: true },
    ],
    polarArea: [
      { label: 'Metal 3', value: 95, color: '#FF2D55' },
      { label: 'Vulkan 1.3', value: 78, color: '#FF9500' },
      { label: 'DirectX 12', value: 50, color: '#AF52DE' },
      { label: 'WebGL 2', value: 62, color: '#34C759' },
    ],
    pyramid: [
      { label: 'L1 Cache (64 KB)', value: 12, color: '#FF2D55' },
      { label: 'L2 Cache (512 KB)', value: 36, color: '#FF9500' },
      { label: 'L3 Cache (8 MB)', value: 72, color: '#AF52DE' },
      { label: 'System RAM (32 GB)', value: 190, color: '#34C759' },
    ],
    liveLine: {
      labels: ['-4s', '-3s', '-2s', '-1s', 'Now'],
      series: [{ name: 'VRAM Allocation (MB)', values: [180, 210, 195, 230, 215] }],
    },
    candlestick: [
      { label: 'T1', open: 210, high: 224, low: 205, close: 208 },
      { label: 'T2', open: 208, high: 216, low: 202, close: 214 },
      { label: 'T3', open: 214, high: 228, low: 210, close: 226 },
      { label: 'T4', open: 226, high: 232, low: 222, close: 225 },
    ],
    treemap: [
      { label: 'Glass View Shaders', value: 58, color: '#FF2D55' },
      { label: 'Chart SVG Vectors', value: 44, color: '#FF9500' },
      { label: 'Overlay Spring Anim', value: 32, color: '#AF52DE' },
      { label: 'Form Controls', value: 20, color: '#34C759' },
    ],
    sankey: {
      nodes: [
        { id: 'src', label: 'Telemetry Source' },
        { id: 'proc', label: 'Aggregation Node' },
        { id: 'db', label: 'Distributed Cache' },
        { id: 'ui', label: 'Glacia Native UI' },
      ],
      links: [
        { from: 'src', to: 'proc', value: 140 },
        { from: 'proc', to: 'db', value: 90 },
        { from: 'proc', to: 'ui', value: 50 },
        { from: 'db', to: 'ui', value: 90 },
      ],
    },
    bump: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        { name: 'Engine v0.5', ranks: [2, 1, 1, 1], color: '#FF2D55' },
        { name: 'Engine v0.4', ranks: [1, 2, 2, 2], color: '#FF9500' },
        { name: 'Legacy Kit', ranks: [3, 3, 3, 3], color: '#AF52DE' },
      ],
    },
    hex: [
      { x: 20, y: 70, value: 85 },
      { x: 35, y: 35, value: 45 },
      { x: 60, y: 55, value: 95 },
      { x: 80, y: 85, value: 35 },
      { x: 50, y: 25, value: 80 },
      { x: 75, y: 70, value: 55 },
    ],
    plot: [
      { x: 10, y: 75, label: 'Nd 1' },
      { x: 22, y: 60, label: 'Nd 2' },
      { x: 40, y: 85, label: 'Nd 3' },
      { x: 60, y: 35, label: 'Nd 4' },
      { x: 80, y: 15, label: 'Nd 5' },
    ],
  },
};
