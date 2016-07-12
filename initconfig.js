var fs = require("fs");
  
var filename = "/config.json";  
  
var config = {};
config.azureStorageAccount = {};
config.azureStorageAccount.name = "<supply name>";
config.azureStorageAccount.key = "<supply key>"; 

fs.writeFile(__dirname + filename, JSON.stringify(config), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The config file was saved to " + filename);
}); 
  