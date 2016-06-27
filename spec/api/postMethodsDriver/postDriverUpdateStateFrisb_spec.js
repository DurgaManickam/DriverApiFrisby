var frisby = require('frisby');
var fs = require('fs');
var contents = fs.readFileSync('postDriverUpdateState.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
	frisby.create('Post Driver Update-State api details')
	.post('http://apps.driveubox.com/driver/update-state/imei='+jsonContent[i].imei_number,{
			"driver_id":jsonContent[i].driver_id,
			"state":jsonContent[i].state,
			"booking_id":jsonContent[i].booking_id
		})
  		.expectStatus(200)
  		.expectHeader('content-type','application/json')
  		.expectJSONTypes({
			status:String,
			last_state:String,
			state:String,
			driver_id:String,
			message:String,
			booking_status:String
		})
		.inspectJSON()
		.inspectBody()
		.toss();
}
