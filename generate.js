const fs = require('fs');
const path = require('path');

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function calculateUptime() {
  const start = new Date(2006, 10, 12, 11, 0, 0);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  const pad = (n) => String(n).padStart(2, '0');
  return `${years} years, ${months} mos, ${days} days, ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const uptime = calculateUptime();

const asciiLines = [
  "        /\\                 /\\",
  "       /  \\               /  \\",
  "      /    \\_____________/    \\",
  "     /   /\\                 /\\  \\",
  "    |   /  \\               /  \\  |",
  "    |  |    |  .--.   .--. |   | |",
  "     \\  \\   | ( @@ ) ( @@ )|  / /",
  "      \\  \\  |  '--'   '--' | / /",
  "       \\  '.|      .-.     |.' /",
  "        \\   |     (   )    |  /",
  "         \\   \\     '-'    /  /",
  "          '.  '.  \\___/ .'  .'",
  "            '.  '-.___.-' .'",
  "              '-._______.-'"
];

const rows = [
  { type: "header", text: "evannn@evnwlf" },
  { key: "OS", value: "Windows 11, WSL, iOS" },
  { key: "Uptime", value: uptime, isEmerald: true },
  { key: "Role", value: "Estudiante & Desarrollador" },
  { key: "Host", value: "Lion Store" },
  { key: "Core", value: "Soluciones a medida & Software funcional" },
  { key: "IDE", value: "Visual Studio, Antigravity" },
  { type: "gap" },
  { key: "Languages", sub: "Programming", value: "C++, Learning (Java, Python, TS, JS)" },
  { key: "Languages", sub: "Real", value: "Español, English" },
  { type: "gap" },
  { key: "Hobbies", sub: "Visual", value: "Fotografía, Hiking" },
  { key: "Hobbies", sub: "Build", value: "Apps (iOS, Android, Windows, Web)" },
  { type: "gap" },
  { type: "header", text: "Contact" },
  { key: "Email", value: "evnwlf@gmail.com" },
  { key: "WhatsApp", value: "+52 56 3556 5626" },
  { key: "GitHub", value: "evnwlf" },
  { key: "Instagram", value: "@evn.wlf" }
];

function generateSVG() {
  const width = 940;
  const height = 550;

  let y = 118;
  const rightX = 330;
  const endX = 905;

  let rowsSvg = "";

  for (const item of rows) {
    if (item.type === "gap") {
      y += 10;
      continue;
    }

    if (item.type === "header") {
      const textWidth = item.text.length * 7.8;
      const lineStartX = rightX + textWidth + 14;
      rowsSvg += `
        <!-- Header: ${escapeXml(item.text)} -->
        <text x="${rightX}" y="${y}" fill="#f4f4f5" font-size="12" font-weight="600" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">${escapeXml(item.text)}</text>
        <line x1="${lineStartX}" y1="${y - 4}" x2="${endX}" y2="${y - 4}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      `;
      y += 20;
      continue;
    }

    // Normal row
    let keyLabelWidth = 0;
    let keySvg = "";

    // Dot
    keySvg += `<text x="${rightX}" y="${y}" fill="#71717a" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">.</text>`;
    
    // Key text
    keySvg += `<text x="${rightX + 10}" y="${y}" fill="#d16450" font-weight="500" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">${escapeXml(item.key)}</text>`;
    keyLabelWidth = rightX + 10 + (item.key.length * 7.4);

    if (item.sub) {
      keySvg += `<text x="${keyLabelWidth}" y="${y}" fill="#71717a" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">.</text>`;
      keyLabelWidth += 7;
      keySvg += `<text x="${keyLabelWidth}" y="${y}" fill="#38bdf8" font-weight="500" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">${escapeXml(item.sub)}</text>`;
      keyLabelWidth += item.sub.length * 7.4;
    }

    keySvg += `<text x="${keyLabelWidth}" y="${y}" fill="#71717a" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">:</text>`;
    keyLabelWidth += 12;

    const valueColor = item.isEmerald ? "#34d399" : "#e4e4e7";
    const valueWeight = item.isEmerald ? "font-weight=\"600\"" : "font-weight=\"400\"";

    // Value text measurement (approx 7.3px per char)
    const valWidth = item.value.length * 7.3;
    const dotLineEnd = endX - valWidth - 10;

    const dottedLine = dotLineEnd > keyLabelWidth + 10
      ? `<line x1="${keyLabelWidth + 4}" y1="${y - 4}" x2="${dotLineEnd}" y2="${y - 4}" stroke="rgba(255,255,255,0.15)" stroke-dasharray="2 3" stroke-width="1"/>`
      : "";

    rowsSvg += `
      <g>
        ${keySvg}
        ${dottedLine}
        <text x="${endX}" y="${y}" text-anchor="end" fill="${valueColor}" ${valueWeight} font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">${escapeXml(item.value)}</text>
      </g>
    `;

    y += 18.5;
  }

  // ASCII lines
  let asciiSvg = "";
  let asciiY = 120;
  for (const line of asciiLines) {
    const escaped = escapeXml(line);
    asciiSvg += `    <tspan x="36" y="${asciiY}">${escaped}</tspan>\n`;
    asciiY += 17.5;
  }

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090a0c"/>
      <stop offset="100%" stop-color="#0e1114"/>
    </linearGradient>
  </defs>

  <style>
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(0.9); }
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .pulse-dot {
      animation: pulse 2.2s ease-in-out infinite;
      transform-origin: 905px 23px;
    }
    .cursor-caret {
      animation: blink 1.1s infinite;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace;
    }
  </style>

  <!-- Window Container -->
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="18" fill="url(#bgGrad)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>

  <!-- Titlebar -->
  <path d="M 1 19 C 1 9 9 1 19 1 L ${width - 19} 1 C ${width - 9} 1 ${width - 1} 9 ${width - 1} 19 L ${width - 1} 46 L 1 46 Z" fill="rgba(255,255,255,0.02)"/>
  <line x1="1" y1="46" x2="${width - 1}" y2="46" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Window Buttons -->
  <circle cx="28" cy="23" r="6" fill="#ff5f57" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>
  <circle cx="48" cy="23" r="6" fill="#febc2e" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>
  <circle cx="68" cy="23" r="6" fill="#28c840" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>

  <!-- Center Tabs -->
  <g>
    <!-- Tab 1: Active -->
    <rect x="365" y="10" width="125" height="26" rx="6" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="427" y="27" text-anchor="middle" fill="#f4f4f5" font-size="11.5" font-weight="600" class="mono">~/evannn — zsh</text>
    
    <!-- Tab 2: oak-studio -->
    <text x="532" y="27" text-anchor="middle" fill="#71717a" font-size="11.5" class="mono">oak-studio</text>

    <!-- Tab 3: README.md -->
    <text x="620" y="27" text-anchor="middle" fill="#71717a" font-size="11.5" class="mono">README.md</text>
  </g>

  <!-- Live Pulse Dot on Right -->
  <circle cx="905" cy="23" r="3.5" fill="#10b981" class="pulse-dot"/>

  <!-- Initial Command Line -->
  <g class="mono">
    <text x="32" y="80" fill="#38bdf8" font-weight="700" font-size="13">&gt;</text>
    <text x="50" y="80" fill="#d16450" font-weight="600" font-size="13">
      <tspan font-style="italic" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="14.5">Evannn</tspan>@evnwlf
    </text>
    <text x="160" y="80" fill="#71717a" font-size="13">~</text>
    <text x="178" y="80" fill="#f4f4f5" font-weight="500" font-size="13">neofetch --user evannn</text>
  </g>

  <!-- Left Column: ASCII Wolf Art -->
  <text xml:space="preserve" fill="#a1a1aa" font-size="11" font-weight="500" class="mono" letter-spacing="0.2">
${asciiSvg}
  </text>
  
  <text x="146" y="390" text-anchor="middle" fill="#71717a" font-size="11.5" font-weight="500" letter-spacing="3.5" class="mono">e v n w l f . d e v</text>

  <!-- Right Column: Specs &amp; Data -->
  ${rowsSvg}

  <!-- Bottom Prompt Line -->
  <g class="mono">
    <text x="32" y="508" fill="#38bdf8" font-weight="700" font-size="13">&gt;</text>
    <text x="50" y="508" fill="#d16450" font-weight="600" font-size="13">
      <tspan font-style="italic" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="14.5">Evannn</tspan>@evnwlf
    </text>
    <text x="160" y="508" fill="#71717a" font-size="13">~</text>
    <text x="178" y="508" fill="#52525b" font-size="12.5">Escribe &apos;help&apos; para ver comandos...</text>
    <!-- Cursor -->
    <rect x="424" y="495" width="7.5" height="15" fill="#d16450" class="cursor-caret"/>
  </g>
</svg>`;

  fs.writeFileSync(path.join(__dirname, 'terminal.svg'), svgContent, 'utf-8');
  console.log("terminal.svg generated successfully with escaped XML!");
}

generateSVG();
