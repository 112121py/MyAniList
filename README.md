# MyAniList
## 題目名稱

MyAniList - 個人動畫追蹤後端系統（含簡易 UI）

## 題目簡介

這是一個用於管理個人動畫觀看清單的後端系統，使用者可登入後新增動畫紀錄、設定觀看狀態、進度、評分與名場面截圖，也能透過分類與標籤進行整理與統計。為更清楚展示後端功能，我也會製作一個簡單的前端介面來串接 API。

## 製作動機

因為平常會看動畫，也會跟朋友一起分享討論，但缺乏一個整合型的系統來幫忙記錄看過的作品，所以就設計了一個追蹤系統，可以看見好友的清單。也因為許多人都喜歡在看動畫時截下一些名場面或是喜歡的畫面收藏，就新增了上傳圖片的功能。

## 技術實作方式

### 後端部分：

* 使用 Express.js 建立 RESTful API
* MongoDB 儲存使用者與動畫資料
* JWT 登入驗證

### 前端部分（簡易展示）：

* 使用 React + Vite 建立登入、清單介面

## 時間利用與進度規劃

實際使用約 13.5 小時 完成，實作日程如下：

| 時間            | 任務內容簡述                 |
| ------------- | ---------------------- |
| Day 1 ~~(5hr)~~ -> 3.5hr     | 建立基本專案架構與資料結構、完成登入驗證流程、部分API實作 |
| Day 2 ~~(5hr)~~ -> 3hr     | 實作主要資料的建立、查詢、管理、追蹤功能      |
| Day 3 ~~(5hr)~~ -> 4hr     | 製作前端介面並整合 API、實作延伸功能-新增圖片上傳 |
| Day 4 ~~(3hr)~~ -> 3hr | 圖片顯示修復 +  整理測試流程、撰寫說明文件與交付項目     |

## 完成項目
* API 功能包含：
  * 動畫清單 CRUD（含進度、狀態、評分、標籤）
  * 動畫分類統計（依狀態或標籤）
  * 使用者追蹤功能，可以看見追蹤的user的動畫清單
  * 圖片上傳功能
* MongoDB Schema（含驗證與基本錯誤處理）
* JWT 中介層驗證邏輯
* Postman collection 測試檔
* 兩個簡易前端畫面：
  * 登入頁面
  * 我的動畫清單頁（呼叫 `/anime` 顯示資料，可 log 其他欄位）
* `README.md` 說明文件（API 文件 + 安裝說明，在本文件後半部分）

## 驗收與交付方式

* [GitHub Repo 提交完整專案原始碼](https://github.com/112121py/MyAniList)
* 提供：
  * `README.md`（含 API 使用與啟動方式）
  * `postman_collection.json`（此為個人測試使用）
  * React UI 示範畫面
  * 測試帳號與範例動畫資料
* [demo影片連結](https://youtu.be/04YBeiEimjI)

## API 設計
| 方法     | 路徑                   | 說明            | 是否需登入 |
| ------ | -------------------- | ------------- | ----- |
| `POST` | `/api/auth/register` | 使用者註冊         | 否     |
| `POST` | `/api/auth/login`    | 使用者登入（取得 JWT） | 否     |
| `GET`    | `/api/anime`                  | 取得自己所有動畫清單                           | 是     |
| `POST`   | `/api/anime`                  | 新增動畫資料                               | 是     |
| `PUT`    | `/api/anime/:id`              | 修改動畫資料                               | 是     |
| `DELETE` | `/api/anime/:id`              | 刪除動畫資料                               | 是     |
| `POST`   | `/api/anime/:id/upload-image` | 上傳動畫圖片（multipart/form-data）          | 是     |
| `GET`    | `/api/anime/:status`          | 根據狀態查詢動畫（planned/watching/completed） | 是     |
| `GET`    | `/api/anime/stats`            | 統計觀看狀態與常見標籤                          | 是     |
| `POST` | `/api/user/follow`          | 透過 username 追蹤他人 | 是     |
| `GET`  | `/api/user/followed-animes` | 查看追蹤對象的動畫清單      | 是     |


## 啟動流程
### 1. `.env` 設定檔（請先建立）

路徑：`backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myanilist
JWT_SECRET=your_secret_key
```

---

### 2. 啟動 MongoDB 資料庫

#### 若尚未安裝 MongoDB，可使用 Docker：

```bash
docker run -d -p 27017:27017 --name myanilist-mongo mongo
```

! 若已安裝mongodb，但執行了上述程式，需要將本機的mongodb服務關閉，避免兩者同時監聽造成連線混亂


---

### 3. 安裝後端依賴（第一次執行）

```bash
cd backend
npm install express mongoose dotenv jsonwebtoken bcrypt cors multer
npm install --save-dev nodemon
```

更新 `package.json` 中的 scripts：

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 4. 啟動後端伺服器(在backend下)

```bash
npm run dev
```

應顯示：

```
Server running on port 5000
```

---

### 5. 安裝並啟動前端（React + Vite）

```bash
cd frontend/vite-project
npm install
npm run dev
```

