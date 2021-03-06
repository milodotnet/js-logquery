//handy links
//https://github.com/Azure/azure-storage-node
//https://azure.microsoft.com/en-us/documentation/articles/storage-nodejs-how-to-use-table-storage/
console.log("Log table storage view");

var azure = require('azure-storage');
var chalk = require('chalk');
var fs = require('fs');
var queries = require('./queries.js');
var storage = require('./table-storage.js');


fs.readFile( __dirname + '/config.json', function (err, configContent) {
  if (err) {
    console.log(chalk.red("Error while trying to read the config file"));  
    console.log(chalk.yellow("Do you have a config.json file in the working directory? If not try run \"node initconfig.js\" then supply storage account setting"));
    return; 
  }
  
  var config = JSON.parse(configContent);
  var level = 5;
  
  console.log(chalk.gray("running query with options: "));
  console.log(config);
  
  if(config.local){
    process.env['EMULATED'] = 'true';    
  }
  
  if(config.level){
    level = config.level;
  }
  
  var query = queries.queryByEventLevel(level, 1000);
  console.log("Querying by event level: " + level);

  
  storage.execute({ 
      storageAccountName : config.azureStorageAccount.name,
      storageAccountKey :  config.azureStorageAccount.key,
      tableName : 'OrderLogs',
  }, query, printQueryResults);

});  

function printQueryResults(entries){
    console.log("printing " + entries.length  + "query results");  
    entries.map(printLogEntry);    
    console.log("end of logs...");  
}

function printLogEntry(entry){
    var currentPayload = entry.Payload["_"];
    var logMessage = JSON.parse(currentPayload);
    var startOfException = logMessage.message.indexOf("exception: ");
    var offset = 10;
    if(startOfException == -1 ){
        startOfException = logMessage.message.indexOf("Exception: ");
    }
    
     if(startOfException == -1 ){
        startOfException = logMessage.message.indexOf("Error : ");
        offset = 7;
    }
    

    if(startOfException == -1){
        if(entry.Level["_"] === 4){
            console.log(chalk.yellow("info level"));
        }
        if(entry.Level["_"] === 5){
            console.log(chalk.blue("verbose level"));
        }
        console.log(entry.Timestamp["_"]); 
        console.log(logMessage.message);
        return; 
    }
    
    console.log(chalk.red("errors"));
    startOfException = startOfException + offset;
    
    var expectionPart = logMessage.message.substring(startOfException);
    var expectionObj = JSON.parse(expectionPart);

    console.log(entry.Timestamp["_"]); 
    console.log(expectionObj.Message);   
    console.log(expectionObj.StackTraceString);
    console.log("end of log entry.... \n");  
}






