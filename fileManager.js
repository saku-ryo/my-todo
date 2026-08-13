const fs = require('fs');

const FILE = './tasks.json';

const CHARSET = 'utf8';

// タスクの読み込み
function loadTodos() {

    try {
        const fileInfo = fs.readFileSync(FILE,CHARSET);
        let result;

        if(fileInfo.length <= 0 ) {
            return[];
        } else {
            result =  JSON.parse(fileInfo);
        }

        // JSONデータが配列かどうかを判定
        if(Array.isArray(result)) {
            // 有効なオブジェクトの配列を作成（null）を排除する
            const validTodos = result.filter(
                item => typeof item === 'object' && item !== null && !Array.isArray(item)
            );
            return validTodos;
        } else {
            throw new Error("データ形式が配列ではありません。");
        }

    } catch (e) {
        console.error("データの読み込みに失敗しました。処理を終了します。" + e.message);
        process.exit(1);
    }
}

// データの保存
function saveTodos(todos) {
    try {
        // JSONファイルに書き込み
        fs.writeFileSync(FILE,JSON.stringify(todos,null,2),CHARSET);
    } catch (e) {
        console.error("データの書き込みに失敗しました。処理を終了します。" + e.message);
        process.exit(1);
    }
}

module.exports = {FILE, loadTodos, saveTodos};
