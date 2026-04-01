/* ═══════════════════════════════════════════════
   TurboCor Spare Parts Catalog — Data
   Source: Turbocor Spare Parts Manual Rev F5
═══════════════════════════════════════════════ */

const PARTS_CATALOG = [
  { id:"SP-0001", partNo:"100186-1", desc:"Kit - Strainer (Qty 3)", category:"Cooling System", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0002", partNo:"100215", desc:"Cooling Fitting Assembly", category:"Cooling System", models:["TTS300"], rev:"-N, -P, -C, -D" },
  { id:"SP-0003", partNo:"100324-2", desc:"Kit - End Cap Assembly", category:"Housing", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520"], rev:"All" },
  { id:"SP-0004", partNo:"100352", desc:"Kit - O-Ring End Cap Assembly", category:"Housing", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520"], rev:"All" },
  { id:"SP-0005", partNo:"100703-3", desc:"Kit - Interstage Pipe", category:"Housing", models:["TTH375","TGH285"], rev:"-F, -H" },
  { id:"SP-0006", partNo:"100037-1", desc:"Pressure/Temperature Sensor (Interstage)", category:"Sensors", models:["TTH375","TGH285"], rev:"-F, -H" },
  { id:"SP-0007", partNo:"100555", desc:"Kit - O-Ring Suction Port", category:"Housing", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0008", partNo:"100050-19", desc:"IGV Drive Assembly & O-Ring - TTH/TGH", category:"IGV", models:["TTH375","TGH285"], rev:"-F, -H" },
  { id:"SP-0009", partNo:"100223", desc:"Kit - IGV Housing", category:"IGV", models:["TTS300","TTS350","TTS400","TGS230","TGS310","TGS390"], rev:"All" },
  { id:"SP-0010", partNo:"100223-5", desc:"Kit - IGV Housing (TTH/TGH)", category:"IGV", models:["TTH375","TGH285"], rev:"All" },
  { id:"SP-0011", partNo:"100051-1", desc:"Kit - O-Ring IGV Assembly", category:"IGV", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0012", partNo:"100261", desc:"Kit - IGV Throat (TGS490)", category:"IGV", models:["TGS490"], rev:"-F, -H" },
  { id:"SP-0013", partNo:"100035-1", desc:"Kit - IGV Motor Service", category:"IGV", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520"], rev:"All" },
  { id:"SP-0014", partNo:"100035-2", desc:"Kit - IGV Motor Service (TTH/TGH)", category:"IGV", models:["TTH375","TGH285"], rev:"All" },
  { id:"SP-0015", partNo:"100310-2", desc:"Kit - O-Ring Inverter Assembly (Small)", category:"Inverter", models:["TTS300","TGS230"], rev:"All" },
  { id:"SP-0016", partNo:"100043-11", desc:"Kit - Inverter Assembly 613", category:"Inverter", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-P, -A, -C, -E, -F, -H" },
  { id:"SP-0017", partNo:"100310-1", desc:"Kit - O-Ring Inverter Assembly", category:"Inverter", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0018", partNo:"100518", desc:"Kit - IGBT 613 Driver Board", category:"Power Electronics", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-P, -A, -C, -E, -F, -H" },
  { id:"SP-0019", partNo:"100313", desc:"Motor Bus Bar Connection (Small Frame)", category:"Power Electronics", models:["TTS300","TGS230"], rev:"-N, -P, -C, -D, -E, -F" },
  { id:"SP-0020", partNo:"100313-1", desc:"Motor Bus Bar Connection (Large Frame)", category:"Power Electronics", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-P, -A, -C, -E, -F, -H" },
  { id:"SP-0021", partNo:"100314-2", desc:"Kit - Cover Plate Assembly", category:"Housing", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0022", partNo:"100315-1", desc:"Kit - O-Ring Top Plate Assembly", category:"Housing", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0023", partNo:"100383", desc:"Hermetic Feedthrough High Power", category:"Power Electronics", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0024", partNo:"100020-19", desc:"Soft Start Upgrade Kit (Small Frame)", category:"Soft Start", models:["TTS300","TGS230"], rev:"-N, -P, -C, -D, -E, -F" },
  { id:"SP-0025", partNo:"100020-20", desc:"Soft Start Upgrade Kit (Large Frame)", category:"Soft Start", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-P, -A, -C, -E" },
  { id:"SP-0026", partNo:"100317-1", desc:"Kit - Fuses (FIE) Soft Start", category:"Soft Start", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-N, -P, -A, -C, -D, -E, -F, -G" },
  { id:"SP-0027", partNo:"100317-2", desc:"Kit - Fuses (FIE) Soft Start Rev 2", category:"Soft Start", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-F, -G" },
  { id:"SP-0028", partNo:"100421", desc:"Kit - Fuse 2A 1000V HVA 3\" (F1)", category:"Soft Start", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520"], rev:"-N, -P, -A, -C, -D, -E" },
  { id:"SP-0029", partNo:"100037-1", desc:"Pressure/Temperature Sensor (Discharge)", category:"Sensors", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0030", partNo:"100047-1", desc:"Kit - Diode Rectifiers (Qty 2, Small)", category:"Power Electronics", models:["TTS300","TGS230"], rev:"-N, -P, -C, -D, -E, -F, -G, -H" },
  { id:"SP-0031", partNo:"100047-2", desc:"Kit - Diode Rectifier (Qty 1)", category:"Power Electronics", models:["TTS350","TTS500","TTS700","TGS310","TGS490","TGS520","TTH375","TGH285"], rev:"-P, -A, -C, -E, -F" },
  { id:"SP-0032", partNo:"100047-3", desc:"Kit - Diode Rectifiers (Qty 2, Rev H)", category:"Power Electronics", models:["TTS350","TTS500","TTS700","TGS310","TGS490","TGS520","TTH375","TGH285"], rev:"-H" },
  { id:"SP-0033", partNo:"100316", desc:"Kit - Bus Bar Diode", category:"Power Electronics", models:["TTS300","TGS230"], rev:"All" },
  { id:"SP-0034", partNo:"100309-13", desc:"Manifold SCR Assembly (Small Frame)", category:"Cooling System", models:["TTS300","TGS230"], rev:"-P, -A, -C, -E, -F" },
  { id:"SP-0035", partNo:"100309-11", desc:"Manifold SCR Assembly (Large Frame)", category:"Cooling System", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0036", partNo:"100044-6", desc:"Capacitors 9000\u00B5F", category:"Power Electronics", models:["TTS300","TGS230"], rev:"-N, -P, -C, -D, -E, -F, -G, -H" },
  { id:"SP-0037", partNo:"100044-11", desc:"Capacitors 11000\u00B5F", category:"Power Electronics", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-P, -A, -C, -E, -F" },
  { id:"SP-0038", partNo:"100044-14", desc:"Capacitors 11000\u00B5F (Rev H)", category:"Power Electronics", models:["TTS350","TTS400","TTS500","TTS700","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-H" },
  { id:"SP-0039", partNo:"100292", desc:"Kit - Serial Driver Module", category:"Controls", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0040", partNo:"100061", desc:"Motor Drive Cable Harness (Inverter to Backplane)", category:"Electrical", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0041", partNo:"100034", desc:"Temperature Sensor (Cavity/Motor Rotor)", category:"Sensors", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"-N, -P, -A, -C, -D" },
  { id:"SP-0042", partNo:"100034-1", desc:"Temperature Sensor (Large Frame)", category:"Sensors", models:["TTS500","TTS700","TGS520"], rev:"-A" },
  { id:"SP-0043", partNo:"100150-6", desc:"Cooling Valve 575V", category:"Cooling System", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0044", partNo:"100377", desc:"Kit - Inverter Tester", category:"Service Tools", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0045", partNo:"100066", desc:"Kit - Compressor Mounting", category:"Housing", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0046", partNo:"100147", desc:"Kit - End Cap Insulation", category:"Housing", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0047", partNo:"901666", desc:"Kit - EMI Filter (CE) 185A", category:"Electrical", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0048", partNo:"901832", desc:"Kit - Line Reactor 240A 5%", category:"Electrical", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0049", partNo:"901974", desc:"Kit - Line Reactor 140A 5%", category:"Electrical", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0050", partNo:"901975", desc:"Kit - Line Reactor 180A 5%", category:"Electrical", models:["TTS300","TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0051", partNo:"100151-1", desc:"Kit - Suction Flange (Steel)", category:"Housing", models:["TTS300","TTS350","TTS400","TGS230","TGS310","TGS390","TGS490","TTH375","TGH285"], rev:"All" },
  { id:"SP-0052", partNo:"100402-1", desc:"Kit - Suction Flange (Brass)", category:"Housing", models:["TTS300","TTS350","TTS400","TGS230","TGS310","TGS390","TGS490","TTH375","TGH285"], rev:"All" },
  { id:"SP-0053", partNo:"100050-25", desc:"Service Valve Assembly & O-Ring", category:"Housing", models:["TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
  { id:"SP-0054", partNo:"100322-5", desc:"Compressor Assembly", category:"Compressor", models:["TTS350","TTS400","TTS500","TTS700","TGS230","TGS310","TGS390","TGS490","TGS520","TTH375","TGH285"], rev:"All" },
];

const CATEGORIES = [...new Set(PARTS_CATALOG.map(p => p.category))].sort();
const ALL_MODELS = [...new Set(PARTS_CATALOG.flatMap(p => p.models))].sort((a,b) => {
  const order = { TTS:1, TGS:2, TTH:3, TGH:4 };
  const fa = a.replace(/\d+/,''), fb = b.replace(/\d+/,'');
  return (order[fa]||9) - (order[fb]||9) || a.localeCompare(b);
});
const MODEL_FAMILIES = ['TTS','TGS','TTH','TGH'];
