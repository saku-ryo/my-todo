import { program } from 'commander';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';
import chalk from 'chalk';
import fs from 'fs';
import { json } from 'stream/consumers';

const FILE = './tasks.json';

// 初期化
if(!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE,JSON.stringify([]));
}

// コマンド引数を取得
const [,, command, ...args] = process.argv;

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

// addタスクの追加
function addTodos(task) {

    if(!task) return console.log("追加するタスクを入力してください");

        // ファイルを読込み
        const todos = loadTodos();

        if (todos === undefined)  {
            console.log("JSONファイルが存在しません");
            return
        }
       // uuidの生成
        const uuid = uuidv4();
        // 日付のフォーマット
        const day = dayjs().format('YYYY-MM-DD HH:mm');
        // 未完了状態をセット
        const status = "未完了";
        // タスクを追加する情報をセット
        todos.push({  uuid, task, day, status});
        // タスクの情報をJSONファイルに保存
        saveTodos(todos)
        console.log(chalk.green('タスクを追加しました！'));
}

// list表示
function listTodos() {
    // JSONファイルを読込み
    const todos = loadTodos();

    if (todos.length <= 0 ) {
        console.log("タスクが0件です");
        return
    } else {
        todos.forEach((todos, index ) => {
            if (todos.status === "未完了")
                console.log(chalk.white(index + 1 + ":" ,"ID:" + todos.uuid ,"タスク:" + todos.task,  "作成日時:" + todos.day , "状態：" + todos.status));
            else 
                console.log(chalk.gray(index + 1 + ":" ,"ID:" + todos.uuid ,"タスク:" + todos.task,  "作成日時:" + todos.day , "状態：" + todos.status));
        });
    }
}

//　コマンド判別
switch (command) {

    // addメソッドを実行
    case 'add':
        addTodos(args.join(""));
        break;

    case 'list':
        listTodos();
        break;
    default:
}
