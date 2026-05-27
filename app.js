const STORAGE_KEY = "okinawa-pwa-state-v1";
const DEFAULT_CITY = "Onna, Okinawa";
const FALLBACK_JPY_TO_TWD = 0.214;
const ROOM_QUERY = new URLSearchParams(window.location.search).get("room");
const DEFAULT_SYNC_ROOM = sanitizeRoomId(ROOM_QUERY) || "okinawa-shared-trip";
const FIREBASE_COLLECTION_NAME = window.TRIP_FIREBASE_OPTIONS?.collectionName || "sharedTrips";
const TRIP_DATES = [
  "2026-06-13",
  "2026-06-14",
  "2026-06-15",
  "2026-06-16",
  "2026-06-17"
];

const itineraryData = [
  {
    id: 1,
    label: "DAY 1",
    date: "6/13",
    title: "出發日",
    items: [
      {
        id: "d1-flight",
        time: "10:05 - 12:40",
        title: "桃園機場 -> 那霸機場",
        note: "預留 2 到 3 小時辦理報到與託運，降落後可直接接租車接駁。",
        map: "https://www.google.com/maps/search/?api=1&query=Naha+Airport"
      },
      {
        id: "d1-rentcar",
        time: "08:00 - 19:00",
        title: "OTS 租車（臨空豐崎店）",
        note: "領車時確認保險、ETC、油種與還車規則，右駕第一天先慢慢適應。",
        map: "https://www.google.com/maps/search/?api=1&query=OTS+Rent-a-car+Rinku+Toyosaki"
      },
      {
        id: "d1-aw",
        time: "午餐",
        title: "A&W 牧港店",
        note: "推薦圈圈薯條、Root Beer，美式復古感很適合旅程第一站。",
        map: "https://www.google.com/maps/search/?api=1&query=A%26W+Makiminato"
      },
      {
        id: "d1-manzamo",
        time: "下午",
        title: "萬座毛",
        note: "海景步道非常舒服，若天氣好可以安排看夕陽。",
        map: "https://www.google.com/maps/search/?api=1&query=Manzamo+Okinawa"
      },
      {
        id: "d1-hotel",
        time: "15:00 後可入住",
        title: "ANA InterContinental Manza Beach Resort",
        note: "第一晚入住萬座海濱洲際，海景與飯店設施都很完整。",
        map: "https://www.google.com/maps/search/?api=1&query=ANA+InterContinental+Manza+Beach+Resort"
      }
    ]
  },
  {
    id: 2,
    label: "DAY 2",
    date: "6/14",
    title: "海底奇境",
    items: [
      {
        id: "d2-bluecave",
        time: "07:00 - 19:00",
        title: "青之洞窟",
        note: "浮潛或潛水建議提前 30 分鐘到集合點，天況不佳時先確認店家公告。",
        map: "https://www.google.com/maps/search/?api=1&query=Cape+Maeda+Blue+Cave"
      },
      {
        id: "d2-free",
        time: "下午",
        title: "飯店放空時間",
        note: "回飯店休息、泳池或沙灘散步，保留一段慢節奏度假感。",
        map: "https://www.google.com/maps/search/?api=1&query=ANA+InterContinental+Manza+Beach+Resort"
      },
      {
        id: "d2-dinner",
        time: "17:30 - 21:30",
        title: "ANA 飯店晚餐",
        note: "可以直接安排飯店內用餐，省去晚上再開車奔波。",
        map: "https://www.google.com/maps/search/?api=1&query=ANA+InterContinental+Manza+Beach+Resort"
      }
    ]
  },
  {
    id: 3,
    label: "DAY 3",
    date: "6/15",
    title: "北部經典遊",
    items: [
      {
        id: "d3-aquarium",
        time: "08:30 - 20:00",
        title: "美麗海水族館",
        note: "黑潮之海大水槽與鯨鯊必看，也可以順便安排海豚秀。",
        map: "https://www.google.com/maps/search/?api=1&query=Okinawa+Churaumi+Aquarium"
      },
      {
        id: "d3-kouri",
        time: "中午前後",
        title: "古宇利島",
        note: "跨海大橋的景色非常經典，適合安排拍照與短暫散步。",
        map: "https://www.google.com/maps/search/?api=1&query=Kouri+Island+Okinawa"
      },
      {
        id: "d3-shrimp",
        time: "11:00 - 16:00",
        title: "KOURI SHRIMP",
        note: "蝦蝦飯很熱門，若怕排隊可避開正中午。",
        map: "https://www.google.com/maps/search/?api=1&query=Kouri+Shrimp"
      }
    ]
  },
  {
    id: 4,
    label: "DAY 4",
    date: "6/16",
    title: "異國浪漫夜",
    items: [
      {
        id: "d4-american",
        time: "11:00 - 21:00",
        title: "美國村",
        note: "黃昏後的燈景很有氣氛，適合安排晚餐與散步。",
        map: "https://www.google.com/maps/search/?api=1&query=Mihama+American+Village"
      },
      {
        id: "d4-pack",
        time: "晚上",
        title: "整理最後一晚行李",
        note: "伴手禮先分類，隔天採買與還車會輕鬆很多。",
        map: "https://www.google.com/maps/search/?api=1&query=ANA+InterContinental+Manza+Beach+Resort"
      }
    ]
  },
  {
    id: 5,
    label: "DAY 5",
    date: "6/17",
    title: "滿載而歸",
    items: [
      {
        id: "d5-parco",
        time: "10:00 - 22:00",
        title: "浦添 PARCO CITY",
        note: "好停車、品牌多，適合最後一波採買。",
        map: "https://www.google.com/maps/search/?api=1&query=SANA+Urasoe+West+Coast+PARCO+CITY"
      },
      {
        id: "d5-kokusai",
        time: "10:00 - 22:00",
        title: "國際通",
        note: "若要買名產或藥妝，可以抓一小段時間快逛。",
        map: "https://www.google.com/maps/search/?api=1&query=Naha+Kokusai-dori+Shopping+Street"
      },
      {
        id: "d5-return",
        time: "16:30 前後",
        title: "還車並前往機場",
        note: "記得先加滿油，保留最後一張加油收據。",
        map: "https://www.google.com/maps/search/?api=1&query=OTS+Rent-a-car+Rinku+Toyosaki"
      },
      {
        id: "d5-home",
        time: "18:55 起飛",
        title: "那霸機場 -> 桃園機場",
        note: "旅程收尾，帶著戰利品與照片回家。",
        map: "https://www.google.com/maps/search/?api=1&query=Naha+Airport"
      }
    ]
  }
];

const defaultChecklist = [
  { id: crypto.randomUUID(), text: "護照", done: false },
  { id: crypto.randomUUID(), text: "台灣駕照正本", done: false },
  { id: crypto.randomUUID(), text: "日文駕照譯本", done: false },
  { id: crypto.randomUUID(), text: "租車預約資料", done: false },
  { id: crypto.randomUUID(), text: "泳裝與防曬", done: false },
  { id: crypto.randomUUID(), text: "eSIM / 網卡", done: false }
];

const state = loadState();
let deferredInstallPrompt = null;
let firebaseApp = null;
let firestoreDb = null;
let syncUnsubscribe = null;
let isApplyingRemoteSync = false;
let lastPushedSyncRevision = null;
let syncPushTimer = null;

const elements = {
  topTabs: [...document.querySelectorAll(".top-tab")],
  panels: [...document.querySelectorAll(".tab-panel")],
  dayTabs: document.getElementById("day-tabs"),
  dayView: document.getElementById("day-view"),
  checklistForm: document.getElementById("checklist-form"),
  checklistInput: document.getElementById("checklist-input"),
  checklistItems: document.getElementById("checklist-items"),
  expenseForm: document.getElementById("expense-form"),
  expenseItems: document.getElementById("expense-items"),
  expenseCount: document.getElementById("expense-count"),
  expenseTotalJpy: document.getElementById("expense-total-jpy"),
  expenseTotalTwd: document.getElementById("expense-total-twd"),
  expenseAverage: document.getElementById("expense-average"),
  expenseFilterDate: document.getElementById("expense-filter-date"),
  expenseFilterPayer: document.getElementById("expense-filter-payer"),
  expenseFilterCategory: document.getElementById("expense-filter-category"),
  expenseFilterSummary: document.getElementById("expense-filter-summary"),
  weatherForm: document.getElementById("weather-form"),
  weatherLocation: document.getElementById("weather-location"),
  weatherUpdatedAt: document.getElementById("weather-updated-at"),
  weatherRangeNote: document.getElementById("weather-range-note"),
  weatherCurrentTemp: document.getElementById("weather-current-temp"),
  weatherCurrentText: document.getElementById("weather-current-text"),
  weatherCurrentRain: document.getElementById("weather-current-rain"),
  weatherCurrentWind: document.getElementById("weather-current-wind"),
  weatherForecast: document.getElementById("weather-forecast"),
  exchangeUpdatedAt: document.getElementById("exchange-updated-at"),
  exchangeRateTwdJpy: document.getElementById("exchange-rate-twd-jpy"),
  exchangeRateJpyTwd: document.getElementById("exchange-rate-jpy-twd"),
  converterForm: document.getElementById("converter-form"),
  converterAmount: document.getElementById("convert-amount"),
  converterDirection: document.getElementById("convert-direction"),
  converterOutput: document.getElementById("converter-output"),
  syncForm: document.getElementById("sync-form"),
  syncRoomId: document.getElementById("sync-room-id"),
  syncStatusPill: document.getElementById("sync-status-pill"),
  syncSetupNote: document.getElementById("sync-setup-note"),
  disconnectSyncButton: document.getElementById("disconnect-sync-button"),
  copyShareLinkButton: document.getElementById("copy-share-link-button"),
  installButton: document.getElementById("install-button"),
  refreshDataButton: document.getElementById("refresh-data-button")
};

bindEvents();
renderAll();
registerServiceWorker();
void bootstrapSync();
void refreshRemoteData({ silent: true });

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createInitialState();
  }

  try {
    const parsed = JSON.parse(raw);
    const mergedChecklist = mergeChecklistWithDefaults(
      Array.isArray(parsed.checklist) ? parsed.checklist : []
    );
    return {
      activeTab: parsed.activeTab || "itinerary",
      activeDay: parsed.activeDay || 1,
      checklist: mergedChecklist.length ? mergedChecklist : defaultChecklist,
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
      expenseFilters: parsed.expenseFilters || { date: "ALL", payer: "ALL", category: "ALL" },
      sync: createSyncState(parsed.sync),
      weather: parsed.weather || { location: DEFAULT_CITY, forecast: null, updatedAt: null },
      exchange: parsed.exchange || { liveRate: null, updatedAt: null }
    };
  } catch (error) {
    console.error("state parse failed", error);
    return createInitialState();
  }
}

function createInitialState() {
  return {
    activeTab: "itinerary",
    activeDay: 1,
    checklist: mergeChecklistWithDefaults([]),
    expenses: [],
    expenseFilters: { date: "ALL", payer: "ALL", category: "ALL" },
    sync: createSyncState(),
    weather: { location: DEFAULT_CITY, forecast: null, updatedAt: null },
    exchange: { liveRate: null, updatedAt: null }
  };
}

function createSyncState(savedSync = {}) {
  const roomId = sanitizeRoomId(ROOM_QUERY) || sanitizeRoomId(savedSync.roomId) || DEFAULT_SYNC_ROOM;
  return {
    enabled: ROOM_QUERY ? true : Boolean(savedSync.enabled),
    roomId,
    connected: false,
    lastSyncedAt: savedSync.lastSyncedAt || null
  };
}

function mergeChecklistWithDefaults(currentChecklist) {
  const existingTexts = new Set(
    currentChecklist
      .map((item) => item?.text?.trim())
      .filter(Boolean)
  );

  const missingDefaults = defaultChecklist
    .filter((item) => !existingTexts.has(item.text))
    .map((item) => ({ ...item, id: crypto.randomUUID() }));

  return [...currentChecklist, ...missingDefaults];
}

function saveState() {
  saveStateWithoutSync();
  scheduleSharedStatePush();
}

function saveStateWithoutSync() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function scheduleSharedStatePush() {
  if (!state.sync?.enabled || !state.sync?.connected || !hasFirebaseConfig() || isApplyingRemoteSync) {
    return;
  }

  if (syncPushTimer) {
    window.clearTimeout(syncPushTimer);
  }

  syncPushTimer = window.setTimeout(async () => {
    syncPushTimer = null;
    try {
      await pushSharedState(false);
    } catch (error) {
      console.error("firebase sync push failed", error);
      state.sync.connected = false;
      saveStateWithoutSync();
      renderSync();
    }
  }, 260);
}

function bindEvents() {
  elements.topTabs.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;
      saveState();
      renderTabs();
    });
  });

  elements.checklistForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = elements.checklistInput.value.trim();
    if (!text) {
      return;
    }

    state.checklist.unshift({ id: crypto.randomUUID(), text, done: false });
    elements.checklistInput.value = "";
    saveState();
    renderChecklist();
  });

  elements.expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(document.getElementById("expense-amount").value);
    if (!amount) {
      return;
    }

    const currency = document.getElementById("expense-currency").value;
    const jpyAmount = currency === "JPY" ? amount : amount / getEffectiveRate();
    state.expenses.unshift({
      id: crypto.randomUUID(),
      date: document.getElementById("expense-date").value || "未填日期",
      category: document.getElementById("expense-category").value,
      amount,
      currency,
      payer: document.getElementById("expense-payer").value,
      jpyAmount,
      note: document.getElementById("expense-note").value.trim()
    });

    elements.expenseForm.reset();
    document.getElementById("expense-date").value = "2026-06-13";
    document.getElementById("expense-currency").value = "JPY";
    document.getElementById("expense-payer").value = "YY";
    saveState();
    renderExpenses();
  });

  elements.weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    state.weather.location = elements.weatherLocation.value.trim() || DEFAULT_CITY;
    saveState();
    await refreshWeather();
  });

  elements.converterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderConverter();
  });

  elements.refreshDataButton.addEventListener("click", async () => {
    await refreshRemoteData({ silent: false });
  });

  elements.syncForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    state.sync.roomId = sanitizeRoomId(elements.syncRoomId.value) || DEFAULT_SYNC_ROOM;
    state.sync.enabled = true;
    saveStateWithoutSync();
    updateRoomUrl(state.sync.roomId);
    await startSharedSync();
  });

  elements.disconnectSyncButton.addEventListener("click", () => {
    stopSharedSync();
    state.sync.enabled = false;
    state.sync.connected = false;
    saveStateWithoutSync();
    clearRoomUrl();
    renderSync();
  });

  elements.copyShareLinkButton.addEventListener("click", async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("room", sanitizeRoomId(state.sync.roomId) || DEFAULT_SYNC_ROOM);
    try {
      await navigator.clipboard.writeText(shareUrl.toString());
      elements.syncStatusPill.textContent = "連結已複製";
      window.setTimeout(() => renderSync(), 1200);
    } catch (error) {
      window.prompt("請手動複製這個共用連結", shareUrl.toString());
    }
  });

  elements.expenseFilterDate.addEventListener("change", () => {
    state.expenseFilters.date = elements.expenseFilterDate.value;
    saveState();
    renderExpenses();
  });

  elements.expenseFilterPayer.addEventListener("change", () => {
    state.expenseFilters.payer = elements.expenseFilterPayer.value;
    saveState();
    renderExpenses();
  });

  elements.expenseFilterCategory.addEventListener("change", () => {
    state.expenseFilters.category = elements.expenseFilterCategory.value;
    saveState();
    renderExpenses();
  });

  elements.installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    elements.installButton.hidden = true;
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    elements.installButton.hidden = false;
  });
}

function renderAll() {
  renderTabs();
  renderItinerary();
  renderChecklist();
  renderExpenses();
  renderWeather();
  renderExchange();
  renderSync();
  document.getElementById("expense-date").value ||= "2026-06-13";
}

function renderTabs() {
  elements.topTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
  });

  elements.panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `tab-${state.activeTab}`);
  });
}

function renderItinerary() {
  elements.dayTabs.innerHTML = "";
  itineraryData.forEach((day) => {
    const button = document.createElement("button");
    button.className = `day-tab${day.id === state.activeDay ? " is-active" : ""}`;
    button.textContent = day.label;
    button.addEventListener("click", () => {
      state.activeDay = day.id;
      saveState();
      renderItinerary();
    });
    elements.dayTabs.appendChild(button);
  });

  const activeDay = itineraryData.find((day) => day.id === state.activeDay) || itineraryData[0];
  elements.dayView.innerHTML = "";

  const dayHeader = document.createElement("div");
  dayHeader.className = "day-header";
  dayHeader.innerHTML = `
    <div>
      <p class="section-kicker">${activeDay.label} · ${activeDay.date}</p>
      <h3>${activeDay.title}</h3>
    </div>
  `;
  elements.dayView.appendChild(dayHeader);

  const timeline = document.createElement("div");
  timeline.className = "itinerary-timeline";
  elements.dayView.appendChild(timeline);

  const template = document.getElementById("itinerary-card-template");
  activeDay.items.forEach((item, index) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".itinerary-card");
    const time = fragment.querySelector(".itinerary-card__time");
    const title = fragment.querySelector("h3");
    const note = fragment.querySelector(".itinerary-card__note");
    const mapLink = fragment.querySelector(".map-link");

    card.classList.toggle("is-last", index === activeDay.items.length - 1);
    time.textContent = item.time;
    title.textContent = item.title;
    note.textContent = item.note;
    mapLink.href = item.map;

    timeline.appendChild(fragment);
  });
}

function renderChecklist() {
  elements.checklistItems.innerHTML = "";

  if (!state.checklist.length) {
    elements.checklistItems.innerHTML = `<div class="empty-state">還沒有行前項目，先新增一個吧。</div>`;
    return;
  }

  state.checklist.forEach((item) => {
    const row = document.createElement("article");
    row.className = "stack-item";
    row.innerHTML = `
      <div>
        <p class="stack-item__title"></p>
      </div>
      <div class="stack-item__actions">
        <button class="icon-button" type="button" aria-label="編輯項目" title="編輯">
          <svg aria-hidden="true" viewBox="0 0 24 24" class="icon-button__svg">
            <path d="M4 20l4.2-1 9.4-9.4-3.2-3.2L5 15.8 4 20z"></path>
            <path d="M13.8 5.6l3.2 3.2"></path>
          </svg>
        </button>
        <button class="icon-button icon-button--danger" type="button" aria-label="刪除項目" title="刪除">
          <svg aria-hidden="true" viewBox="0 0 24 24" class="icon-button__svg">
            <path d="M6 7h12"></path>
            <path d="M9 7V5h6v2"></path>
            <path d="M8 7l.8 11h6.4L16 7"></path>
            <path d="M10 11v4"></path>
            <path d="M14 11v4"></path>
          </svg>
        </button>
      </div>
    `;

    row.querySelector(".stack-item__title").textContent = item.text;
    const [editButton, deleteButton] = row.querySelectorAll(".icon-button");

    editButton.addEventListener("click", () => {
      const nextText = window.prompt("修改項目內容", item.text);
      if (!nextText) {
        return;
      }
      const trimmed = nextText.trim();
      if (!trimmed) {
        return;
      }
      item.text = trimmed;
      saveState();
      renderChecklist();
    });

    deleteButton.addEventListener("click", () => {
      state.checklist = state.checklist.filter((entry) => entry.id !== item.id);
      saveState();
      renderChecklist();
    });

    elements.checklistItems.appendChild(row);
  });
}

function renderExpenses() {
  renderExpenseDateFilterOptions();
  elements.expenseFilterDate.value = state.expenseFilters?.date || "ALL";
  elements.expenseFilterPayer.value = state.expenseFilters?.payer || "ALL";
  elements.expenseFilterCategory.value = state.expenseFilters?.category || "ALL";
  const filteredExpenses = getFilteredExpenses();
  const effectiveRate = getEffectiveRate();
  const totalJpy = filteredExpenses.reduce((sum, item) => sum + item.jpyAmount, 0);
  const totalTwd = totalJpy * effectiveRate;
  const average = filteredExpenses.length ? totalJpy / filteredExpenses.length : 0;

  elements.expenseCount.textContent = `${filteredExpenses.length} 筆支出`;
  elements.expenseTotalJpy.textContent = formatCurrency(totalJpy, "JPY");
  elements.expenseTotalTwd.textContent = formatCurrency(totalTwd, "TWD");
  elements.expenseAverage.textContent = formatCurrency(average, "JPY");
  elements.expenseFilterSummary.textContent = buildExpenseFilterSummary(filteredExpenses.length);
  elements.expenseItems.innerHTML = "";

  if (!filteredExpenses.length) {
    elements.expenseItems.innerHTML = `<div class="empty-state">目前篩選下沒有支出紀錄，可以切換篩選條件看看。</div>`;
    return;
  }

  filteredExpenses.forEach((item) => {
    const row = document.createElement("article");
    row.className = "expense-entry";
    row.innerHTML = `
      <div class="expense-entry__main">
        <div class="expense-entry__top">
          <div class="expense-entry__label-row">
            <span class="expense-entry__category">${item.category}</span>
            <span class="expense-entry__chip expense-entry__chip--date">${item.date}</span>
            <span class="expense-entry__chip expense-entry__chip--payer expense-entry__chip--payer-${(item.payer || "YY").toLowerCase()}">${item.payer || "YY"}</span>
            <span class="expense-entry__inline-note">${item.note || "未填備註"}</span>
          </div>
          <strong class="expense-entry__amount">${formatCurrency(item.amount, item.currency)}</strong>
        </div>
        <p class="expense-entry__meta">約 ${formatCurrency(item.jpyAmount, "JPY")} / ${formatCurrency(item.jpyAmount * effectiveRate, "TWD")}</p>
      </div>
      <div class="expense-entry__actions">
        <button class="icon-button icon-button--danger" type="button" aria-label="刪除支出" title="刪除支出">
          <svg aria-hidden="true" viewBox="0 0 24 24" class="icon-button__svg">
            <path d="M6 7h12"></path>
            <path d="M9 7V5h6v2"></path>
            <path d="M8 7l.8 11h6.4L16 7"></path>
            <path d="M10 11v4"></path>
            <path d="M14 11v4"></path>
          </svg>
        </button>
      </div>
    `;

    row.querySelector(".icon-button").addEventListener("click", () => {
      state.expenses = state.expenses.filter((entry) => entry.id !== item.id);
      saveState();
      renderExpenses();
    });

    elements.expenseItems.appendChild(row);
  });
}

function getFilteredExpenses() {
  const dateFilter = state.expenseFilters?.date || "ALL";
  const payerFilter = state.expenseFilters?.payer || "ALL";
  const categoryFilter = state.expenseFilters?.category || "ALL";

  return state.expenses.filter((item) => {
    const dateMatch = dateFilter === "ALL" || item.date === dateFilter;
    const payerMatch = payerFilter === "ALL" || item.payer === payerFilter;
    const categoryMatch = categoryFilter === "ALL" || item.category === categoryFilter;
    return dateMatch && payerMatch && categoryMatch;
  });
}

function buildExpenseFilterSummary(count) {
  const dateFilter = state.expenseFilters?.date || "ALL";
  const payerFilter = state.expenseFilters?.payer || "ALL";
  const categoryFilter = state.expenseFilters?.category || "ALL";
  const dateText = dateFilter === "ALL" ? "全部日期" : dateFilter;
  const payerText = payerFilter === "ALL" ? "全部付款人" : payerFilter;
  const categoryText = categoryFilter === "ALL" ? "全部類別" : categoryFilter;
  return `目前顯示 ${dateText}・${payerText}・${categoryText} 的 ${count} 筆支出統計。`;
}

function renderExpenseDateFilterOptions() {
  const uniqueDates = [...new Set(state.expenses.map((item) => item.date).filter(Boolean))].sort();
  const currentValue = state.expenseFilters?.date || "ALL";
  elements.expenseFilterDate.innerHTML = `<option value="ALL">全部</option>`;

  uniqueDates.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    elements.expenseFilterDate.appendChild(option);
  });

  if (!uniqueDates.includes(currentValue)) {
    state.expenseFilters.date = "ALL";
  }
}

function renderSync() {
  if (!elements.syncRoomId) {
    return;
  }

  elements.syncRoomId.value = state.sync?.roomId || DEFAULT_SYNC_ROOM;

  if (!hasFirebaseConfig()) {
    elements.syncStatusPill.textContent = "待設定";
    elements.syncSetupNote.innerHTML = `
      <div>
        <p class="sync-intro-card__title">先填 Firebase 設定</p>
        <p class="sync-intro-card__text">把你的 Firebase Web App 設定貼到 <code>firebase-config.js</code>，就能開啟旅伴同步。</p>
      </div>
      <div class="pill pill--accent">尚未連線</div>
    `;
    return;
  }

  if (!state.sync?.enabled) {
    elements.syncStatusPill.textContent = "未啟用";
    elements.syncSetupNote.innerHTML = `
      <div>
        <p class="sync-intro-card__title">建立你們的旅伴房間</p>
        <p class="sync-intro-card__text">輸入同一組房間代碼，例如 <code>okinawa-family-2026</code>，你和旅伴就能共用記帳與清單。</p>
      </div>
      <div class="pill pill--accent">1 個代碼就能共用</div>
    `;
    return;
  }

  if (state.sync.connected) {
    elements.syncStatusPill.textContent = "同步中";
    elements.syncSetupNote.innerHTML = `
      <div>
        <p class="sync-intro-card__title">已連到房間 <code>${state.sync.roomId}</code></p>
        <p class="sync-intro-card__text">把同一個 room code 或分享連結給旅伴，雙方會看到同一份記帳與清單。</p>
      </div>
      <div class="pill pill--accent">${state.sync.lastSyncedAt ? `最近同步 ${formatTimestamp(state.sync.lastSyncedAt)}` : "即時同步啟用"}</div>
    `;
    return;
  }

  elements.syncStatusPill.textContent = "連線中斷";
  elements.syncSetupNote.innerHTML = `
    <div>
      <p class="sync-intro-card__title">尚未連上 Firestore</p>
      <p class="sync-intro-card__text">請檢查 Firebase 設定與 Firestore 安全規則，或再按一次啟用同步。</p>
    </div>
    <div class="pill pill--accent">房間 ${state.sync.roomId}</div>
  `;
}

function renderWeather() {
  elements.weatherLocation.value = state.weather.location;
  if (!state.weather.forecast) {
    elements.weatherUpdatedAt.textContent = "尚未更新";
    elements.weatherRangeNote.textContent = "目前還沒有抓到天氣資料。等更新完成後，我會告訴你現在顯示的是近期預報，還是已經對到 2026/6/13 到 2026/6/17 的行程日期。";
    elements.weatherForecast.innerHTML = `<div class="empty-state">按一下更新天氣，就會帶入那霸近幾天的預報。</div>`;
    return;
  }

  const { current, daily } = state.weather.forecast;
  elements.weatherUpdatedAt.textContent = formatTimestamp(state.weather.updatedAt);
  elements.weatherCurrentTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
  elements.weatherCurrentText.textContent = weatherCodeToText(current.weather_code);
  elements.weatherCurrentRain.textContent = `${Math.max(...daily.precipitation_probability_max)}%`;
  elements.weatherCurrentWind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  elements.weatherRangeNote.innerHTML = buildWeatherRangeMessage(daily.time);
  elements.weatherForecast.innerHTML = "";

  daily.time.forEach((date, index) => {
    const card = document.createElement("article");
    card.className = "forecast-card";
    card.innerHTML = `
      <h3>${formatDayLabel(date)}</h3>
      <p>${weatherCodeToText(daily.weather_code[index])}</p>
      <p>${Math.round(daily.temperature_2m_min[index])}°C - ${Math.round(daily.temperature_2m_max[index])}°C</p>
      <p>降雨 ${daily.precipitation_probability_max[index]}%</p>
    `;
    elements.weatherForecast.appendChild(card);
  });
}

function renderExchange() {
  const liveRate = state.exchange.liveRate;
  const effectiveRate = getEffectiveRate();
  elements.exchangeUpdatedAt.textContent = state.exchange.updatedAt ? formatTimestamp(state.exchange.updatedAt) : "尚未更新";
  elements.exchangeRateJpyTwd.textContent = `${effectiveRate.toFixed(4)} TWD`;
  elements.exchangeRateTwdJpy.textContent = `${(1 / effectiveRate).toFixed(4)} JPY`;
  if (!liveRate) {
    elements.exchangeUpdatedAt.textContent = "尚未更新 · 使用預設匯率";
  }
  renderConverter();
}

function renderConverter() {
  const amount = Number(elements.converterAmount.value || 0);
  const direction = elements.converterDirection.value;
  const rate = getEffectiveRate();

  if (!rate) {
    elements.converterOutput.textContent = "還沒有可用匯率，先按上方更新資料。";
    return;
  }

  if (direction === "JPY_TO_TWD") {
    elements.converterOutput.textContent = `${amount} JPY ≈ ${formatCurrency(amount * rate, "TWD")}`;
    return;
  }

  elements.converterOutput.textContent = `${amount} TWD ≈ ${formatCurrency(amount / rate, "JPY")}`;
}

function getEffectiveRate() {
  return state.exchange.liveRate || FALLBACK_JPY_TO_TWD;
}

async function refreshRemoteData({ silent }) {
  await Promise.all([refreshWeather(), refreshExchange()]);
  if (!silent) {
    elements.refreshDataButton.textContent = "更新完成";
    window.setTimeout(() => {
      elements.refreshDataButton.textContent = "更新天氣 / 匯率";
    }, 1600);
  }
}

async function refreshWeather() {
  try {
    const location = encodeURIComponent(state.weather.location || DEFAULT_CITY);
    const geocodeResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=zh&format=json`);
    const geocodeData = await geocodeResponse.json();
    const place = geocodeData.results?.[0];
    const latitude = place?.latitude ?? 26.2125;
    const longitude = place?.longitude ?? 127.6811;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7`
    );
    const weatherData = await weatherResponse.json();
    state.weather.forecast = weatherData;
    state.weather.updatedAt = Date.now();
    saveState();
    renderWeather();
  } catch (error) {
    console.error("weather refresh failed", error);
    if (!state.weather.forecast) {
      elements.weatherForecast.innerHTML = `<div class="empty-state">目前抓不到天氣資料，但之後重新整理仍可再試。</div>`;
    }
  }
}

async function refreshExchange() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/JPY");
    const data = await response.json();
    state.exchange.liveRate = data.rates?.TWD || state.exchange.liveRate;
    state.exchange.updatedAt = Date.now();
    saveState();
    renderExchange();
    renderExpenses();
  } catch (error) {
    console.error("exchange refresh failed", error);
  }
}

async function bootstrapSync() {
  if (!state.sync?.enabled || !hasFirebaseConfig()) {
    renderSync();
    return;
  }

  await startSharedSync();
}

async function startSharedSync() {
  if (!hasFirebaseConfig()) {
    renderSync();
    return;
  }

  try {
    ensureFirebase();
    stopSharedSync(false);
    const docRef = firestoreDb.collection(FIREBASE_COLLECTION_NAME).doc(state.sync.roomId);

    syncUnsubscribe = docRef.onSnapshot(async (snapshot) => {
      if (!snapshot.exists) {
        state.sync.connected = true;
        state.sync.lastSyncedAt = Date.now();
        saveStateWithoutSync();
        await pushSharedState(true);
        renderSync();
        return;
      }

      const remote = snapshot.data() || {};
      const sharedState = remote.sharedState || {};
      const revision = remote.revision || null;

      state.sync.connected = true;
      state.sync.lastSyncedAt = remote.updatedAt || Date.now();

      if (revision && revision === lastPushedSyncRevision) {
        saveStateWithoutSync();
        renderSync();
        return;
      }

      isApplyingRemoteSync = true;
      lastPushedSyncRevision = revision;
      state.checklist = mergeChecklistWithDefaults(Array.isArray(sharedState.checklist) ? sharedState.checklist : state.checklist);
      state.expenses = Array.isArray(sharedState.expenses) ? sharedState.expenses : state.expenses;
      saveStateWithoutSync();
      renderChecklist();
      renderExpenses();
      renderSync();
      isApplyingRemoteSync = false;
    }, (error) => {
      console.error("firebase sync listener failed", error);
      state.sync.connected = false;
      saveStateWithoutSync();
      renderSync();
    });

    state.sync.connected = true;
    saveStateWithoutSync();
    renderSync();
    await pushSharedState(false);
  } catch (error) {
    console.error("firebase sync start failed", error);
    state.sync.connected = false;
    saveStateWithoutSync();
    renderSync();
  }
}

function stopSharedSync(clearEnabled = false) {
  if (syncPushTimer) {
    window.clearTimeout(syncPushTimer);
    syncPushTimer = null;
  }

  if (syncUnsubscribe) {
    syncUnsubscribe();
    syncUnsubscribe = null;
  }

  state.sync.connected = false;
  if (clearEnabled) {
    state.sync.enabled = false;
  }
}

async function pushSharedState(force) {
  if (!force && (!state.sync?.enabled || !state.sync?.connected || !hasFirebaseConfig() || isApplyingRemoteSync)) {
    return;
  }

  ensureFirebase();
  const revision = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  lastPushedSyncRevision = revision;

  await firestoreDb.collection(FIREBASE_COLLECTION_NAME).doc(state.sync.roomId).set({
    revision,
    updatedAt: Date.now(),
    sharedState: {
      checklist: state.checklist,
      expenses: state.expenses
    }
  }, { merge: true });

  state.sync.lastSyncedAt = Date.now();
  saveStateWithoutSync();
  renderSync();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    }).catch((error) => {
      console.error("service worker cleanup failed", error);
    });
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("service worker registration failed", error);
    });
  });
}

function ensureFirebase() {
  if (firestoreDb) {
    return firestoreDb;
  }

  if (!window.firebase) {
    throw new Error("Firebase SDK is not loaded.");
  }

  firebaseApp = window.firebase.apps.length
    ? window.firebase.app()
    : window.firebase.initializeApp(window.TRIP_FIREBASE_CONFIG);
  firestoreDb = window.firebase.firestore(firebaseApp);
  return firestoreDb;
}

function hasFirebaseConfig() {
  return Boolean(window.TRIP_FIREBASE_CONFIG?.projectId);
}

function sanitizeRoomId(value) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-");
}

function updateRoomUrl(roomId) {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("room", roomId);
  window.history.replaceState({}, "", nextUrl.toString());
}

function clearRoomUrl() {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.delete("room");
  window.history.replaceState({}, "", nextUrl.toString());
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2
  }).format(Number.isFinite(value) ? value : 0);
}

function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(timestamp);
}

function formatDayLabel(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("zh-TW", {
    month: "numeric",
    day: "numeric",
    weekday: "short"
  }).format(date);
}

function buildWeatherRangeMessage(forecastDates) {
  const firstForecast = forecastDates[0];
  const lastForecast = forecastDates[forecastDates.length - 1];
  const tripStart = TRIP_DATES[0];
  const tripEnd = TRIP_DATES[TRIP_DATES.length - 1];
  const coversTrip = tripStart >= firstForecast && tripEnd <= lastForecast;

  if (coversTrip) {
    return `目前天氣資料已經涵蓋你的行程日期 ${formatShortDate(tripStart)} 到 ${formatShortDate(tripEnd)}，這一區塊看到的就是旅行期間預報。`;
  }

  return `目前顯示的是 ${formatShortDate(firstForecast)} 到 ${formatShortDate(lastForecast)} 的近期預報，不是 ${formatShortDate(tripStart)} 到 ${formatShortDate(tripEnd)} 的正式行程天氣。今天是 2026/05/27，你的旅行日期還沒進入 7 天預報範圍，所以現在只能先看近期天況做參考。`;
}

function formatShortDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function weatherCodeToText(code) {
  const map = {
    0: "晴朗",
    1: "大致晴",
    2: "局部多雲",
    3: "陰天",
    45: "起霧",
    48: "霧淞",
    51: "毛毛雨",
    61: "小雨",
    63: "降雨",
    65: "大雨",
    71: "降雪",
    80: "陣雨",
    95: "雷雨"
  };
  return map[code] || "天氣變化中";
}
