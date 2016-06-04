/**
 * Created by Irayt1063
 *              on 4/14/2016.
 */
var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ")--" + error.message);
}

function successTransaction() {
    console.info("Success: Transaction successful");
}

var DB = {
    createDatabase: function () {
        var shortName = "Photogram";
        var version = "1.0";
        var displayName = "DB for Photos";
        var dbSize = 10 * 1024 * 1024;

        console.info("Creating database ...");
        //or window.openDatabase()
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
    },

    createTables: function () {

        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }

        function successCreate() {
            console.info("Success: Create Table successful. ");
        }

        function successInsert() {
            console.info("Success: Data insert successful");
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            var options = [];

            console.info("Creating Table: photos...");
            var sql = "CREATE TABLE IF NOT EXISTS photos("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL," +
                "ownerId INTEGER NOT NULL," +
                "description VARCHAR (100)," +
                "place VARCHAR (100)," +
                "private VARCHAR(5)," +
                "photo VARCHAR(200)," +
                "FOREIGN KEY (ownerId) REFERENCES users(id));";

            tx.executeSql(sql, options, successCreate, errorHandler);


            console.info("Creating Table: users...");
            sql = "CREATE TABLE IF NOT EXISTS users(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "username VARCHAR (30) NOT NULL," +
                "password VARCHAR(20) NOT NULL," +
                "firstName VARCHAR (20) NOT NULL," +
                "lastName VARCHAR (20) NOT NULL," +
                "email VARCHAR (20) NOT NULL," +
                "photo VARCHAR(200));";

            tx.executeSql(sql, options, successCreate,errorHandler);



            console.info("Creating Table: comments...");
            sql = "CREATE TABLE IF NOT EXISTS comments(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "photoId INTEGER NOT NULL," +
                "ownerId INTEGER NOT NULL," +
                "text VARCHAR(100) NOT NULL," +
                "FOREIGN KEY (ownerId) REFERENCES users(id)," +
                "FOREIGN KEY (photoId) REFERENCES photos(id));";

            tx.executeSql(sql, options, successCreate,errorHandler);


        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function successDrop() {
            console.info("Success: Dropping Table successful. ");
        }

        function successTransaction() {
            console.info("Success: Transaction successful");
        }

        function txFunction(tx) {
            var options = [];
            //repeat for other tables
            //=======================
            console.info("Dropping Table: photos");
            var sql = "DROP TABLE IF EXISTS photos;";

            tx.executeSql(sql, options, successDrop, errorHandler);
            //=====================================================

            console.info("Dropping Table: users");
            sql = "DROP TABLE IF EXISTS users;";

            tx.executeSql(sql, options, successDrop, errorHandler);

            console.info("Dropping Table: comments");
            sql = "DROP TABLE IF EXISTS comments;";

            tx.executeSql(sql, options, successDrop, errorHandler);

        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

