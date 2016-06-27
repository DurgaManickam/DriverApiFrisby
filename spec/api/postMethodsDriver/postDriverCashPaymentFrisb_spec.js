var frisby = require('frisby');
var fs = require('fs');
var contents = fs.readFileSync('postDriverCashPayment.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
	frisby.create('Post Driver Cash Payment api details')
	.post('http://apps.driveubox.com/payment/cash_payment/?imei='+jsonContent[i].imei_number,{
			"booking_id":jsonContent[i].booking_id,
			"amount":jsonContent[i].amount
		})
  		.expectStatus(200)
  		.expectHeader('content-type','application/json')
  		.expectJSONTypes({
			status:String,
			message:String
		})
		.inspectJSON()
		.inspectBody()
		.toss();
}
