var frisby = require('frisby');
var fs = require('fs');
var contents = fs.readFileSync('postDriverAddUserCar.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
	frisby.create('Post Driver Add-User-Car api details')
	.post('http://apps.driveubox.com/driver/add-user-car/?&imei='+jsonContent[i].imei_number,{
			"booking_id":jsonContent[i].booking_id,
			"registration_number":jsonContent[i].registration_number
		})
  		.expectStatus(200)
  		.expectHeader('content-type','application/json')
  		.expectJSONTypes({
			status:String,
			car:String,
			message:String
		})
		.inspectJSON()
		.inspectBody()
		.toss();
}
