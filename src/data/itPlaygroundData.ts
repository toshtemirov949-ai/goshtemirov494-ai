export interface CodeSnippet {
  id: string;
  title: string;
  language: 'html' | 'javascript' | 'python';
  description: string;
  initialCode: string;
  expectedOutputHint?: string;
}

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'interactive-counter',
    title: 'Interaktiv Sanagich (React/JS UI)',
    language: 'html',
    description: 'Zamonaviy interaktiv tugma va rang oʻzgaruvchi sanagich komponenti.',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 260px; margin: 0; background: #f8fafc; }
    .card { background: white; padding: 28px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center; max-width: 320px; width: 100%; border: 1px solid #e2e8f0; }
    h3 { margin: 0 0 12px; color: #0f172a; font-size: 18px; }
    .display { font-size: 48px; font-weight: 700; color: #4f46e5; margin-bottom: 20px; font-family: monospace; }
    .buttons { display: flex; gap: 8px; justify-content: center; }
    button { padding: 10px 18px; font-size: 14px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; }
    .btn-inc { background: #4f46e5; color: white; }
    .btn-inc:hover { background: #4338ca; }
    .btn-dec { background: #e0e7ff; color: #3730a3; }
    .btn-dec:hover { background: #c7d2fe; }
    .btn-reset { background: #f1f5f9; color: #64748b; }
    .status { margin-top: 14px; font-size: 13px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <h3>ZiyoTalim Kod Maydonchasi</h3>
    <div class="display" id="count">0</div>
    <div class="buttons">
      <button class="btn-dec" onclick="change(-1)">-1 Kamaytirish</button>
      <button class="btn-inc" onclick="change(1)">+1 Oshirish</button>
      <button class="btn-reset" onclick="reset()">0</button>
    </div>
    <div class="status" id="statusText">Holat: Boshlangʻich nuqta</div>
  </div>

  <script>
    let n = 0;
    const countEl = document.getElementById('count');
    const statusEl = document.getElementById('statusText');
    function change(delta) {
      n += delta;
      countEl.innerText = n;
      countEl.style.color = n > 0 ? '#10b981' : (n < 0 ? '#ef4444' : '#4f46e5');
      statusEl.innerText = 'Qiymat: ' + (n > 0 ? 'Musbat son' : (n < 0 ? 'Manfiy son' : 'Nol'));
    }
    function reset() {
      n = 0;
      countEl.innerText = '0';
      countEl.style.color = '#4f46e5';
      statusEl.innerText = 'Qayta tiklandi';
    }
  </script>
</body>
</html>`
  },
  {
    id: 'python-algorithm',
    title: 'Python: Array Filtr va Tub Sonlar Tahlili',
    language: 'javascript',
    description: 'JavaScript yordamida simulyatsiya qilingan algoritm: 1 dan 50 gacha boʻlgan tub sonlarni topish.',
    initialCode: `// 1 dan 50 gacha bo'lgan tub (prime) sonlarni aniqlash algoritmi
function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const primes = [];
for (let n = 1; n <= 50; n++) {
  if (isPrime(n)) primes.push(n);
}

console.log("Natija: 1 dan 50 gacha bo'lgan tub sonlar:");
console.log(primes.join(", "));
console.log("Jami tub sonlar soni:", primes.length);`
  },
  {
    id: 'modern-card-ui',
    title: 'CSS Grid & Gradient Banner (Tailwind UI)',
    language: 'html',
    description: 'Zamonaviy karta dizayni va neon soyali moslashuvchan maket.',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0f19; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 280px; margin: 0; padding: 20px; }
    .card { background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; padding: 24px; max-width: 360px; position: relative; overflow: hidden; }
    .card::before { content: ""; position: absolute; top: -50px; right: -50px; width: 120px; height: 120px; background: #3b82f6; filter: blur(60px); opacity: 0.3; }
    .badge { display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; color: #38bdf8; margin-bottom: 12px; }
    h4 { margin: 0 0 8px; font-size: 20px; color: #f8fafc; font-weight: 600; }
    p { margin: 0 0 20px; font-size: 14px; color: #94a3b8; line-height: 1.5; }
    .btn { display: inline-flex; align-items: center; gap: 8px; background: #2563eb; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500; border: none; cursor: pointer; }
    .btn:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Sun'iy Intellekt Kursi</div>
    <h4>Python & Machine Learning</h4>
    <p>Neyron tarmoqlar va katta ma'lumotlar bilan ishlash bo'yicha amaliy laboratoriya darslari.</p>
    <button class="btn" onclick="alert('Darsga muvaffaqiyatli yozildingiz!')">Darsni Boshlash →</button>
  </div>
</body>
</html>`
  }
];
