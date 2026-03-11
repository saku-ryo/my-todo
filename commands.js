import { program } from 'commander';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';
import chalk from 'chalk';

import * as fileManager from './fileManager.js'

// addタスクの追加
function addTodos(task) {

    if(!task) return console.log("追加するタスクを入力してください");

        // ファイルを読込み
        const todos = fileManager.loadTodos();

        if (todos === undefined)  {
            console.log("JSONファイルが存在しません");
            return
        }
       // idの生成
        const id = uuidv4();
        // 日付のフォーマット
        const day = dayjs().format('YYYY-MM-DD HH:mm');
        // 未完了状態をセット
        const status = "未完了";
        // タスクを追加する情報をセット
        todos.push({ id, task, day, status});
        // タスクの情報をJSONファイルに保存
        fileManager.saveTodos(todos)
        console.log(chalk.green('タスクを追加しました！'));
}

// list表示
function listTodos() {
    // JSONファイルを読込み
    const todos = fileManager.loadTodos();

    if (todos.length <= 0 ) {
        console.log("タスクが0件です");
        return
    } else {
        todos.forEach((todos, index ) => {
            if (todos.status === "未完了")
                console.log(chalk.white(index + 1 + ":" ,"ID:" + todos.id ,"タスク:" + todos.task,  "作成日時:" + todos.day , "状態：" + todos.status));
            else 
                console.log(chalk.gray(index + 1 + ":" ,"ID:" + todos.id ,"タスク:" + todos.task,  "作成日時:" + todos.day , "状態：" + todos.status));
        });
    }
}

// done処理
function doneTodos(id) {

    // JSONファイルを読込み
    const todos = fileManager.loadTodos();

    // JSONに保存されたIDと入力されたIDを比較
    const todo = todos.find( t => t.id === id);

    if (!todo) {
        console.log(chalk.red("指定されたIDは存在しません。"));
        return;
    } 

    // JSONファイルに書き込み
    todo.status = "完了"
    console.log(todos);
    fileManager.saveTodos(todos);
    console.log(chalk.green("ステータスを更新しました"));

}

// 削除コマンド処理
function deleteTodos(id) {

    // JSONファイルを読込み
    const todos = fileManager.loadTodos();
    // 引数で入力されたIDを検索し、データを取得
    const delTodo = todos.filter(t => t.id !== id);


    if(todos.length === delTodo.length) {
        console.log(chalk.red("指定されたIDは存在しません。"));
        return
    }
    //　データの保存
    console.log(delTodo);
    fileManager.saveTodos(delTodo);
    console.log(chalk.yellow("指定されたIDのデータを削除しました。"));

}

export {addTodos};
export {listTodos};
export {doneTodos};
export {deleteTodos};