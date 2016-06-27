var frisby =require('frisby')
var fs = require('fs');
var contents = fs.readFileSync('getDriverGetUserCars.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
        frisby.create('Driver Get User Cars api test')
                .get('http://apps.driveubox.com/driver/get-user-cars/?booking_id='+jsonContent[i].booking_id+'&imei_number='+jsonContent[i].imei_number)
                .expectStatus(200)
                .expectHeaderContains('content-type','application/json')
                .expectJSONTypes({
			status:String,
			cars:Array
             	})
                .inspectRequest()
                .inspectBody()
        .toss();
}
