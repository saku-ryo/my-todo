const fs = require('fs');
const commands = require('./commands')
const fileManager  = require('./fileManager')
const { program } = require( 'commander')

// 初期化
if(!fs.existsSync(fileManager.FILE)) {
    fs.writeFileSync(fileManager.FILE,JSON.stringify([]));
}

//commanderの定義
program
    .version('1.0.0', '-v, --version')
    .description('TODO管理ツール');

//　コマンド判別
// 引数：add<task>の処理
program
    .command('add <task>')
    .action((task) => {
        commands.addTodos(task);
    });

// 引数：listの処理
program
    .command('list')
    .action(() => {
        commands.listTodos();
    });

// 引数：done<id>の処理
program
    .command('done <id>')
    .action((id) => {
        commands.doneTodos(id);
    });

// 引数：delete<id>の処理
program
    .command('delete <id>')
    .action((id) => {
        commands.deleteTodos(id);
    });

//引数の解析
program.parse(process.argv);
