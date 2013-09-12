//Iniciando o banco de dados

var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("ERROR! Navegador não permite banco de dados.");
        }
        else {
            initDB();
            createTables();
            queryAndUpdateOverview();
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("ERROR! Versão de banco de dados inválida.");
        }
        else {
            updateStatus("ERROR! Erro desconhecido: " + e + ".");
        }
        return;
    }
}

function initDB(){
    var shortName = 'management-book';
    var version = '1.0';
    var displayName = 'ContactsBookDB';
    var maxSize = 65536; //bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

//Cria tabela contatos
function createTables(){
	var query = 'CREATE TABLE IF NOT EXISTS management(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL, telefone INTEGER NOT NULL, descricao VARCHAR NOT NULL, endereco VARCHAR NOT NULL, mode2 VARCHAR NOT NULL, mode6 VARCHAR NOT NULL, situacao VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'management' criada!");
        });
    } 
    catch (e) {
        updateStatus("ERROR! Base de dados não criada " + e + ".");
        return;
    }
}

//Limpa o banco
function dropTables(){
	var query = 'DROP TABLE management;';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'management' deletada!");
        });
    } 
    catch (e) {
        updateStatus("ERROR! Base de dados não criada " + e + ".");
        return;
    }
}

