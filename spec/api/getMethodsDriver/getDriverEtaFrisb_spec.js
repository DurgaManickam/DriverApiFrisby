var frisby =require('frisby')
var fs = require('fs');
var contents = fs.readFileSync('getDriverEta.json');
var jsonContent = JSON.parse(contents);
for(i in jsonContent){
        console.log(jsonContent[i]);
}
for(i in jsonContent){
        frisby.create('Driver Eta api test')
                .get('http://apps.driveubox.com/driver/driver_eta/?booking_id='+jsonContent[i].booking_id+'&imei_number='+jsonContent[i].imei_number)
                .expectStatus(200)
                .expectHeaderContains('content-type','application/json')
                .expectJSONTypes({
			status:String,
			starts_in_msg:String,
			onroute_btn_msg:String,
 			duration:String,
  			driver_app_msg:String,
  			message:String,
  			enable_reached:Boolean,
  			distance:String,
  			longitude:Number,
  			enable_onroute:Boolean,
  			latitude:Number,
  			starts_in:String
             	})
                .inspectRequest()
                .inspectBody()
        .toss();
}
