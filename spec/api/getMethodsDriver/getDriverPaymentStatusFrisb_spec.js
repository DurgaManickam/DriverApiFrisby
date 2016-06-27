var frisby =require('frisby')
var fs = require('fs');
var contents = fs.readFileSync('getDriverPaymentStatus.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
        frisby.create('Driver Payment Status api test')
                .get('http://apps.driveubox.com/payment/status/?booking_id='+jsonContent[i].booking_id+'&imei_number='+jsonContent[i].imei_number)
                .expectStatus(200)
                .expectHeaderContains('content-type','application/json')
                .expectJSONTypes({
			status:String,
			is_payment_pending:Boolean,
  			payment_details:Object
             	})
                .inspectRequest()
                .inspectBody()
        .toss();
}
