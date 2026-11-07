const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

function generateCertificateSvg({ title, subtitle, recipient, description, eventDate, hours, org, signer1, role1, signer2, role2, certNo, colorTheme }) {
  const border1 = colorTheme.border1 || '#8b572a';
  const border2 = colorTheme.border2 || '#c88d3b';
  const sealColor = colorTheme.seal || '#d49b38';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffcf7" />
      <stop offset="50%" stop-color="#f8f1e5" />
      <stop offset="100%" stop-color="#f0e4d0" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbe29d" />
      <stop offset="40%" stop-color="#d49b38" />
      <stop offset="70%" stop-color="#aa7318" />
      <stop offset="100%" stop-color="#fbe29d" />
    </linearGradient>
    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b1e1e" />
      <stop offset="100%" stop-color="#550f0f" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Parchment Canvas -->
  <rect x="10" y="10" width="980" height="680" rx="8" fill="url(#bgGrad)" stroke="#c2a47e" stroke-width="2"/>

  <!-- Ornate Outer Border -->
  <rect x="25" y="25" width="950" height="650" fill="none" stroke="${border1}" stroke-width="4"/>
  <rect x="33" y="33" width="934" height="634" fill="none" stroke="${border2}" stroke-width="1.5" stroke-dasharray="8,4"/>
  <rect x="39" y="39" width="922" height="622" fill="none" stroke="${border1}" stroke-width="1"/>

  <!-- Corner Ornaments -->
  <g fill="${border1}">
    <!-- Top-Left -->
    <path d="M 42 42 L 80 42 L 80 46 L 46 46 L 46 80 L 42 80 Z" />
    <circle cx="56" cy="56" r="5" fill="url(#goldGrad)" />
    <!-- Top-Right -->
    <path d="M 958 42 L 920 42 L 920 46 L 954 46 L 954 80 L 958 80 Z" />
    <circle cx="944" cy="56" r="5" fill="url(#goldGrad)" />
    <!-- Bottom-Left -->
    <path d="M 42 658 L 80 658 L 80 654 L 46 654 L 46 620 L 42 620 Z" />
    <circle cx="56" cy="644" r="5" fill="url(#goldGrad)" />
    <!-- Bottom-Right -->
    <path d="M 958 658 L 920 658 L 920 654 L 954 654 L 954 620 L 958 620 Z" />
    <circle cx="944" cy="644" r="5" fill="url(#goldGrad)" />
  </g>

  <!-- Organization Header -->
  <g text-anchor="middle" font-family="'Times New Roman', serif">
    <text x="500" y="85" font-size="14" letter-spacing="3" fill="#6d4c2b" font-weight="bold">${org.toUpperCase()}</text>
    <text x="500" y="105" font-size="11" letter-spacing="1" fill="#886848">REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION / ACCREDITED BODY</text>
    <line x1="320" y1="118" x2="680" y2="118" stroke="url(#goldGrad)" stroke-width="2" />

    <!-- Certificate Title -->
    <text x="500" y="165" font-size="34" font-weight="bold" fill="#3a1e05" letter-spacing="4">${title}</text>
    <text x="500" y="195" font-size="16" font-style="italic" fill="#7a4f27">${subtitle}</text>

    <!-- Presentation Text -->
    <text x="500" y="240" font-size="15" fill="#5c442d">This certificate is proudly awarded to</text>

    <!-- Recipient -->
    <text x="500" y="295" font-size="36" font-family="'Georgia', serif" font-weight="bold" fill="#201103" letter-spacing="2">${recipient}</text>
    <line x1="280" y1="310" x2="720" y2="310" stroke="#8b572a" stroke-width="1.5" />

    <!-- Description -->
    <foreignObject x="150" y="325" width="700" height="110">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Times New Roman',serif; font-size:15px; color:#44301c; text-align:center; line-height:1.6;">
        ${description}
      </div>
    </foreignObject>

    <!-- Date and Venue -->
    <text x="500" y="475" font-size="14" fill="#5c442d">Given this <strong>${eventDate}</strong> with credit of <strong>${hours}</strong>.</text>
  </g>

  <!-- Golden Seal -->
  <g transform="translate(160, 520)" filter="url(#shadow)">
    <!-- Ribbon tails -->
    <polygon points="-16,40 -26,110 0,90 26,110 16,40" fill="url(#ribbonGrad)" />
    <!-- Seal Medallion -->
    <circle cx="0" cy="40" r="42" fill="url(#goldGrad)" stroke="#8e5d0a" stroke-width="2"/>
    <circle cx="0" cy="40" r="35" fill="none" stroke="#684200" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="0" y="35" text-anchor="middle" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#4d2f00" letter-spacing="1">OFFICIAL SEAL</text>
    <text x="0" y="48" text-anchor="middle" font-family="'Times New Roman', serif" font-size="16" font-weight="bold" fill="#4d2f00">★ ★ ★</text>
    <text x="0" y="60" text-anchor="middle" font-family="'Times New Roman', serif" font-size="8" fill="#4d2f00">EXCELLENCE</text>
  </g>

  <!-- Signatures -->
  <g text-anchor="middle" font-family="'Times New Roman', serif">
    <!-- Signer 1 -->
    <g transform="translate(430, 580)">
      <!-- Signature flourish script -->
      <path d="M-80,-25 C-50,-45 -20,-10 10,-35 C30,-15 60,-40 80,-20" fill="none" stroke="#1d2d5a" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="-100" y1="-5" x2="100" y2="-5" stroke="#44301c" stroke-width="1"/>
      <text x="0" y="15" font-size="14" font-weight="bold" fill="#201103">${signer1}</text>
      <text x="0" y="30" font-size="12" fill="#664d33">${role1}</text>
    </g>

    <!-- Signer 2 -->
    <g transform="translate(730, 580)">
      <!-- Signature flourish script -->
      <path d="M-70,-30 C-40,-50 -10,-15 25,-40 C45,-20 70,-45 85,-25" fill="none" stroke="#1d2d5a" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="-100" y1="-5" x2="100" y2="-5" stroke="#44301c" stroke-width="1"/>
      <text x="0" y="15" font-size="14" font-weight="bold" fill="#201103">${signer2}</text>
      <text x="0" y="30" font-size="12" fill="#664d33">${role2}</text>
    </g>
  </g>

  <!-- Verification Footer -->
  <g font-family="'Courier New', monospace" font-size="10" fill="#7d6144">
    <text x="45" y="645">DOC NO: ${certNo}</text>
    <text x="955" y="645" text-anchor="end">AUTHENTICITY VERIFIED • PPST ALIGNED</text>
  </g>
</svg>`;
}

const certificates = [
  // TS9: Professional Development Organizations
  {
    fileName: 'cert-ts9-1.svg',
    title: 'CERTIFICATE OF PARTICIPATION',
    subtitle: 'National Congress on 21st Century Pedagogical Approaches',
    recipient: 'JOHN BRIX G. CORONEJO',
    description: 'for actively engaging in the 24-hour national seminar-workshop on "Integrating Generative AI and Culturally Responsive Teaching Strategies in Secondary Education" held via hybrid modality.',
    eventDate: 'October 14-16, 2025',
    hours: '24 CPD Units / Training Hours',
    org: 'Philippine Association of Pre-Service Educators (PAPSE)',
    signer1: 'DR. EDUARDO V. RAMOS, EdD',
    role1: 'President, PAPSE National Council',
    signer2: 'MA. LOURDES C. SANTILLAN, PhD',
    role2: 'Director of Academic Affairs & Training',
    certNo: 'PAPSE-NAT-2025-0892',
    colorTheme: { border1: '#6e3c15', border2: '#c98a3b' }
  },
  {
    fileName: 'cert-ts9-2.svg',
    title: 'CERTIFICATE OF COMPLETION',
    subtitle: 'Advanced Course on Differentiated Instruction & Inclusive Classrooms',
    recipient: 'JOHN BRIX G. CORONEJO',
    description: 'for successfully completing all modules, micro-practicum demos, and capstone assessments for the specialized professional track on designing individualized learning pathways in diverse classrooms.',
    eventDate: 'November 22, 2025',
    hours: '16 Professional Development Hours',
    org: 'Council of Educators for Inclusive Learning (CEIL)',
    signer1: 'PROF. ARTURO M. CASTILLO',
    role1: 'Chairperson, Inclusive Education Board',
    signer2: 'DR. REGINA F. VALENCIA',
    role2: 'Lead Facilitator & Specialist',
    certNo: 'CEIL-INCL-8841-B',
    colorTheme: { border1: '#543015', border2: '#b87c28' }
  },
  {
    fileName: 'cert-ts9-3.svg',
    title: 'CERTIFICATE OF RECOGNITION',
    subtitle: 'Regional Pre-Service Teachers Research & Innovation Colloquium',
    recipient: 'JOHN BRIX G. CORONEJO',
    description: 'for demonstrating scholarly excellence and delivering an outstanding paper presentation entitled "Enhancing Conceptual Mastery in Science via Inquiry-Based Interactive Learning Kits".',
    eventDate: 'January 18, 2026',
    hours: 'Best Paper Presentation Nominee',
    org: 'Luzon Association of Teacher Education Institutions (LATEI)',
    signer1: 'DR. FELICIANO T. GOMEZ, PhD',
    role1: 'Research Colloquium Convenor',
    signer2: 'DR. ROSARIO P. BUENAVENTURA',
    role2: 'Dean, College of Education',
    certNo: 'LATEI-RES-2026-0314',
    colorTheme: { border1: '#5a2e12', border2: '#d99738' }
  },

  // TS10: LAC Session / School Activity Participation
  {
    fileName: 'cert-ts10-1.svg',
    title: 'CERTIFICATE OF ATTENDANCE',
    subtitle: 'School Learning Action Cell (SLAC) Session No. 4',
    recipient: 'JOHN BRIX G. CORONEJO',
    description: 'for dedicated attendance and active involvement in the collaborative session on "Formative Assessment Analytics and Remediation Strategies for Struggling Learners" conducted during Mid-Year INSET.',
    eventDate: 'December 05, 2025',
    hours: '8 In-Service Training Hours',
    org: 'President Diosdado Macapagal High School (PDMHS) • DepEd Division Office',
    signer1: 'FERNANDO G. REYES, MAT',
    role1: 'SLAC Coordinator & Master Teacher II',
    signer2: 'CORAZON B. DELA CRUZ, CESO VI',
    role2: 'School Principal IV',
    certNo: 'PDMHS-SLAC-2025-042',
    colorTheme: { border1: '#5c3311', border2: '#c28532' }
  },
  {
    fileName: 'cert-ts10-2.svg',
    title: 'CERTIFICATE OF APPRECIATION',
    subtitle: 'National Reading Month & Community Literacy Caravan',
    recipient: 'JOHN BRIX G. CORONEJO',
    description: 'in grateful appreciation of exemplary volunteerism, creative storytelling facilitation, and leadership during the "Project AKLAT: Reading Corners for Young Achievers" outreach program.',
    eventDate: 'November 28, 2025',
    hours: 'Community Extension & Co-Curricular',
    org: 'English & Reading Department • Partner School',
    signer1: 'MERCEDITA K. AQUINO',
    role1: 'Head Teacher III, English Dept',
    signer2: 'CORAZON B. DELA CRUZ, CESO VI',
    role2: 'School Principal IV',
    certNo: 'PDMHS-LIT-2025-119',
    colorTheme: { border1: '#633917', border2: '#b97a29' }
  },
  {
    fileName: 'cert-ts10-3.svg',
    title: 'CERTIFICATE OF PARTICIPATION',
    subtitle: 'Mid-Year In-Service Training for Teachers (INSET 2025-2026)',
    recipient: 'JOHN BRIX G. CORONEJO',
    description: 'for completing the 5-day professional development workshop on "Curriculum Delivery, Contextualized Instructional Materials, and Psychosocial Support Strategies for High School Learners".',
    eventDate: 'January 22-26, 2026',
    hours: '40 Cumulative INSET Hours',
    org: 'Department of Education • Schools Division of Laguna',
    signer1: 'DR. GILBERT S. MENDOZA',
    role1: 'Public Schools District Supervisor',
    signer2: 'CORAZON B. DELA CRUZ, CESO VI',
    role2: 'School Principal IV',
    certNo: 'DEPED-INSET-2026-778',
    colorTheme: { border1: '#552c0d', border2: '#cf8e33' }
  }
];

certificates.forEach(c => {
  const filePath = path.join(imgDir, c.fileName);
  fs.writeFileSync(filePath, generateCertificateSvg(c));
  console.log(`Generated ${c.fileName}`);
});

// Partner School Seal SVG
const schoolCrestSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <defs>
    <radialGradient id="crestGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4a2e16"/>
      <stop offset="70%" stop-color="#2d1a0b"/>
      <stop offset="100%" stop-color="#190e06"/>
    </radialGradient>
    <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe194"/>
      <stop offset="50%" stop-color="#d49b38"/>
      <stop offset="100%" stop-color="#8c5812"/>
    </linearGradient>
  </defs>
  <circle cx="150" cy="150" r="140" fill="url(#crestGrad)" stroke="url(#crestGold)" stroke-width="6"/>
  <circle cx="150" cy="150" r="126" fill="none" stroke="#e6b158" stroke-width="2" stroke-dasharray="6,4"/>
  
  <!-- Laurel Wreath -->
  <path d="M 60,170 C 50,110 80,60 140,50" fill="none" stroke="url(#crestGold)" stroke-width="3"/>
  <path d="M 240,170 C 250,110 220,60 160,50" fill="none" stroke="url(#crestGold)" stroke-width="3"/>

  <!-- Book & Torch Symbol -->
  <polygon points="150,75 142,105 158,105" fill="#f59e0b"/>
  <circle cx="150" cy="72" r="12" fill="#ef4444" opacity="0.8"/>
  <rect x="145" y="105" width="10" height="35" rx="3" fill="url(#crestGold)"/>
  
  <!-- Open Book -->
  <path d="M 95,145 Q 125,135 150,150 Q 175,135 205,145 L 205,185 Q 175,175 150,190 Q 125,175 95,185 Z" fill="#fdfbf7" stroke="#4a2e16" stroke-width="2"/>
  <line x1="150" y1="150" x2="150" y2="190" stroke="#4a2e16" stroke-width="2"/>

  <!-- Latin Motto Ribbon -->
  <path d="M 65,225 Q 150,250 235,225 L 225,248 Q 150,270 75,248 Z" fill="url(#crestGold)" stroke="#3f240d" stroke-width="1.5"/>
  <text x="150" y="243" text-anchor="middle" font-family="'Times New Roman',serif" font-size="11" font-weight="bold" fill="#2d1706" letter-spacing="1.5">VERITAS ET SCIENTIA</text>
  
  <text x="150" y="42" text-anchor="middle" font-family="'Times New Roman',serif" font-size="10" font-weight="bold" fill="#f7dfa5" letter-spacing="1.2">PRES. DIOSDADO MACAPAGAL HS</text>
  <text x="150" y="285" text-anchor="middle" font-family="'Times New Roman',serif" font-size="10" font-weight="bold" fill="#c49f69">PDMHS • DEPED PARTNER</text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'school-crest.svg'), schoolCrestSvg);

// Teacher Avatar SVG (Warm, distinguished, elegant professional portrait silhouette)
const teacherAvatarSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="avatarBg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#5a381f"/>
      <stop offset="60%" stop-color="#331c0c"/>
      <stop offset="100%" stop-color="#180e06"/>
    </radialGradient>
    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd584"/>
      <stop offset="50%" stop-color="#c58931"/>
      <stop offset="100%" stop-color="#804e13"/>
    </linearGradient>
  </defs>
  <circle cx="200" cy="200" r="190" fill="url(#avatarBg)" stroke="url(#goldRing)" stroke-width="8"/>
  <circle cx="200" cy="200" r="178" fill="none" stroke="#e0aa53" stroke-width="2" opacity="0.4" stroke-dasharray="4,4"/>

  <!-- Teacher Silhouette Artwork -->
  <!-- Shoulders / Blazer -->
  <path d="M 90,360 C 100,285 140,250 200,250 C 260,250 300,285 310,360 Z" fill="#241408" stroke="#714723" stroke-width="3"/>
  <!-- Blouse / Collar -->
  <polygon points="200,250 170,295 200,340 230,295" fill="#fcf6ec"/>
  <polygon points="175,250 160,290 185,290" fill="#38200e"/>
  <polygon points="225,250 240,290 215,290" fill="#38200e"/>
  <!-- Neck -->
  <path d="M 175,210 L 175,255 C 185,262 215,262 225,255 L 225,210 Z" fill="#d99b70"/>
  <!-- Head -->
  <ellipse cx="200" cy="180" rx="46" ry="54" fill="#e2a67b"/>
  <!-- Elegant Hair Updo / Bun -->
  <path d="M 148,175 C 145,130 165,105 200,105 C 235,105 255,130 252,175 C 248,145 235,130 200,130 C 165,130 152,145 148,175 Z" fill="#221105"/>
  <circle cx="200" cy="98" r="32" fill="#1b0e04"/>
  <!-- Teacher Glasses (Warm Gold) -->
  <rect x="170" y="166" width="24" height="16" rx="4" fill="none" stroke="#ffd175" stroke-width="3"/>
  <rect x="206" y="166" width="24" height="16" rx="4" fill="none" stroke="#ffd175" stroke-width="3"/>
  <line x1="194" y1="174" x2="206" y2="174" stroke="#ffd175" stroke-width="3"/>
  <!-- Friendly gentle smile -->
  <path d="M 190,205 Q 200,214 210,205" fill="none" stroke="#8b4e28" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Graduation Cap Tassel / Brooch -->
  <circle cx="200" cy="305" r="7" fill="url(#goldRing)"/>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'teacher-avatar.svg'), teacherAvatarSvg);

// School Campus Illustration
const campusSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d1c10"/>
      <stop offset="70%" stop-color="#55341c"/>
      <stop offset="100%" stop-color="#734726"/>
    </linearGradient>
    <linearGradient id="bldgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d6b588"/>
      <stop offset="50%" stop-color="#faebd7"/>
      <stop offset="100%" stop-color="#caa574"/>
    </linearGradient>
  </defs>
  <!-- Warm Sky -->
  <rect width="800" height="450" fill="url(#skyGrad)"/>
  
  <!-- Distant Trees -->
  <circle cx="80" cy="280" r="60" fill="#2d421e" opacity="0.7"/>
  <circle cx="150" cy="270" r="70" fill="#3a5426" opacity="0.7"/>
  <circle cx="680" cy="270" r="75" fill="#3a5426" opacity="0.7"/>
  <circle cx="750" cy="285" r="60" fill="#2d421e" opacity="0.7"/>

  <!-- School Main Academic Building (Classic Gabaldon / DepEd Secondary Structure) -->
  <rect x="180" y="160" width="440" height="150" fill="url(#bldgGrad)" stroke="#422711" stroke-width="4"/>
  <!-- Roof / Pediment -->
  <polygon points="160,160 400,85 640,160" fill="#843118" stroke="#3b1509" stroke-width="4"/>
  <polygon points="340,125 400,95 460,125" fill="#5c200e"/>
  <!-- Clock / Emblem in Pediment -->
  <circle cx="400" cy="130" r="16" fill="#f5ede0" stroke="#ffd276" stroke-width="3"/>
  <line x1="400" y1="130" x2="400" y2="120" stroke="#331805" stroke-width="2"/>
  <line x1="400" y1="130" x2="408" y2="130" stroke="#331805" stroke-width="2"/>

  <!-- Classical Columns / Pillars -->
  <g fill="#f2e2cb" stroke="#633e1c" stroke-width="2">
    <rect x="220" y="160" width="18" height="150"/>
    <rect x="270" y="160" width="18" height="150"/>
    <rect x="320" y="160" width="18" height="150"/>
    <rect x="460" y="160" width="18" height="150"/>
    <rect x="510" y="160" width="18" height="150"/>
    <rect x="560" y="160" width="18" height="150"/>
  </g>

  <!-- Windows -->
  <g fill="#2e1f14" stroke="#d5b486" stroke-width="2">
    <rect x="245" y="185" width="20" height="35" rx="3"/>
    <rect x="295" y="185" width="20" height="35" rx="3"/>
    <rect x="485" y="185" width="20" height="35" rx="3"/>
    <rect x="535" y="185" width="20" height="35" rx="3"/>
    
    <rect x="245" y="240" width="20" height="35" rx="3"/>
    <rect x="295" y="240" width="20" height="35" rx="3"/>
    <rect x="485" y="240" width="20" height="35" rx="3"/>
    <rect x="535" y="240" width="20" height="35" rx="3"/>
  </g>

  <!-- Grand Main Entrance -->
  <rect x="360" y="210" width="80" height="100" fill="#361a09" stroke="#caa574" stroke-width="3"/>
  <path d="M 360,210 Q 400,185 440,210 Z" fill="#8c5828"/>
  <line x1="400" y1="210" x2="400" y2="310" stroke="#e0be88" stroke-width="2"/>

  <!-- School Quadrangle Lawn / Grounds -->
  <polygon points="0,310 800,310 800,450 0,450" fill="#3f2713"/>
  <polygon points="100,450 700,450 480,310 320,310" fill="#5a391c"/>
  
  <!-- Flagpole -->
  <line x1="130" y1="120" x2="130" y2="340" stroke="#e8ded1" stroke-width="4"/>
  <polygon points="130,120 185,135 130,150" fill="#2563eb"/>
  <polygon points="130,135 185,135 130,150" fill="#dc2626"/>
  <polygon points="130,120 155,135 130,150" fill="#ffffff"/>
  <circle cx="138" cy="135" r="4" fill="#f59e0b"/>

  <!-- Grounds Caption Banner -->
  <rect x="240" y="380" width="320" height="42" rx="21" fill="rgba(24, 14, 7, 0.88)" stroke="#d49b38" stroke-width="1.5"/>
  <text x="400" y="407" text-anchor="middle" font-family="'Times New Roman',serif" font-size="14" font-weight="bold" fill="#fbe8ca" letter-spacing="1">MAIN ACADEMIC BUILDING &amp; QUADRANGLE</text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'campus-grounds.svg'), campusSvg);

// Classroom Lab SVG
const labSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="roomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2a1a0f"/>
      <stop offset="100%" stop-color="#462c19"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#roomGrad)"/>
  
  <!-- Interactive Smart Board / Blackboard -->
  <rect x="150" y="50" width="500" height="200" rx="8" fill="#1b2a1a" stroke="#8c5828" stroke-width="6"/>
  <text x="400" y="100" text-anchor="middle" font-family="'Times New Roman', serif" font-size="20" fill="#fdfcf0" font-weight="bold">SCIENCE &amp; MULTIMEDIA LEARNING LAB</text>
  <text x="400" y="140" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#a3e635">Active Inquiry • Collaborative Stations • DepEd DCP Packages</text>
  <line x1="220" y1="165" x2="580" y2="165" stroke="#4ade80" stroke-dasharray="8,4" stroke-width="2"/>
  <text x="400" y="195" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e2e8f0">TS3 Competency: Scientific Investigation &amp; Hypothesis Testing</text>

  <!-- Lab Workstations -->
  <rect x="80" y="290" width="280" height="110" rx="6" fill="#331c0e" stroke="#c08a46" stroke-width="3"/>
  <rect x="440" y="290" width="280" height="110" rx="6" fill="#331c0e" stroke="#c08a46" stroke-width="3"/>

  <!-- Microscope / Equipment Icons -->
  <circle cx="220" cy="270" r="16" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
  <rect x="214" y="240" width="12" height="30" rx="3" fill="#94a3b8"/>
  <rect x="200" y="280" width="40" height="10" rx="2" fill="#334155"/>

  <!-- Lab Flask -->
  <polygon points="570,250 590,285 550,285" fill="#38bdf8" opacity="0.8"/>
  <rect x="566" y="235" width="8" height="18" fill="#e0f2fe"/>

  <!-- Lab Stools -->
  <ellipse cx="140" cy="410" rx="30" ry="12" fill="#784720"/>
  <ellipse cx="300" cy="410" rx="30" ry="12" fill="#784720"/>
  <ellipse cx="500" cy="410" rx="30" ry="12" fill="#784720"/>
  <ellipse cx="660" cy="410" rx="30" ry="12" fill="#784720"/>

  <rect x="260" y="380" width="280" height="38" rx="19" fill="rgba(24, 14, 7, 0.9)" stroke="#d49b38" stroke-width="1.5"/>
  <text x="400" y="404" text-anchor="middle" font-family="'Times New Roman',serif" font-size="13" font-weight="bold" fill="#fbe8ca" letter-spacing="1">SPECIALIZED SCIENCE LABORATORY</text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'lab-view.svg'), labSvg);

console.log('All image assets created successfully!');
