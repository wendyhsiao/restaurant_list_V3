# 喜好餐廳列表
可以蒐集喜好的餐廳，並可以看到餐廳簡單的介紹(店名、照片、分類等)，點擊餐廳可以看到更詳細的餐廳資訊。

## 環境建置與需求
- Node.js v10.15.3
- MongoDB
#### npm套件
- Express ^4.17.1
- Robo 3T (Windows)
- nodemon
- mongoose ^5.6.3
- express-handlebars ^3.1.0
- body-parser ^1.19.0


## 安裝與執行步驟
#### 安裝方法1
在終端機(Terminal)輸入

```
git colone https://github.com/wendyhsiao/restaurant_CRUD.git
```

如果在終端機訊息中看見「done」，就表示成功了！

#### 安裝方法2
先點選"Clone or download/Download ZIP"把檔案下載下來，解壓縮
![image](https://github.com/wendyhsiao/restaurant_list/blob/master/public/img/down.PNG)


1.在終端機(Terminal)切換到restaurant_list目錄下

```
cd restaurant_list
```

2.安裝套件

```
npm install
```

3.建立種子資料

```
cd restaurant_list/models/seeds
node restaurantSeeder.js
```

4.回到restaurant_list目錄下
使用nodemon啟動伺服器 

```
cd restaurant_list
nodemon app.js
```

5.在瀏覽器輸入網址 `localhost:3000`即可看到內容

## 功能描述
- 在首頁列出所有的餐廳清單
- 針對每間餐廳，使用者都可以點進去看詳細描述
- 使用者可以透過搜尋餐廳名稱來找到特定的店家資料

- 增加新增餐廳按鈕，可自行增加餐廳清單
- 增加編輯按鈕，可修改餐廳資料內容
- 增加刪除按鈕，可把不想要的餐廳刪除

## 專案畫面
#### 首頁 
![image](https://github.com/wendyhsiao/restaurant_CRUD/blob/master/public/img/show1.PNG)
#### 餐廳詳細頁面
![image](https://github.com/wendyhsiao/restaurant_CRUD/blob/master/public/img/show2.PNG)
#### 修改餐廳頁面
![image](https://github.com/wendyhsiao/restaurant_CRUD/blob/master/public/img/show3.PNG)
#### 新增餐廳頁面
![image](https://github.com/wendyhsiao/restaurant_CRUD/blob/master/public/img/show4.PNG)