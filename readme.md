# label-name-classifier
## セットアップ
```
npm install
npm run build
```

### 教師データを`./trainData.csv`に配置
```csv:trainData.csv
"label", "name"
"飲料", "コーヒー"
"食品", "ポテトチップ"
"飲料", "コーラ"
...
```

### 分類するデータを`itemNames.csv`に配置
```csv:itemName.csv
"name"
"コーヒー飲料"
```

## 実行
### 分類器の生成
```
npm run generate
```

### 分類
```
npm run start
```

```
-----------------------------
name:  コーヒー飲料
label: コーヒー
-----------------------------
```