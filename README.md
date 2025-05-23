## 題目名稱

MyAniList - 個人動畫追蹤後端系統（含簡易 UI）

## 題目簡介

這是一個用於管理個人動畫觀看清單的後端系統，使用者可登入後新增動畫紀錄、設定觀看狀態、進度、評分與簡短評語，也能透過分類與標籤進行整理與統計。為更清楚展示後端功能，我也會製作一個簡單的前端介面來串接 API。

## 預期技術實作方式

### 後端部分：

* 使用 Express.js 建立 RESTful API
* MongoDB 儲存使用者與動畫資料
* JWT 登入驗證

### 前端部分（簡易展示）：

* 使用 React + Vite 建立介面

## 時間利用與進度規劃

預計使用約 18 小時 完成，實作日程如下：

| 時間            | 任務內容簡述                 |
| ------------- | ---------------------- |
| Day 1 ~~(5hr)~~ -> ~~3hr~~ -> 2 + 1.5hr     | 建立基本專案架構與資料結構、完成登入驗證流程 |
| Day 2 ~~(5hr)~~ -> 3hr     | 實作主要資料的建立、查詢與管理功能      |
| Day 3 (5hr)     | 製作前端介面並整合 API、實作部分延伸功能 |
| Day 4 (3hr) | 整理測試流程、撰寫說明文件與交付項目     |


## 預計完成項目
* API 功能預計包含：
  * 動畫清單 CRUD（含進度、狀態、評分、標籤）
  * 動畫分類查詢（依狀態或標籤）
  * 統計 API（如：觀看狀態分佈、常見標籤）
* MongoDB Schema（含驗證與基本錯誤處理）
* JWT 中介層驗證邏輯
* Postman collection 測試檔
* 預計實作兩個簡單畫面：
  * 登入頁面
  * 我的動畫清單頁（呼叫 `/anime` 顯示資料，可 log 其他欄位）
* `README.md` 說明文件（API 文件 + 安裝說明）

## 驗收與交付方式

* GitHub Repo 提交完整專案原始碼
* 提供：
  * `README.md`（含 API 使用與啟動方式）
  * `postman_collection.json`
  * React UI 示範畫面
  * 測試帳號與範例動畫資料
* demo影片連結
