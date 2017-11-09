var azure = require('azure-storage');
var chalk = require('chalk');

function queryTableStorageLogs(options, query, resultsPrinter){
    process.env['AZURE_STORAGE_ACCOUNT'] = options.storageAccountName;
    process.env['AZURE_STORAGE_ACCESS_KEY'] = options.storageAccountKey;
    console.log("Querying the " + options.tableName + " table");
   
    var tableSvc = azure.createTableService();
    tableSvc.queryEntities(options.tableName, query, null, function(error, result, response) {
    if(!error) {
        resultsPrinter(result.entries);
    }
    else {
        console.log(chalk.red("failed to get logs"));
        console.log(error); 
    }
    });    
}

var exports =  module.exports = {};
exports.execute = queryTableStorageLogs;