var frisby = require('frisby');
var fs = require('fs');
var contents = fs.readFileSync('postDriverLogin.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
	frisby.create('POST login details')
		.post('http://apps.driveubox.com/driver/login/',{
			"mobile_number":jsonContent[i].mobile_number,
			"password":jsonContent[i].password,
			"imei_number":jsonContent[i].imei_number
		})
  		.expectStatus(200)
  		.expectHeader('content-type','application/json')
  		.expectJSONTypes({
			status:String,
			driver_rating:String,
        		driver_image:String,
			driver_id:Number,
			mobile_number:String,
			message:String,
		})
		.inspectJSON()
		.inspectBody()
		.toss();
}
