var frisby =require('frisby')

var fs = require('fs');

var contents = fs.readFileSync('getDriverConfig.json');

var jsonContent = JSON.parse(contents);

for(i in jsonContent){

        console.log(jsonContent[i]);

}

for(i in jsonContent){

        frisby.create('Driver Config api test')

                .get('http://apps.driveubox.com/driver/config/v2/?current_version='+jsonContent[i].current_version+'&imei_number='+jsonContent[i].imei_number)

                .expectStatus(200)

                .expectHeaderContains('content-type','application/json')

                .expectJSONTypes({

			status:String,
				
			app_apk_url:String,
	
			uuid:null,

			app_update_available:Boolean,

			helpline_number:null,
			
			message:String,
			
			cancellation_reasons:Array
  
             	})

                .inspectRequest()

                .inspectBody()

        .toss();

}
