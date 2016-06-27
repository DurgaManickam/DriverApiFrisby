var frisby = require('frisby');
var fs = require('fs');
var contents = fs.readFileSync('postDriverLogout.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
	frisby.create('Post Driver Log Out details')
		.post('http://apps.driveubox.com/driver/logout/',{
			"mobile_number":jsonContent[i].mobile_number,
			"imei_number":jsonContent[i].imei_number
		})
  		.expectStatus(200)
  		.expectHeader('content-type','application/json')
  		.expectJSONTypes({
			status:String,
			driver_id:Number,
			mobile_number:String,
			message:String,
		})
		.inspectJSON()
		.inspectBody()
		.toss();
}
