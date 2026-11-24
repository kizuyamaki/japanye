// =========================================================
// だい3か ことば (หน้า 128–129) - Application Logic
// รองรับ Gboard Handwriting (手書き入力), ทุกภาษาบนคีย์บอร์ดมือถือ, และ GitHub Pages
// =========================================================

const VOCAB_DATA = [
  { jp: "~じ", reading: "じ", th: "...โมง ...นาฬิกา", easy: true },
  { jp: "~ふん／ぷん", reading: "ふん", alt: ["ぷん", "ふんぷん", "ふん/ぷん"], th: "...นาที", easy: true },
  { jp: "いま", reading: "いま", th: "ตอนนี้ ขณะนี้", easy: true },
  { jp: "なんじ", reading: "なんじ", th: "กี่โมง", easy: true },
  { jp: "~はん", reading: "はん", th: "...ครึ่ง", easy: true },
  { jp: "ごご", reading: "ごご", th: "p.m.", easy: true },
  { jp: "ごぜん", reading: "ごぜん", th: "a.m.", easy: true },
  { jp: "とうきょう", reading: "とうきょう", alt: ["東京"], th: "โตเกียว", easy: true },
  { jp: "バンコク", reading: "バンコク", th: "กรุงเทพฯ", easy: true },
  { jp: "ペキン", reading: "ペキン", th: "ปักกิ่ง", easy: true },
  { jp: "火よう日", ruby: [["火", "か"], ["日", "び"]], reading: "かようび", alt: ["火曜日"], th: "วันอังคาร", easy: false },
  { jp: "金よう日", ruby: [["金", "きん"], ["日", "び"]], reading: "きんようび", alt: ["金曜日"], th: "วันศุกร์", easy: false },
  { jp: "月よう日", ruby: [["月", "げつ"], ["日", "び"]], reading: "げつようび", alt: ["月曜日"], th: "วันจันทร์", easy: false },
  { jp: "水よう日", ruby: [["水", "すい"], ["日", "び"]], reading: "すいようび", alt: ["水曜日"], th: "วันพุธ", easy: false },
  { jp: "たんじょう日", ruby: [["日", "び"]], reading: "たんじょうび", alt: ["誕生日"], th: "วันเกิด", easy: false },
  { jp: "土よう日", ruby: [["土", "ど"], ["日", "び"]], reading: "どようび", alt: ["土曜日"], th: "วันเสาร์", easy: false },
  { jp: "なんよう日", ruby: [["日", "び"]], reading: "なんようび", alt: ["何曜日"], th: "วันอะไร (ในรอบสัปดาห์)", easy: false },
  { jp: "日よう日", ruby: [["日", "にち"], ["日", "び"]], reading: "にちようび", alt: ["日曜日"], th: "วันอาทิตย์", easy: false },
  { jp: "木よう日", ruby: [["木", "もく"], ["日", "び"]], reading: "もくようび", alt: ["木曜日"], th: "วันพฤหัสบดี", easy: false },
  { jp: "かていか", reading: "かていか", alt: ["家庭科"], th: "คหกรรม", easy: false },
  { jp: "~じかんめ", reading: "じかんめ", alt: ["時間目"], th: "ชั่วโมงที่... คาบที่...", easy: false },
  { jp: "れきし", reading: "れきし", alt: ["歴史"], th: "ประวัติศาสตร์", easy: false },
  { jp: "ココナッツ", reading: "ココナッツ", th: "มะพร้าว", easy: true },
  { jp: "サッカー", reading: "サッカー", th: "ฟุตบอล", easy: true },
  { jp: "すいか", reading: "すいか", th: "แตงโม", easy: true },
  { jp: "好き", ruby: [["好", "す"]], reading: "すき", th: "ชอบ", easy: false },
  { jp: "スポーツ", reading: "スポーツ", th: "กีฬา", easy: true },
  { jp: "タイりょうり", reading: "タイりょうり", alt: ["タイ料理"], th: "อาหารไทย", easy: false },
  { jp: "たっきゅう", reading: "たっきゅう", alt: ["卓球"], th: "ปิงปอง", easy: false },
  { jp: "テニス", reading: "テニス", th: "เทนนิส", easy: true },
  { jp: "ドリアン", reading: "ドリアン", th: "ทุเรียน", easy: true },
  { jp: "パイナップル", reading: "パイナップル", th: "สับปะรด", easy: true },
  { jp: "バスケットボール", reading: "バスケットボール", th: "บาสเกตบอล", easy: true },
  { jp: "バドミントン", reading: "バドミントン", th: "แบดมินตัน", easy: true },
  { jp: "バナナ", reading: "バナナ", th: "กล้วย", easy: true },
  { jp: "パパイヤ", reading: "パパイヤ", th: "มะละกอ", easy: true },
  { jp: "バレーボール", reading: "バレーボール", th: "วอลเลย์บอล", easy: true },
  { jp: "マンゴー", reading: "マンゴー", th: "มะม่วง", easy: true },
  { jp: "マンゴスチン", reading: "マンゴスチン", th: "มังคุด", easy: true },
  { jp: "メロン", reading: "メロン", th: "เมลอน", easy: true },
  { jp: "かもく", reading: "かもく", alt: ["科目"], th: "วิชา", easy: false },
  { jp: "あさ", reading: "あさ", alt: ["朝"], th: "ตอนเช้า", easy: true },
  { jp: "うち", reading: "うち", alt: ["家"], th: "บ้าน", easy: true },
  { jp: "おわります", reading: "おわります", alt: ["終わります"], th: "เลิก", easy: false },
  { jp: "じゅぎょう", reading: "じゅぎょう", alt: ["授業"], th: "ชั่วโมงเรียน คาบเรียน", easy: false },
  { jp: "じゅく", reading: "じゅく", alt: ["塾"], th: "โรงเรียนกวดวิชา", easy: false },
  { jp: "そして", reading: "そして", th: "แล้วก็", easy: true },
  { jp: "はじまります", reading: "はじまります", alt: ["始まります"], th: "เริ่ม", easy: false },
  { jp: "やすみ", reading: "やすみ", alt: ["休み"], th: "วันหยุด", easy: true },
  { jp: "えっ", reading: "えっ", th: "คำอุทานแสดงความประหลาดใจในสิ่งที่ได้ยิน", easy: true },
  { jp: "これ", reading: "これ", th: "นี่ อันนี้", easy: true },
  { jp: "しゅくだい", reading: "しゅくだい", alt: ["宿題"], th: "การบ้าน", easy: false },
  { jp: "すうじ", reading: "すうじ", alt: ["数字"], th: "ตัวเลข", easy: false },
  { jp: "たいへんですね。", reading: "たいへんですね", alt: ["大変ですね", "大変ですね。"], th: "แย่เลยนะ ลำบากเนอะ", easy: false },
  { jp: "でも", reading: "でも", th: "แต่", easy: true },
  { jp: "まいにち", reading: "まいにち", alt: ["毎日"], th: "ทุกวัน", easy: true },
  { jp: "あれ", reading: "あれ", th: "โน่น อันโน้น", easy: true },
  { jp: "うた", reading: "うた", alt: ["歌"], th: "เพลง", easy: true },
  { jp: "それ", reading: "それ", th: "นั่น อันนั้น", easy: true },
  { jp: "てんぷら", reading: "てんぷら", alt: ["天ぷら"], th: "เทมปุระ", easy: true },
  { jp: "ドラマ", reading: "ドラマ", th: "ละครทีวี", easy: true },
  { jp: "どれ", reading: "どれ", th: "อันไหน", easy: true },
  { jp: "なんぷん", reading: "なんぷん", alt: ["何分"], th: "กี่นาที", easy: false },
  { jp: "日本りょうり", ruby: [["日本", "にほん"]], reading: "にほんりょうり", alt: ["日本料理"], th: "อาหารญี่ปุ่น", easy: false },
  { jp: "ひるやすみ", reading: "ひるやすみ", alt: ["昼休み"], th: "พักกลางวัน", easy: false },
  { jp: "やきそば", reading: "やきそば", alt: ["焼きそば", "ยะกิโซะบะ"], th: "ยากิโซบะ", easy: true },
  { jp: "よる", reading: "よる", alt: ["夜"], th: "กลางคืน", easy: true }
];

const KANA_CHARTS = {
  hira: [
    "あ","い","う","え","お","か","き","く","け","こ",
    "さ","し","す","せ","そ","た","ち","つ","て","と",
    "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
    "ま","み","む","め","も","や","","ゆ","","よ",
    "ら","り","る","れ","ろ","わ","","を","","ん"
  ],
  kata: [
    "ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ",
    "サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト",
    "ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ",
    "マ","ミ","ム","メ","モ","ヤ","","ユ","","ヨ",
    "ラ","リ","ル","レ","ロ","ワ","","ヲ","","ン"
  ],
  dakuten: [
    "が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ",
    "だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ",
    "ぱ","ぴ","ぷ","ぺ","ぽ","っ","ゃ","ゅ","ょ","ー",
    "ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ",
    "ダ","ヂ","ヅ","デ","ド","バ","ビ","ブ","ベ","ボ",
    "パ","ピ","プ","ペ","ポ","ッ","ャ","ュ","ョ","・"
  ]
};

const state = {
  level: "easy",
  order: "random",
  mode: "mcq",
  furigana: true,
  questions: [],
  currentIndex: 0,
  selectedMcq: null,
  answered: false,
  isComposing: false,
  lastCompositionEnd: 0,
  results: [],
  timerInterval: null,
  secondsLeft: 50 * 60,
  inSession: false,
  currentKbdTab: "hira"
};

const $ = (id) => document.getElementById(id);

// ระบบธีม
function initTheme() {
  const savedTheme = localStorage.getItem("jp3_theme") || "dark";
  const savedAccent = localStorage.getItem("jp3_accent");
  applyTheme(savedTheme, false);
  if (savedAccent) {
    applyCustomAccent(savedAccent, false);
  }

  $("themeToggleBtn").addEventListener("click", () => {
    $("themeBackdrop").classList.remove("hidden");
    $("themePopover").classList.remove("hidden");
  });

  const closeTheme = () => {
    $("themeBackdrop").classList.add("hidden");
    $("themePopover").classList.add("hidden");
  };

  $("themeBackdrop").addEventListener("click", closeTheme);
  $("closeThemeBtn").addEventListener("click", closeTheme);

  document.querySelectorAll(".theme-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("jp3_accent");
      document.documentElement.style.removeProperty("--accent");
      document.documentElement.style.removeProperty("--accent-soft");
      document.documentElement.style.removeProperty("--accent-text");
      applyTheme(btn.dataset.themeVal, true);
    });
  });

  $("customColorInput").addEventListener("input", (e) => {
    applyCustomAccent(e.target.value, true);
  });
}

function applyTheme(themeName, save = true) {
  document.documentElement.setAttribute("data-theme", themeName);
  if (save) localStorage.setItem("jp3_theme", themeName);
  document.querySelectorAll(".theme-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.themeVal === themeName);
  });
  const computedAccent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  $("currentThemeDot").style.background = computedAccent;
}

function applyCustomAccent(hex, save = true) {
  document.documentElement.style.setProperty("--accent", hex);
  document.documentElement.style.setProperty("--accent-soft", hexToRgba(hex, 0.16));
  document.documentElement.style.setProperty("--accent-text", getContrastColor(hex));
  $("customColorInput").value = hex;
  $("customColorHex").textContent = hex.toUpperCase();
  $("currentThemeDot").style.background = hex;
  if (save) localStorage.setItem("jp3_accent", hex);
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getContrastColor(hex) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#0f172a" : "#ffffff";
}

// หน้าตั้งค่า
function initSetup() {
  bindOptionGroup("levelGroup", "level");
  bindOptionGroup("orderGroup", "order");
  bindOptionGroup("modeGroup", "mode");

  $("furiganaToggle").addEventListener("change", (e) => {
    if (state.mode === "exam") {
      e.target.checked = false;
      return;
    }
    state.furigana = e.target.checked;
  });

  $("startBtn").addEventListener("click", () => {
    const pool = getFilteredPool();
    startSession(pool);
  });
}

function bindOptionGroup(groupId, stateKey) {
  const group = $(groupId);
  group.querySelectorAll(".select-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("locked")) return;
      state[stateKey] = card.dataset.value;
      syncSetupUI();
    });
  });
}

function syncSetupUI() {
  const isExam = state.mode === "exam";

  // โหมดทดลองสอบ: บังคับ ทั้งหมด 67 คำ + เรียงตามลำดับ + ปิดฟุริกานะ
  if (isExam) {
    state.level = "all";
    state.order = "ordered";
    state.furigana = false;
  }

  ["levelGroup", "orderGroup", "modeGroup"].forEach((groupId) => {
    const key = groupId === "levelGroup" ? "level" : groupId === "orderGroup" ? "order" : "mode";
    $(groupId).querySelectorAll(".select-card").forEach((card) => {
      card.classList.toggle("active", card.dataset.value === state[key]);
      if (groupId !== "modeGroup") {
        card.classList.toggle("locked", isExam);
      }
    });
  });

  $("furiganaToggle").checked = state.furigana;
  $("furiganaToggle").disabled = isExam;
  $("furiganaRow").querySelector(".toggle-box").classList.toggle("locked", isExam);
  $("examNotice").classList.toggle("hidden", !isExam);
}

function getFilteredPool() {
  const base = state.level === "easy" ? VOCAB_DATA.filter((w) => w.easy) : [...VOCAB_DATA];
  if (state.order === "random" && state.mode !== "exam") {
    return shuffleArray(base);
  }
  return base;
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// เริ่มรอบฝึก / สอบ
function startSession(pool) {
  state.questions = pool;
  state.currentIndex = 0;
  state.results = [];
  state.answered = false;
  state.selectedMcq = null;
  state.inSession = true;

  if (location.hash !== "#session") {
    history.pushState({ page: "session" }, "", "#session");
  }

  $("setupScreen").classList.add("hidden");
  $("resultScreen").classList.add("hidden");
  $("quizScreen").classList.remove("hidden");

  stopTimer();
  if (state.mode === "exam") {
    state.secondsLeft = 50 * 60;
    $("timerBadge").classList.remove("hidden", "warn", "danger");
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      state.secondsLeft--;
      updateTimerDisplay();
      if (state.secondsLeft <= 0) {
        stopTimer();
        finishSession(true);
      }
    }, 1000);
  } else {
    $("timerBadge").classList.add("hidden");
  }

  renderQuestion();
}

function updateTimerDisplay() {
  const mins = Math.floor(Math.max(0, state.secondsLeft) / 60);
  const secs = Math.max(0, state.secondsLeft) % 60;
  $("timerText").textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const badge = $("timerBadge");
  badge.classList.remove("warn", "danger");
  if (state.secondsLeft <= 180) {
    badge.classList.add("danger");
  } else if (state.secondsLeft <= 600) {
    badge.classList.add("warn");
  }
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

// แสดงคำถาม
function renderQuestion() {
  const item = state.questions[state.currentIndex];
  const total = state.questions.length;
  state.answered = false;
  state.selectedMcq = null;
  state.isComposing = false;

  $("progressText").textContent = `${state.currentIndex + 1} / ${total}`;
  $("progressFill").style.width = `${((state.currentIndex + 1) / total) * 100}%`;
  $("qCounter").textContent = `ข้อที่ ${state.currentIndex + 1}`;
  $("feedbackBox").classList.add("hidden");
  $("feedbackBox").className = "feedback-box hidden";

  const isJpAnswer = state.mode === "type_jp" || state.mode === "exam";
  $("qDirectionTag").textContent = isJpAnswer ? "ไทย → ญี่ปุ่น" : "ญี่ปุ่น → ไทย";

  if (isJpAnswer) {
    $("qPrompt").removeAttribute("lang");
    $("qPrompt").textContent = item.th;
    $("qHint").classList.add("hidden");
  } else {
    $("qPrompt").setAttribute("lang", "ja");
    $("qPrompt").innerHTML = formatJapanesePrompt(item);
    $("qHint").classList.add("hidden");
  }

  if (state.mode === "mcq") {
    $("mcqSection").classList.remove("hidden");
    $("inputSection").classList.add("hidden");
    renderMcqOptions(item);
    $("actionBtn").textContent = "ยืนยันคำตอบ";
    $("actionBtn").disabled = true;
  } else {
    $("mcqSection").classList.add("hidden");
    $("inputSection").classList.remove("hidden");

    const input = $("answerInput");
    input.value = "";
    input.disabled = false;
    input.readOnly = false;
    input.placeholder = isJpAnswer
      ? "แตะที่นี่เพื่อเขียน/พิมพ์ภาษาญี่ปุ่น..."
      : "แตะที่นี่เพื่อพิมพ์คำแปลภาษาไทย...";

    $("kbdToggleBtn").classList.toggle("hidden", !isJpAnswer);
    if (!isJpAnswer) {
      $("builtinKbd").classList.add("hidden");
    }

    $("inputHelperText").textContent =
      state.mode === "exam"
        ? "เขียน/พิมพ์คำตอบแล้วกดปุ่มบันทึกด้านล่าง"
        : "แตะช่องพิมพ์ด้านบน (รองรับแป้นเขียนมือ Gboard ทุกภาษา)";

    $("actionBtn").textContent =
      state.mode === "exam"
        ? state.currentIndex === total - 1
          ? "ส่งข้อสอบทั้งหมด"
          : "บันทึกและไปข้อถัดไป"
        : "ยืนยันคำตอบ";
    $("actionBtn").disabled = false;
  }
}

function formatJapanesePrompt(item) {
  if (!state.furigana || !item.ruby) {
    return escapeHtml(item.jp);
  }
  let html = escapeHtml(item.jp);
  item.ruby.forEach(([kanji, kana]) => {
    html = html.replace(
      escapeHtml(kanji),
      `<ruby>${escapeHtml(kanji)}<rt>${escapeHtml(kana)}</rt></ruby>`
    );
  });
  return html;
}

function renderMcqOptions(correctItem) {
  const container = $("mcqSection");
  container.innerHTML = "";

  const distractors = shuffleArray(VOCAB_DATA.filter((w) => w.jp !== correctItem.jp)).slice(0, 3);
  const choices = shuffleArray([correctItem, ...distractors]);

  choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mcq-btn";
    btn.dataset.th = choice.th;
    btn.innerHTML = `<span class="mcq-num">${idx + 1}</span><span>${escapeHtml(choice.th)}</span>`;

    btn.addEventListener("click", () => {
      if (state.answered) return;
      state.selectedMcq = choice.th;
      container.querySelectorAll(".mcq-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      $("actionBtn").disabled = false;
    });

    container.appendChild(btn);
  });
}

// ตรวจคำตอบและไปข้อถัดไป
function handleAction() {
  const item = state.questions[state.currentIndex];
  const total = state.questions.length;

  // โหมดทดลองสอบจริง
  if (state.mode === "exam") {
    const userVal = $("answerInput").value.trim();
    const isCorrect = checkJapaneseAnswer(userVal, item);
    state.results.push({
      item,
      userAnswer: userVal || "(ไม่ได้ตอบ)",
      correctAnswer: `${item.jp} (${item.reading})`,
      isCorrect
    });

    if (state.currentIndex + 1 < total) {
      state.currentIndex++;
      renderQuestion();
      $("answerInput").focus();
    } else {
      finishSession(false);
    }
    return;
  }

  // โหมดฝึกปกติ
  if (!state.answered) {
    state.answered = true;
    let isCorrect = false;
    let userAnswer = "";
    let correctAnswer = "";

    if (state.mode === "mcq") {
      userAnswer = state.selectedMcq || "";
      correctAnswer = item.th;
      isCorrect = userAnswer === correctAnswer;

      $("mcqSection").querySelectorAll(".mcq-btn").forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.th === correctAnswer) {
          btn.classList.add("correct");
        } else if (btn.dataset.th === userAnswer && !isCorrect) {
          btn.classList.add("wrong");
        }
      });
    } else if (state.mode === "type_th") {
      userAnswer = $("answerInput").value.trim();
      correctAnswer = item.th;
      isCorrect = checkThaiAnswer(userAnswer, item);
      $("answerInput").disabled = true;
    } else if (state.mode === "type_jp") {
      userAnswer = $("answerInput").value.trim();
      correctAnswer =
        item.jp === item.reading ? item.jp : `${item.jp} (${item.reading})`;
      isCorrect = checkJapaneseAnswer(userAnswer, item);
      $("answerInput").disabled = true;
    }

    state.results.push({
      item,
      userAnswer: userAnswer || "(ไม่ได้ตอบ)",
      correctAnswer,
      isCorrect
    });

    const fb = $("feedbackBox");
    fb.classList.remove("hidden");
    fb.classList.add(isCorrect ? "correct" : "wrong");
    fb.innerHTML = isCorrect
      ? `✅ <strong>ถูกต้อง!</strong> เฉลย: ${escapeHtml(correctAnswer)}`
      : `❌ <strong>ยังไม่ถูก</strong> • เฉลยคือ: <strong>${escapeHtml(correctAnswer)}</strong>`;

    $("actionBtn").textContent =
      state.currentIndex + 1 < total ? "ข้อถัดไป →" : "ดูสรุปผลคะแนน";
    $("actionBtn").disabled = false;
  } else {
    if (state.currentIndex + 1 < total) {
      state.currentIndex++;
      renderQuestion();
      if (state.mode !== "mcq") {
        $("answerInput").focus();
      }
    } else {
      finishSession(false);
    }
  }
}

// ตรวจคำตอบภาษาญี่ปุ่น (รับทั้งคันจิที่เขียนด้วยมือ, ฮิรางานะ, คาตาคานะ)
function normalizeJp(str) {
  return str
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[~〜～ー－‐\-。．.・／/\s　()（）]/g, "")
    .replace(/[ァ-ヶ]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );
}

function checkJapaneseAnswer(userInput, item) {
  const normUser = normalizeJp(userInput);
  if (!normUser) return false;

  const candidates = [item.jp, item.reading, ...(item.alt || [])];
  return candidates.some((cand) => normalizeJp(cand) === normUser);
}

// ตรวจคำตอบภาษาไทย
function normalizeTh(str) {
  return str
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[.…()（）\s]/g, "");
}

function checkThaiAnswer(userInput, item) {
  const normUser = normalizeTh(userInput);
  if (!normUser) return false;

  const fullNorm = normalizeTh(item.th);
  if (normUser === fullNorm) return true;

  const parts = item.th
    .replace(/\([^)]*\)/g, "")
    .replace(/[.…]/g, "")
    .split(/\s+/)
    .map((p) => normalizeTh(p))
    .filter((p) => p.length >= 2);

  if (parts.some((p) => p === normUser)) return true;

  if (item.jp === "えっ" && (normUser.includes("ประหลาดใจ") || normUser.includes("ตกใจ") || normUser.includes("อุทาน"))) {
    return true;
  }

  return false;
}

// หน้าสรุปผล
function finishSession(isTimeout) {
  stopTimer();
  $("quizScreen").classList.add("hidden");
  $("resultScreen").classList.remove("hidden");

  const total = state.results.length;
  const correctCount = state.results.filter((r) => r.isCorrect).length;
  const wrongItems = state.results.filter((r) => !r.isCorrect).map((r) => r.item);

  if (state.mode === "exam") {
    const usedSec = Math.max(0, 50 * 60 - state.secondsLeft);
    const usedMin = Math.floor(usedSec / 60);
    const usedRemSec = usedSec % 60;
    $("resultBadge").textContent = isTimeout ? "หมดเวลาสอบ 50 นาที" : "ส่งข้อสอบเรียบร้อย";
    $("resultTitle").textContent = "ผลคะแนนทดลองสอบ";
    $("resultScoreMain").textContent = `ได้ ${correctCount} เต็ม ${total} คะแนน`;
    $("resultSub").textContent = `ใช้เวลาทำข้อสอบ ${usedMin} นาที ${usedRemSec} วินาที`;
  } else {
    $("resultBadge").textContent = "เสร็จสิ้นการฝึก";
    $("resultTitle").textContent = "สรุปผลการฝึกคำศัพท์";
    $("resultScoreMain").textContent = `${correctCount} / ${total}`;
    $("resultSub").textContent =
      wrongItems.length === 0
        ? "สุดยอด! ตอบถูกครบทุกคำเลย"
        : `ตอบถูก ${correctCount} คำ • ผิด ${wrongItems.length} คำ`;
  }

  const retryBtn = $("retryWrongBtn");
  if (wrongItems.length > 0) {
    retryBtn.classList.remove("hidden");
    retryBtn.textContent = `ฝึกเฉพาะคำที่ผิดซ้ำ (${wrongItems.length} คำ)`;
    retryBtn.onclick = () => {
      if (state.mode === "exam") {
        state.mode = "type_jp";
        syncSetupUI();
      }
      startSession(wrongItems);
    };
  } else {
    retryBtn.classList.add("hidden");
  }

  const list = $("reviewList");
  list.innerHTML = "";
  state.results.forEach((res, idx) => {
    const div = document.createElement("div");
    div.className = `review-item ${res.isCorrect ? "ok" : "no"}`;
    div.innerHTML = `
      <div class="review-top">
        <span>${idx + 1}. ${escapeHtml(res.item.jp)} — ${escapeHtml(res.item.th)}</span>
        <span>${res.isCorrect ? "✅" : "❌"}</span>
      </div>
      <div class="review-detail">
        คำตอบของคุณ: <strong>${escapeHtml(res.userAnswer)}</strong>
        ${!res.isCorrect ? ` • เฉลย: <strong>${escapeHtml(res.correctAnswer)}</strong>` : ""}
      </div>
    `;
    list.appendChild(div);
  });
}

// จัดการช่องพิมพ์ & Gboard Handwriting (ไม่แปลงโรมันจิ ไม่บล็อกแป้นพิมพ์)
function initInputAndKeyboard() {
  const form = $("answerForm");
  const input = $("answerInput");

  // ป้องกัน form submit รีเฟรชหน้า
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // ติดตามสถานะการเขียนด้วยมือ / การแปลงตัวคันจิของ Gboard (IME Composition)
  input.addEventListener("compositionstart", () => {
    state.isComposing = true;
  });

  input.addEventListener("compositionupdate", () => {
    state.isComposing = true;
  });

  input.addEventListener("compositionend", () => {
    state.isComposing = false;
    state.lastCompositionEnd = Date.now();
  });

  // กันปุ่ม Enter เด้งส่งคำตอบตอนเพิ่งจิ้มเลือกตัวคันจิจาก Gboard Handwriting
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const justFinishedIme = Date.now() - state.lastCompositionEnd < 160;
      if (state.isComposing || e.isComposing || e.keyCode === 229 || justFinishedIme) {
        return;
      }
      e.preventDefault();
      if (!$("actionBtn").disabled) {
        handleAction();
      }
    }
  });

  // แป้นพิมพ์สำรองในหน้าเว็บ (เปิดเมื่อกดปุ่มเท่านั้น)
  $("kbdToggleBtn").addEventListener("click", () => {
    const kbd = $("builtinKbd");
    kbd.classList.toggle("hidden");
    if (!kbd.classList.contains("hidden")) {
      renderBuiltinKbd(state.currentKbdTab);
    }
  });

  document.querySelectorAll(".kbd-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.currentKbdTab = tab.dataset.script;
      document.querySelectorAll(".kbd-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderBuiltinKbd(state.currentKbdTab);
    });
  });

  $("kbdBackspaceBtn").addEventListener("click", () => {
    if (input.disabled) return;
    input.value = input.value.slice(0, -1);
  });

  $("kbdClearBtn").addEventListener("click", () => {
    if (input.disabled) return;
    input.value = "";
  });

  // คีย์ลัดสำหรับโหมด 4 ตัวเลือก
  document.addEventListener("keydown", (e) => {
    if ($("quizScreen").classList.contains("hidden")) return;
    if (!$("confirmBackdrop").classList.contains("hidden")) return;

    if (state.mode === "mcq") {
      if (["1", "2", "3", "4"].includes(e.key) && !state.answered) {
        const idx = Number(e.key) - 1;
        const btns = $("mcqSection").querySelectorAll(".mcq-btn");
        if (btns[idx]) btns[idx].click();
      } else if (e.key === "Enter" && !$("actionBtn").disabled) {
        e.preventDefault();
        handleAction();
      }
    }
  });
}

function renderBuiltinKbd(scriptKey) {
  const grid = $("kbdGrid");
  grid.innerHTML = "";
  const chars = KANA_CHARTS[scriptKey] || KANA_CHARTS.hira;
  const input = $("answerInput");

  chars.forEach((ch) => {
    const btn = document.createElement("button");
    btn.type = "button";
    if (!ch) {
      btn.className = "kana-key empty";
      btn.tabIndex = -1;
    } else {
      btn.className = "kana-key";
      btn.textContent = ch;
      btn.addEventListener("click", () => {
        if (input.disabled) return;
        input.value += ch;
      });
    }
    grid.appendChild(btn);
  });
}

// ระบบยืนยันการกดย้อนกลับ (ปุ่มบนเว็บ + ปุ่ม/ปัดย้อนกลับมือถือ)
function initNavigationConfirm() {
  const openConfirmModal = () => {
    $("confirmTitle").textContent =
      state.mode === "exam" && !$("quizScreen").classList.contains("hidden")
        ? "ออกจากการทดลองสอบไหม?"
        : "กลับไปหน้าตั้งค่าหลักไหม?";
    $("confirmDesc").textContent =
      state.mode === "exam" && !$("quizScreen").classList.contains("hidden")
        ? "เวลาสอบและคำตอบที่ทำไว้ในรอบนี้จะหายทั้งหมด"
        : "ความคืบหน้าในรอบปัจจุบันจะยังไม่ถูกบันทึก";
    $("confirmBackdrop").classList.remove("hidden");
  };

  const closeConfirmModal = () => {
    $("confirmBackdrop").classList.add("hidden");
  };

  const returnToSetup = () => {
    closeConfirmModal();
    stopTimer();
    state.inSession = false;
    $("quizScreen").classList.add("hidden");
    $("resultScreen").classList.add("hidden");
    $("setupScreen").classList.remove("hidden");
    if (location.hash === "#session") {
      history.replaceState(null, "", location.pathname + location.search);
    }
  };

  $("backBtn").addEventListener("click", openConfirmModal);
  $("backHomeResultBtn").addEventListener("click", openConfirmModal);

  $("confirmStayBtn").addEventListener("click", () => {
    closeConfirmModal();
    if (state.inSession && location.hash !== "#session") {
      history.pushState({ page: "session" }, "", "#session");
    }
  });

  $("confirmLeaveBtn").addEventListener("click", returnToSetup);

  window.addEventListener("popstate", () => {
    if (state.inSession) {
      history.pushState({ page: "session" }, "", "#session");
      openConfirmModal();
    }
  });

  $("actionBtn").addEventListener("click", handleAction);
  $("restartAllBtn").addEventListener("click", () => {
    startSession(getFilteredPool());
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// เริ่มทำงาน
initTheme();
initSetup();
syncSetupUI();
initInputAndKeyboard();
initNavigationConfirm();
