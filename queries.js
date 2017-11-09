var exports = module.exports = {};

var azure = require('azure-storage');

exports.queryByEventLevel = function(eventLevel, numberOfRows){

    if(!numberOfRows){
        numberOfRows = 1000;
    }

//    var query = TableQuery.dateFilter('DateTimeField', QueryComparisons.EQUAL, new Date(Date.UTC(2001, 1, 3, 4, 5, 6)));

    var query = new azure.TableQuery()
        .top(numberOfRows)
        .where('Payload_correlationId == ?', "00000000-0000-0000-0000-000000000000");

    //var query = new azure.TableQuery()
        //.where('Payload_correlationId == ?', "ec8e398b-172f-4a7d-80b9-d955cdbe3873");


        /*
    var guidString = "5bab238c-89e6-4ac0-bc87-fad8691c3035";
    var TableUtilities = azure.TableUtilities;
    var TableQuery = azure.TableQuery;
    var tableQuery = new TableQuery().where(TableQuery.guidFilter('Payload_correlationId', TableUtilities.QueryComparisons.EQUAL, guidString));
    return tableQuery;    
*/

//2519139166199999999 
//2519139163799999999 
//2519139163799999999
//636238368000000000
    var partitionId = "2519140177799999999";

    var query = new azure.TableQuery()
        .where('PartitionKey == ?', partitionId);

    return query;
}

   

