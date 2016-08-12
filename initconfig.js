var fs = require("fs");
  
var filename = "/config.json";  
  
var config = {};
config.azureStorageAccount = {};
config.azureStorageAccount.name = "devstoreaccount1";
config.azureStorageAccount.key = "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=="; 
config.local = true;
config.level = 5;

fs.writeFile(__dirname + filename, JSON.stringify(config), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The config file was saved to " + filename);
}); 
  