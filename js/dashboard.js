/* ═══════════════════════════════════════════════
   HMI Dashboard — Animated Gauges & Charts
   Matches Chiller Overwatch design language
═══════════════════════════════════════════════ */

// Clock
function updateClock() {
  const el = document.getElementById('hmiClock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// ── Arc Gauge Renderer ──
function drawGauge(canvasId, value, max, color, bgColor) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 160;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const r = 60;
  const lw = 8;
  const startAngle = 0.75 * Math.PI;
  const endAngle = 2.25 * Math.PI;
  const totalArc = endAngle - startAngle;
  const pct = Math.min(value / max, 1);

  // Background arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = bgColor || 'rgba(255,255,255,0.06)';
  ctx.lineWidth = lw;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Value arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, startAngle + totalArc * pct);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = 'round';
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Tick marks
  const ticks = 20;
  for (let i = 0; i <= ticks; i++) {
    const angle = startAngle + (totalArc * i / ticks);
    const inner = r - 16;
    const outer = r - 12;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.strokeStyle = i <= pct * ticks ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// ── Initialize Gauges ──
function initGauges() {
  drawGauge('gauge1', 82, 100, '#4de8ff', 'rgba(77,232,255,0.08)');
  drawGauge('gauge2', 67, 100, '#4de8ff', 'rgba(77,232,255,0.08)');
  drawGauge('gauge3', 85, 100, '#2edb6f', 'rgba(46,219,111,0.08)');
  drawGauge('gauge4', 78.6, 100, '#ffcc33', 'rgba(255,204,51,0.08)');
}

// ── Generate smooth fake data ──
function genSmoothData(count, base, variance, trend) {
  const data = [];
  let val = base;
  for (let i = 0; i < count; i++) {
    val += (Math.random() - 0.48) * variance + (trend || 0);
    val = Math.max(base - variance * 3, Math.min(base + variance * 3, val));
    data.push(Math.round(val * 10) / 10);
  }
  return data;
}

function genTimeLabels(count) {
  const labels = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now - i * 3600000);
    labels.push(d.getHours().toString().padStart(2, '0') + ':00');
  }
  return labels;
}

// ── Chart.js Common Config ──
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1500, easing: 'easeInOutQuart' },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0e1822',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      titleColor: '#6b8599',
      bodyColor: '#e8f4fc',
      titleFont: { size: 10, weight: '700' },
      bodyFont: { size: 13, weight: '600' },
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
      ticks: { color: '#4a5568', font: { size: 9, weight: '600' }, maxRotation: 0 },
      border: { display: false }
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
      ticks: { color: '#4a5568', font: { size: 9, weight: '600' } },
      border: { display: false }
    }
  }
};

// ── Load Chart ──
function initLoadChart() {
  const el = document.getElementById('loadChart');
  if (!el) return;
  const labels = genTimeLabels(24);
  const data1 = genSmoothData(24, 520, 40, 0.8);
  const data2 = genSmoothData(24, 340, 30, 0.5);

  new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Compressor 1',
          data: data1,
          borderColor: '#4de8ff',
          backgroundColor: 'rgba(77,232,255,0.05)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'Compressor 2',
          data: data2,
          borderColor: '#5ba3ff',
          backgroundColor: 'rgba(91,163,255,0.03)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        ...chartDefaults.scales,
        y: {
          ...chartDefaults.scales.y,
          min: 200,
          max: 700,
          ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + ' T' }
        }
      }
    }
  });
}

// ── Efficiency Chart ──
function initEffChart() {
  const el = document.getElementById('effChart');
  if (!el) return;
  const labels = genTimeLabels(24);
  const data = genSmoothData(24, 0.44, 0.06, -0.002);

  new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'kW/TON',
        data: data,
        borderColor: '#2edb6f',
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, 'rgba(46,219,111,0.12)');
          gradient.addColorStop(1, 'rgba(46,219,111,0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      }]
    },
    options: {
      ...chartDefaults,
      scales: {
        ...chartDefaults.scales,
        y: {
          ...chartDefaults.scales.y,
          min: 0.30,
          max: 0.60,
        }
      }
    }
  });
}

// ── Subtle value jitter for "live" feel ──
function jitterValues() {
  const vals = [
    { id: 'gaugeVal1', base: 82, unit: '%', range: 3 },
    { id: 'gaugeVal2', base: 67, unit: '%', range: 4 },
  ];
  vals.forEach(v => {
    const el = document.getElementById(v.id);
    if (!el) return;
    const jitter = v.base + (Math.random() - 0.5) * v.range;
    el.textContent = Math.round(jitter) + v.unit;
  });
}
setInterval(jitterValues, 3000);

// ── Init on Load ──
document.addEventListener('DOMContentLoaded', () => {
  // Delay init so it looks like data is loading
  setTimeout(() => {
    initGauges();
    initLoadChart();
    initEffChart();
  }, 300);
});
