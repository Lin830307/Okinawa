# Firebase 共享設定

這個專案已經支援：

- `每日行程` 共用同步
- `行前清單` 共用同步
- `旅遊記帳` 共用同步
- 透過 `room code` 或 `?room=...` 連結加入同一個房間

目前不共用：

- 天氣
- 匯率
- 目前停在哪個頁籤

## 1. 建立 Firebase 專案

1. 到 [Firebase Console](https://console.firebase.google.com/)
2. 建立一個新專案
3. 進入 `Build > Firestore Database`
4. 建立資料庫
5. 建立模式先選 `Production` 或 `Test` 都可以，之後再貼下面規則

## 2. 建立 Web App

1. 在 Firebase 專案首頁按 `</>` 新增 Web App
2. 註冊完成後，會看到一組設定：

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## 3. 貼到 `firebase-config.js`

把 `C:\\Users\\AUO\\Documents\\行程\\firebase-config.js` 改成：

```js
window.TRIP_FIREBASE_CONFIG = {
  apiKey: "你的 apiKey",
  authDomain: "你的 authDomain",
  projectId: "你的 projectId",
  storageBucket: "你的 storageBucket",
  messagingSenderId: "你的 messagingSenderId",
  appId: "你的 appId"
};

window.TRIP_FIREBASE_OPTIONS = {
  collectionName: "sharedTrips"
};
```

## 4. Firestore 安全規則

如果你想先快速讓旅伴兩人共用，可以先用這組：

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sharedTrips/{roomId} {
      allow read, write: if true;
    }
  }
}
```

這組規則最簡單，但代表知道網址和 room code 的人都能讀寫。

如果之後你想更安全，可以再加登入或房間密碼邏輯。

## 5. 使用方式

1. 打開網站
2. 進 `同步`
3. 輸入同一組房間代碼，例如 `okinawa-yy-henry`
4. 按 `啟用同步`
5. 複製共用連結給旅伴

分享連結會長得像：

```txt
https://lin830307.github.io/Okinawa/?room=okinawa-yy-henry
```

旅伴開啟後會直接帶入同一個房間。

## 6. 目前資料結構

每個房間會存在：

```txt
sharedTrips/{roomId}
```

文件內容大致是：

```js
{
  revision: "1716800000000-ab12cd",
  updatedAt: 1716800000000,
  sharedState: {
    itinerary: [...],
    checklist: [...],
    expenses: [...]
  }
}
```

這樣設計的好處是：

- 前端直接連 Firestore，不用自己架 server
- 兩個人改同一份資料時，可以即時同步
- GitHub Pages 仍然可以照常部署靜態網站
