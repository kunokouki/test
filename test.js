const files = [
  { id: 1, file_name: "XMXT-202401-V1.pdf" },
  { id: 2, file_name: "XMXT-202401-V3.pdf" },
  { id: 3, file_name: "XMXT-202401-V2.pdf" },
  { id: 4, file_name: "ABCD-202405-V1.docx" },
  { id: 5, file_name: "ABCD-202405-V2.docx" }
];

function getLatestVersionFiles(data) {
  // 正規表現パターン:
  // Group 1: 文書名（アルファベットとハイフン・数字などの組み合わせ）
  // Group 2: バージョン数値
  const regex = /^([A-Z0-9]+-\d+)-V(\d+)/i;

  const latestMap = new Map();

  for (const item of data) {
    const match = item.file_name.match(regex);
    if (!match) continue; // パターンに合致しないファイルはスキップ

    const docName = match[1];             // 例: "XMXT-202401"
    const version = parseInt(match[2], 10); // 例: 3

    // まだ登録がない、またはより新しいバージョンがあれば更新
    if (!latestMap.has(docName) || latestMap.get(docName).version < version) {
      latestMap.set(docName, { version, data: item });
    }
  }

  // 抽出された最新データのオブジェクト配列のみを返す
  return Array.from(latestMap.values()).map(entry => entry.data);
}

const result = getLatestVersionFiles(files);
console.log(result);
