const fs = require('fs');
const { json } = require('stream/consumers');

const FILE = './tasks.json';

// タスクの読み込み
function loadTodos() {

    const fileInfo = fs.readFileSync(FILE,'utf8');
    let result;
    if(fileInfo.length <= 0 ) {
        return[];
    } else {
      result =  JSON.parse(fileInfo);
    }
    return result;
}

// データの保存
function saveTodos(todos) {
    // JSONファイルに書き込み
    fs.writeFileSync(FILE,JSON.stringify(todos,null,2));
}

module.exports = {FILE, loadTodos, saveTodos};
