const files = [
  { id: 1, file_name: "仕様書_v1.pdf", content: "これはシステムの仕様書です。", date: "2024-01-01" },
  { id: 2, file_name: "仕様書_v2.pdf", content: "これはシステムの仕様書です。", date: "2024-03-01" }, // content重複・最新
  { id: 3, file_name: "マニュアル.pdf", content: "操作方法についてのマニュアルです。", date: "2024-02-01" }
];

function getLatestUniqueByContent(data) {
  const contentMap = new Map();

  for (const item of data) {
    const key = item.content;
    const itemDate = new Date(item.date).getTime();

    if (!contentMap.has(key)) {
      // 未登録ならそのまま登録
      contentMap.set(key, { ...item, _parsedDate: itemDate });
    } else {
      // 登録済みなら、dateを比較して新しい方に差し替え
      if (itemDate > contentMap.get(key)._parsedDate) {
        contentMap.set(key, { ...item, _parsedDate: itemDate });
      }
    }
  }

  // Mapの値を取り出し、計算用に追加した一時プロパティ (_parsedDate) を除外して返す
  return Array.from(contentMap.values()).map(({ _parsedDate, ...original }) => original);
}

// 実行
const result = getLatestUniqueByContent(files);
console.log(result);
