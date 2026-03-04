import fs from 'fs';
import * as common from './common.js'
import * as fileManager  from './fileManager.js'

// 初期化
if(!fs.existsSync(fileManager.FILE)) {
    fs.writeFileSync(fileManager.FILE,JSON.stringify([]));
}


// コマンド引数を取得
const [,, command, ...args] = process.argv;

//　コマンド判別
switch (command) {

    // addメソッドを実行
    case 'add':
        common.addTodos(args.join(""));
        break;

    case 'list':
        common.listTodos();
        break;

            case 'done':
        common.doneTodos(args.join());
        break;

    case 'delete':
        common.deleteTodos(args.join());
        break;

    default:
}
