/**
 * Created by Irayt1063
 *              on 4/14/2016.
 */

var Photo = {
    insert: function(options){
        function successInsert() {
            console.info("Success: Insert successful");
        }
        function txFunction(tx){
            console.info("inserting photo record");
            var sql = "INSERT INTO photos (name, ownerId, description, " +
                "place,private, photo) values(?,?,?,?,?,?);";
            console.info(options);
            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx){
            console.info("Selecting a photo record");
            var sql = "SELECT * FROM photos WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(callback){
        var options = [];
        function txFunction(tx){
            console.info("Selecting all photos");
            var sql = "SELECT * FROM photos;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectFromUser: function(options, callback){

        function txFunction(tx){
            console.info("Selecting a photo record from one user");
            var sql = "SELECT * FROM photos WHERE ownerId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options){
        function successUpdate(){
            console.info("Success: Update photo record");
        }
        function txFunction(tx){
            var sql = "UPDATE photos" +
                "SET name=?, description=?, place=?, private=? WHERE id=?;";
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options){
        function successDelete(){
            console.info("Success: photo record deleted");
        }
        function txFunction(tx){
            console.info("Deleting");
            var sql = "DELETE FROM photos WHERE id=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Comment={
    insert:function(options){
        function successInsert() {
            console.info("Success: Insert comment successful");
        }
        function txFunction(tx){
            console.info("inserting comment");
            var sql = "INSERT INTO comments (photoId, ownerId, text)" +
                " values(?,?,?);";
            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx){
            console.info("Selecting comments for photo");
            var sql = "SELECT * FROM comments WHERE photoId=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options){
        function successDelete(){
            console.info("Success: comment record deleted");
        }
        function txFunction(tx){
            console.info("Deleting");
            var sql = "DELETE FROM comments WHERE id=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var User = {
    insert:function(options){
        function successInsert() {
            console.info("Success: Insert new user successful");
        }
        function txFunction(tx){
            console.info("inserting user");
            var sql = "INSERT INTO users (username, password, firstName, " +
                "lastName, email, photo) values(?,?,?,?,?,?);";
            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx){
            console.info("Selecting a user");
            var sql = "SELECT * FROM users WHERE username=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectEmail: function(options, callback){

        function txFunction(tx){
            console.info("Selecting a user");
            var sql = "SELECT * FROM users WHERE email=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    search: function(options, callback){

        function txFunction(tx){
            console.info("Selecting a user");
            var sql = "SELECT * FROM users WHERE username LIKE ('%' || ? || '%');";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectId: function(options, callback){

        function txFunction(tx){
            console.info("Selecting a user");
            var sql = "SELECT * FROM users WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(callback){
        var options = [];
        function txFunction(tx){
            console.info("Selecting all users");
            var sql = "SELECT * FROM users;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    updatePhoto: function(options){
        function successUpdate(){
            console.info("Success: Update user record");
        }
        function txFunction(tx){
            var sql = "UPDATE users " +
                "SET photo=? WHERE id=?;";
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options){
        function successUpdate(){
            console.info("Success: Update user record");
        }
        function txFunction(tx){
            var sql = "UPDATE users " +
                "SET username = ?, firstName = ?, lastName = ?, email=?, photo=? WHERE id=?;";
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    changePassword: function(options){
        function successChangePassword(){
            console.info("Success: Password has been changed");
        }

        function txFunction(tx){
            var sql = "UPDATE users " +
                "SET password=? WHERE id=?;";
            tx.executeSql(sql, options, successChangePassword, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options){
        function successDelete(){
            console.info("Success: user record deleted");
        }
        function txFunction(tx){
            console.info("Deleting");
            var sql = "DELETE FROM users WHERE id=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}
