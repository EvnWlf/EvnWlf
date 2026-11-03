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
  // Zona horaria de México central para consistencia exacta con la web
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
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

// Arte ASCII oficial de evnwlf.dev
const asciiArt = "                                        ++++++++++++++++++++++\n                                  ++++++++++++++++++++++++++++++++++\n                              ++++++++++                       +++++++++\n                          ++++++++                                  ++++++++\n                       +++++++                                          +++++++\n                     +++++                       ++++++++                   +++++\n                  ++++++                 +++++++++++++++++++                   +++++\n                 ++++               +++++++++++++++                              +++++\n              +++++              ++++++++++++++                                    +++++\n             ++++             ++++++++++++++                                         +++++\n           ++++             +++++++++++++                                              ++++\n          ++++            +++++++++++++                   +     +                       ++++\n         +++            +++++++++++++                    +++   +++                        ++++\n       ++++            +++++++++++++                     ++++ +++++                        ++++\n      ++++            +++++++++++++                     ++++++ ++++                         ++++\n     ++++            +++++++++++++                      +++++++  ++                          ++++\n     +++            +++++++++++++                      +++++++++++++++                        +++\n    +++            +++++++++++++                       ++++++++++++++++++                      +++\n   +++            +++++++++++++                       +++++++++++++++++++++                     +++\n   +++           ++++++++++++++                     ++++++++++++++++++++++++                    +++\n  +++            ++++++++++++++                   ++++++++++++++++++++++++++++++++               +++\n  +++           ++++++++++++++                  ++++++++++++++++++++++++++++++++++++++            ++\n +++            ++++++++++++++                ++++++++++++++++++++++++++++++++++++++++            +++\n +++            ++++++++++++++               ++++++++++++++++++++++++++++++++++++++++             +++\n ++            +++++++++++++++                 ++++++++++++++++++++++++++++++++++++                ++\n ++            +++++++++++++++               ++++++++++++++++++++++++++++++++++++                  +++\n+++            ++++++++++++++++             +++++++++++++++++++++ ++++                             +++\n+++            ++++++++++++++++          +++++++++++++++++++++ ++++++                              +++\n+++             ++++++++++++++++     +++++++++++++++++++++++ +++++++                               +++\n+++             +++++++++++++++++  ++++++++++++++++++++++++ ++++++++                               +++\n ++             +++++++++++++++++   ++++++++++++++++++++++ +++++++++                               ++\n +++             +++++++++++++++++   +++++++++++++++++++++ +++++++++                              +++\n +++             +++++++++++++++++++  ++++++++++++++++++++ ++++++++++                             +++\n  ++              +++++++++++++++++++  +++++++++++++++++++  +++++++++               +             +++\n  +++              +++++++++++++++++++   ++++++++++++++++++ +++++++++             +++            +++\n  +++               +++++++++++++++++++++  ++++++++++++++++  +++++++            ++++             +++\n   +++               ++++++++++++++++++++++  +++++++++++++++ ++++++           +++++             +++\n    +++               +++++++++++++++++++++++   ++++++++++++ +++++         ++++++              +++\n    ++++               ++++++++++++++++++++++++++    +++++++  ++++     +++++++++              ++++\n     ++++                +++++++++++++++++++++++++++++++         ++++++++++++++               +++\n      ++++                 ++++++++++++++++++++++++++++++++++++++++++++++++++               ++++\n       ++++                  ++++++++++++++++++++++++++++++++++++++++++++++                ++++\n        ++++                   +++++++++++++++++++++++++++++++++++++++++                  ++++\n          +++                     ++++++++++++++++++++++++++++++++++++                   +++\n           ++++                      +++++++++++++++++++++++++++++                      +++\n             ++                           +++++++++++++++++++\n                                                                          +++     +++\n                                                                          +++   +++++\n                                                                          +++   +++\n                  ++++++++   +++      +++ ++++++++++   +++    +++     ++  +++ +++++++\n                 +++++ +++++ ++++    +++  +++++++++++  +++   +++++   +++  +++ +++++++\n                +++      +++  +++   +++   +++     +++   +++  +++++   ++   +++   +++\n                ++++++++++++   +++  +++   +++     +++   +++ +++ +++ +++   +++   +++\n                +++      +++   +++++++    +++     +++    +++++   +++++    +++   +++\n                 +++++++++++    +++++     +++     +++    +++++   +++++    +++   +++\n                  ++++++++       ++++     +++      ++     +++     +++     +++   +++\n";

const rows = [
  { type: "header", text: "evannn@evnwlf" },
  { key: "OS", value: "Windows 11, WSL, iOS" },
  { key: "Uptime", value: uptime, isEmerald: true },
  { key: "Role", value: "Estudiante & Desarrollador" },
  { key: "Host", value: "LS" },
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
  { key: "Email", value: "evnnwlf@gmail.com" },
  { key: "WhatsApp", value: "+52 56 3556 5626" },
  { key: "GitHub", value: "evnwlf" },
  { key: "Instagram", value: "@evn.wlf" }
];

function generateSVG() {
  const width = 960;
  const height = 550;

  // Paleta de evnwlf.dev en Modo Claro (Editorial Beige & Ink)
  const colors = {
    bgStart: "#FBF7EF",      // Hueso cálido editorial
    bgEnd: "#F4EFE6",        // Lino / arena suave
    border: "#DCD4C4",       // Borde tenue refinado
    titlebarBg: "rgba(23, 22, 20, 0.035)",
    titlebarBorder: "#E3DCCF",
    tabActiveBg: "#E8E0D0",
    tabActiveBorder: "#D4CBB8",
    tabActiveText: "#171614",
    tabInactiveText: "#7E7668",
    headerText: "#171614",
    headerLine: "#DCD4C4",
    dot: "#8C8373",
    coral: "#B83E2C",        // Terracota editorial
    teal: "#224B57",         // Petróleo apagado
    colon: "#8C8373",
    dottedLine: "#D6CDBC",
    valueText: "#171614",    // Carbón mate profundo
    uptimeText: "#047857",   // Verde esmeralda editorial
    asciiText: "#171614",    // Tinta máxima definición
    promptSubtle: "#7E7668",
  };

  let y = 118;
  const rightX = 380;
  const endX = 925;

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
        <text x="${rightX}" y="${y}" fill="${colors.headerText}" font-size="12" font-weight="700" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">${escapeXml(item.text)}</text>
        <line x1="${lineStartX}" y1="${y - 4}" x2="${endX}" y2="${y - 4}" stroke="${colors.headerLine}" stroke-width="1.2"/>
      `;
      y += 20;
      continue;
    }

    // Normal row
    let keyLabelWidth = 0;
    let keySvg = "";

    // Dot
    keySvg += `<text x="${rightX}" y="${y}" fill="${colors.dot}" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">.</text>`;
    
    // Key text
    keySvg += `<text x="${rightX + 10}" y="${y}" fill="${colors.coral}" font-weight="600" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">${escapeXml(item.key)}</text>`;
    keyLabelWidth = rightX + 10 + (item.key.length * 7.4);

    if (item.sub) {
      keySvg += `<text x="${keyLabelWidth}" y="${y}" fill="${colors.dot}" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">.</text>`;
      keyLabelWidth += 7;
      keySvg += `<text x="${keyLabelWidth}" y="${y}" fill="${colors.teal}" font-weight="600" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">${escapeXml(item.sub)}</text>`;
      keyLabelWidth += item.sub.length * 7.4;
    }

    keySvg += `<text x="${keyLabelWidth}" y="${y}" fill="${colors.colon}" font-size="12" font-family="ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace">:</text>`;
    keyLabelWidth += 12;

    const valueColor = item.isEmerald ? colors.uptimeText : colors.valueText;
    const valueWeight = item.isEmerald ? "font-weight=\"700\"" : "font-weight=\"500\"";

    const valWidth = item.value.length * 7.3;
    const dotLineEnd = endX - valWidth - 10;

    const dottedLine = dotLineEnd > keyLabelWidth + 10
      ? `<line x1="${keyLabelWidth + 4}" y1="${y - 4}" x2="${dotLineEnd}" y2="${y - 4}" stroke="${colors.dottedLine}" stroke-dasharray="2 3" stroke-width="1.2"/>`
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

  // ASCII lines from official evnwlf.dev
  const rawAsciiLines = asciiArt.trim().split('\n');
  let asciiSvg = "";
  let asciiY = 112;
  const fontSize = 5.2;
  const lineSpacing = 6.2;
  for (const line of rawAsciiLines) {
    const escaped = escapeXml(line);
    asciiSvg += `    <tspan x="28" y="${asciiY.toFixed(1)}">${escaped}</tspan>\n`;
    asciiY += lineSpacing;
  }

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">
  <defs>
    <linearGradient id="bgGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.bgStart}"/>
      <stop offset="100%" stop-color="${colors.bgEnd}"/>
    </linearGradient>
    <filter id="cardShadow" x="-2%" y="-2%" width="104%" height="106%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="rgba(45, 38, 28, 0.08)"/>
    </filter>
  </defs>

  <style>
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.45; transform: scale(0.9); }
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .pulse-dot {
      animation: pulse 2.2s ease-in-out infinite;
      transform-origin: ${width - 35}px 23px;
    }
    .cursor-caret {
      animation: blink 1.1s infinite;
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace;
    }
  </style>

  <!-- Window Container with Editorial Paper Styling -->
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="18" fill="url(#bgGradLight)" stroke="${colors.border}" stroke-width="1.5" filter="url(#cardShadow)"/>

  <!-- Titlebar -->
  <path d="M 1 19 C 1 9 9 1 19 1 L ${width - 19} 1 C ${width - 9} 1 ${width - 1} 9 ${width - 1} 19 L ${width - 1} 46 L 1 46 Z" fill="${colors.titlebarBg}"/>
  <line x1="1" y1="46" x2="${width - 1}" y2="46" stroke="${colors.titlebarBorder}" stroke-width="1"/>

  <!-- Window Buttons -->
  <circle cx="28" cy="23" r="6" fill="#ff5f57" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>
  <circle cx="48" cy="23" r="6" fill="#febc2e" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>
  <circle cx="68" cy="23" r="6" fill="#28c840" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/>

  <!-- Center Tabs -->
  <g>
    <!-- Tab 1: Active -->
    <rect x="${width / 2 - 115}" y="10" width="125" height="26" rx="6" fill="${colors.tabActiveBg}" stroke="${colors.tabActiveBorder}" stroke-width="1"/>
    <text x="${width / 2 - 53}" y="27" text-anchor="middle" fill="${colors.tabActiveText}" font-size="11.5" font-weight="700" class="mono">~/evannn — zsh</text>
    
    <!-- Tab 2: oak-studio -->
    <text x="${width / 2 + 52}" y="27" text-anchor="middle" fill="${colors.tabInactiveText}" font-size="11.5" font-weight="500" class="mono">oak-studio</text>

    <!-- Tab 3: README.md -->
    <text x="${width / 2 + 140}" y="27" text-anchor="middle" fill="${colors.tabInactiveText}" font-size="11.5" font-weight="500" class="mono">README.md</text>
  </g>

  <!-- Live Pulse Dot on Right -->
  <circle cx="${width - 35}" cy="23" r="3.5" fill="#059669" class="pulse-dot"/>

  <!-- Initial Command Line -->
  <g class="mono">
    <text x="32" y="80" fill="${colors.teal}" font-weight="800" font-size="13">&gt;</text>
    <text x="50" y="80" fill="${colors.coral}" font-weight="700" font-size="13">
      <tspan font-style="italic" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="14.5">Evannn</tspan>@evnwlf
    </text>
    <text x="160" y="80" fill="${colors.colon}" font-size="13">~</text>
    <text x="178" y="80" fill="${colors.valueText}" font-weight="600" font-size="13">neofetch --user evannn</text>
  </g>

  <!-- Left Column: Official Oak/Logo ASCII Art from evnwlf.dev -->
  <text xml:space="preserve" fill="${colors.asciiText}" font-size="${fontSize}" font-weight="700" class="mono" letter-spacing="0">
${asciiSvg}
  </text>

  <!-- Right Column: Specs & Data -->
  ${rowsSvg}

  <!-- Bottom Prompt Line -->
  <g class="mono">
    <text x="32" y="508" fill="${colors.teal}" font-weight="800" font-size="13">&gt;</text>
    <text x="50" y="508" fill="${colors.coral}" font-weight="700" font-size="13">
      <tspan font-style="italic" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="14.5">Evannn</tspan>@evnwlf
    </text>
    <text x="160" y="508" fill="${colors.colon}" font-size="13">~</text>
    <text x="178" y="508" fill="${colors.promptSubtle}" font-size="12.5" font-weight="500">Escribe &apos;help&apos; para ver comandos...</text>
    <!-- Cursor -->
    <rect x="424" y="495" width="7.5" height="15" fill="${colors.coral}" class="cursor-caret"/>
  </g>
</svg>`;

  fs.writeFileSync(path.join(__dirname, 'terminal.svg'), svgContent, 'utf-8');
  console.log("terminal.svg generated successfully with light editorial theme!");
}

generateSVG();
