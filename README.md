# 沖繩行程 PWA

這是一個可安裝的旅遊 Web App，包含：

- 每日行程勾選
- 每日行程新增 / 編輯 / 排序
- 行前清單新增 / 編輯 / 刪除
- 旅遊記帳
- 沖繩天氣查詢
- JPY / TWD 匯率換算

## 本機執行

在專案資料夾開啟 PowerShell：

```powershell
python -m http.server 8080
```

然後打開：

```text
http://localhost:8080/
```

## 部署到 GitHub Pages

這個專案已經附上 GitHub Actions 自動部署設定：

`.github/workflows/deploy-pages.yml`

### 步驟

1. 建立一個新的 GitHub repository
2. 把這個資料夾內容推上去
3. 確認預設分支是 `main`
4. 到 GitHub repository 的 `Settings -> Pages`
5. 在 `Build and deployment` 選擇 `GitHub Actions`
6. 推送一次後，等待 `Actions` 跑完
7. 完成後會得到一個 Pages 網址，例如：

```text
https://<你的帳號>.github.io/<repo-name>/
```

## 手機使用

部署完成後，用手機開啟 GitHub Pages 網址即可：

- iPhone Safari：分享 -> 加入主畫面
- Android Chrome：選單 -> 安裝應用程式 / 加入主畫面

## 專案檔案

- `index.html`：主畫面結構
- `styles.css`：介面樣式
- `app.js`：行程、清單、記帳、天氣、匯率邏輯
- `manifest.webmanifest`：PWA 設定
- `service-worker.js`：離線快取
- `icons/`：App icon
