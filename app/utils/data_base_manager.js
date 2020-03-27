

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "savemoneydatabase.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 2000000;



const config_db_sql = 'CREATE TABLE IF NOT EXISTS Consume( '
    + 'time_stamp INTEGER PRIMARY KEY NOT NULL, '
    + 'account_type INTEGER, '
    + 'consume_type INTEGER, '
    + 'amount VARCHAR(50), '
    + 'date_formate_string VARCHAR(50), '
    + 'note VARCHAR(100)); '


const query_sql_consume = 'SELECT * FROM Consume';

const errorCB = function (err) {
    console.log("SQL Error: " + err);
    console.log(err);
}

const successCB = function () {
    console.log("SQL executed fine");
}

const openCB = function () {
    console.log("Database OPENED");
}

const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, openCB, errorCB);



var loadAndQueryDB = (completion) => {
    console.log("Opening database ...");
    configDataBase(db);

    db.transaction((cx) => {
        cx.executeSql(query_sql_consume, [], (tx, results) => {
            var len = results.rows.length;

            var rows = []
            debugger
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              rows.push(row)
            }
            if (completion !== null)
                completion(rows);
        })
    })

}
/* 添加一条记录到数据库 */
var addOneConsumeToDB = (item) => {

    configDataBase(db);
    let { time_stamp, account_type, consume_type, amount, note, date_formate_string } = item;

    db.transaction((cx) => {
        cx.executeSql(`INSERT INTO Consume (time_stamp, account_type, consume_type,amount,note,date_formate_string) VALUES (${time_stamp}, ${account_type}, ${consume_type}, ${amount}, '${note}', '${date_formate_string})';`, [])

    })




}
/* 配置连接数据库 */
var configDataBase = function (db) {
    console.log(config_db_sql)
    db.executeSql(config_db_sql, [], () => {
        console.log("configDataBase ------ success");
    }, (error) => {
        console.log("configDataBase ------ error");
        console.log(error)

    });
}




export { addOneConsumeToDB, loadAndQueryDB }



