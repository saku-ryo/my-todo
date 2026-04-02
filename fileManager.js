const fs = require('fs');

const FILE = './tasks.json';

// タスクの読み込み
function loadTodos() {

    try {
        const fileInfo = fs.readFileSync(FILE,'utf8');
        let result;

        if(fileInfo.length <= 0 ) {
            return[];
        } else {
            result =  JSON.parse(fileInfo);
        }

        return result;
    } catch (e) {
        console.log("データの読み込みに失敗しました。処理を終了します。" + e.message);
        process.exit();
    }
}

// データの保存
function saveTodos(todos) {
    // JSONファイルに書き込み
    fs.writeFileSync(FILE,JSON.stringify(todos,null,2));
}

module.exports = {FILE, loadTodos, saveTodos};
