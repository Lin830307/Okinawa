const STORAGE_KEY = "okinawa-pwa-state-v1";
const DEFAULT_CITY = "Naha, Okinawa";
const FALLBACK_JPY_TO_TWD = 0.214;

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

const elements = {
  topTabs: [...document.querySelectorAll(".top-tab")],
  panels: [...document.querySelectorAll(".tab-panel")],
  dayTabs: document.getElementById("day-tabs"),
  dayView: document.getElementById("day-view"),
  tripProgressSummary: document.getElementById("trip-progress-summary"),
  checklistForm: document.getElementById("checklist-form"),
  checklistInput: document.getElementById("checklist-input"),
  checklistItems: document.getElementById("checklist-items"),
  checklistProgress: document.getElementById("checklist-progress"),
  expenseForm: document.getElementById("expense-form"),
  expenseItems: document.getElementById("expense-items"),
  expenseCount: document.getElementById("expense-count"),
  expenseTotalJpy: document.getElementById("expense-total-jpy"),
  expenseTotalTwd: document.getElementById("expense-total-twd"),
  expenseAverage: document.getElementById("expense-average"),
  weatherForm: document.getElementById("weather-form"),
  weatherLocation: document.getElementById("weather-location"),
  weatherUpdatedAt: document.getElementById("weather-updated-at"),
  weatherCurrentTemp: document.getElementById("weather-current-temp"),
  weatherCurrentText: document.getElementById("weather-current-text"),
  weatherCurrentRain: document.getElementById("weather-current-rain"),
  weatherCurrentWind: document.getElementById("weather-current-wind"),
  weatherForecast: document.getElementById("weather-forecast"),
  exchangeUpdatedAt: document.getElementById("exchange-updated-at"),
  exchangeRateTwdJpy: document.getElementById("exchange-rate-twd-jpy"),
  exchangeRateJpyTwd: document.getElementById("exchange-rate-jpy-twd"),
  exchangeForm: document.getElementById("exchange-form"),
  manualRate: document.getElementById("manual-rate"),
  clearManualRate: document.getElementById("clear-manual-rate"),
  converterForm: document.getElementById("converter-form"),
  converterAmount: document.getElementById("convert-amount"),
  converterDirection: document.getElementById("convert-direction"),
  converterOutput: document.getElementById("converter-output"),
  installButton: document.getElementById("install-button"),
  refreshDataButton: document.getElementById("refresh-data-button")
};

bindEvents();
renderAll();
registerServiceWorker();
void refreshRemoteData({ silent: true });

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return createInitialState();
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      activeTab: parsed.activeTab || "itinerary",
      activeDay: parsed.activeDay || 1,
      completed: parsed.completed || {},
      checklist: Array.isArray(parsed.checklist) && parsed.checklist.length ? parsed.checklist : defaultChecklist,
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
      weather: parsed.weather || { location: DEFAULT_CITY, forecast: null, updatedAt: null },
      exchange: parsed.exchange || { liveRate: null, manualRate: null, updatedAt: null }
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
    completed: {},
    checklist: defaultChecklist,
    expenses: [],
    weather: { location: DEFAULT_CITY, forecast: null, updatedAt: null },
    exchange: { liveRate: null, manualRate: null, updatedAt: null }
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
      jpyAmount,
      note: document.getElementById("expense-note").value.trim()
    });

    elements.expenseForm.reset();
    document.getElementById("expense-date").value = "2026-06-13";
    document.getElementById("expense-currency").value = "JPY";
    saveState();
    renderExpenses();
  });

  elements.weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    state.weather.location = elements.weatherLocation.value.trim() || DEFAULT_CITY;
    saveState();
    await refreshWeather();
  });

  elements.exchangeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const manualRate = Number(elements.manualRate.value);
    if (!manualRate) {
      return;
    }
    state.exchange.manualRate = manualRate;
    saveState();
    renderExchange();
    renderExpenses();
  });

  elements.clearManualRate.addEventListener("click", () => {
    state.exchange.manualRate = null;
    elements.manualRate.value = "";
    saveState();
    renderExchange();
    renderExpenses();
  });

  elements.converterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderConverter();
  });

  elements.refreshDataButton.addEventListener("click", async () => {
    await refreshRemoteData({ silent: false });
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
    button.textContent = `${day.label} ${day.date}`;
    button.addEventListener("click", () => {
      state.activeDay = day.id;
      saveState();
      renderItinerary();
    });
    elements.dayTabs.appendChild(button);
  });

  const activeDay = itineraryData.find((day) => day.id === state.activeDay) || itineraryData[0];
  const dayCompleted = activeDay.items.filter((item) => state.completed[item.id]).length;
  const dayPercent = Math.round((dayCompleted / activeDay.items.length) * 100);
  const tripCounts = itineraryData.reduce(
    (accumulator, day) => {
      day.items.forEach((item) => {
        accumulator.total += 1;
        if (state.completed[item.id]) {
          accumulator.done += 1;
        }
      });
      return accumulator;
    },
    { done: 0, total: 0 }
  );

  elements.tripProgressSummary.textContent = `總完成度 ${Math.round((tripCounts.done / tripCounts.total) * 100)}%`;
  elements.dayView.innerHTML = "";

  const dayHeader = document.createElement("div");
  dayHeader.className = "day-header";
  dayHeader.innerHTML = `
    <div>
      <p class="section-kicker">${activeDay.label} · ${activeDay.date}</p>
      <h3>${activeDay.title}</h3>
    </div>
    <p class="pill">${dayCompleted} / ${activeDay.items.length} 已完成 · ${dayPercent}%</p>
  `;
  elements.dayView.appendChild(dayHeader);

  const template = document.getElementById("itinerary-card-template");
  activeDay.items.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".itinerary-card");
    const checkbox = fragment.querySelector("input");
    const time = fragment.querySelector(".itinerary-card__time");
    const title = fragment.querySelector("h3");
    const note = fragment.querySelector(".itinerary-card__note");
    const mapLink = fragment.querySelector(".map-link");

    checkbox.checked = Boolean(state.completed[item.id]);
    checkbox.addEventListener("change", () => {
      state.completed[item.id] = checkbox.checked;
      saveState();
      renderItinerary();
    });

    time.textContent = item.time;
    title.textContent = item.title;
    note.textContent = item.note;
    mapLink.href = item.map;

    card.classList.toggle("is-done", checkbox.checked);
    if (checkbox.checked) {
      card.style.opacity = "0.72";
    }

    elements.dayView.appendChild(fragment);
  });
}

function renderChecklist() {
  const doneCount = state.checklist.filter((item) => item.done).length;
  elements.checklistProgress.textContent = `${doneCount} / ${state.checklist.length} 已完成`;
  elements.checklistItems.innerHTML = "";

  if (!state.checklist.length) {
    elements.checklistItems.innerHTML = `<div class="empty-state">還沒有行前項目，先新增一個吧。</div>`;
    return;
  }

  state.checklist.forEach((item) => {
    const row = document.createElement("article");
    row.className = `stack-item${item.done ? " is-done" : ""}`;
    row.innerHTML = `
      <input class="toggle" type="checkbox" ${item.done ? "checked" : ""} aria-label="完成 ${item.text}">
      <div>
        <p class="stack-item__title"></p>
        <p class="stack-item__meta">可編輯、可刪除，資料保存在本機</p>
      </div>
      <div class="stack-item__actions">
        <button class="ghost-button" type="button">編輯</button>
        <button class="ghost-button" type="button">刪除</button>
      </div>
    `;

    row.querySelector(".stack-item__title").textContent = item.text;
    const [toggle, editButton, deleteButton] = [row.querySelector(".toggle"), ...row.querySelectorAll(".ghost-button")];

    toggle.addEventListener("change", () => {
      item.done = toggle.checked;
      saveState();
      renderChecklist();
    });

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
  const effectiveRate = getEffectiveRate();
  const totalJpy = state.expenses.reduce((sum, item) => sum + item.jpyAmount, 0);
  const totalTwd = totalJpy * effectiveRate;
  const average = state.expenses.length ? totalJpy / state.expenses.length : 0;

  elements.expenseCount.textContent = `${state.expenses.length} 筆支出`;
  elements.expenseTotalJpy.textContent = formatCurrency(totalJpy, "JPY");
  elements.expenseTotalTwd.textContent = formatCurrency(totalTwd, "TWD");
  elements.expenseAverage.textContent = formatCurrency(average, "JPY");
  elements.expenseItems.innerHTML = "";

  if (!state.expenses.length) {
    elements.expenseItems.innerHTML = `<div class="empty-state">還沒有支出紀錄，第一筆可以從租車或第一餐開始。</div>`;
    return;
  }

  state.expenses.forEach((item) => {
    const row = document.createElement("article");
    row.className = "stack-item";
    row.innerHTML = `
      <div class="pill">${item.category}</div>
      <div>
        <p class="stack-item__title">${formatCurrency(item.amount, item.currency)} · ${item.note || "未填備註"}</p>
        <p class="stack-item__meta">${item.date} · 約 ${formatCurrency(item.jpyAmount, "JPY")} / ${formatCurrency(item.jpyAmount * effectiveRate, "TWD")}</p>
      </div>
      <div class="stack-item__actions">
        <button class="ghost-button" type="button">刪除</button>
      </div>
    `;

    row.querySelector(".ghost-button").addEventListener("click", () => {
      state.expenses = state.expenses.filter((entry) => entry.id !== item.id);
      saveState();
      renderExpenses();
    });

    elements.expenseItems.appendChild(row);
  });
}

function renderWeather() {
  elements.weatherLocation.value = state.weather.location;
  if (!state.weather.forecast) {
    elements.weatherUpdatedAt.textContent = "尚未更新";
    elements.weatherForecast.innerHTML = `<div class="empty-state">按一下更新天氣，就會帶入那霸近幾天的預報。</div>`;
    return;
  }

  const { current, daily } = state.weather.forecast;
  elements.weatherUpdatedAt.textContent = formatTimestamp(state.weather.updatedAt);
  elements.weatherCurrentTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
  elements.weatherCurrentText.textContent = weatherCodeToText(current.weather_code);
  elements.weatherCurrentRain.textContent = `${Math.max(...daily.precipitation_probability_max)}%`;
  elements.weatherCurrentWind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
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
  if (state.exchange.manualRate) {
    elements.exchangeUpdatedAt.textContent += " · 手動匯率中";
  } else if (!liveRate) {
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
  return state.exchange.manualRate || state.exchange.liveRate || FALLBACK_JPY_TO_TWD;
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

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("service worker registration failed", error);
    });
  });
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
