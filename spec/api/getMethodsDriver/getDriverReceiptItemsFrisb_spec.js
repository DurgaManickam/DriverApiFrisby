var frisby =require('frisby')
var fs = require('fs');
var contents = fs.readFileSync('getDriverReceiptItems.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
        frisby.create('Driver Receipt Items api test')
                .get('http://apps.driveubox.com/app/receipt-items/v2/?booking_id='+jsonContent[i].booking_id+'&imei_number='+jsonContent[i].imei_number)
                .expectStatus(200)
                .expectHeaderContains('content-type','application/json')
                .expectJSONTypes({
			status:String,
			items:Array
             	})
                .inspectRequest()
                .inspectBody()
        .toss();
}
