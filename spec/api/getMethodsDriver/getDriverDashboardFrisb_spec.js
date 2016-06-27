var frisby =require('frisby')

var fs = require('fs');

var contents = fs.readFileSync('getDriverDashboard.json');

var jsonContent = JSON.parse(contents);

for(i in jsonContent){

        console.log(jsonContent[i]);

}

for(i in jsonContent){

        frisby.create('Dashboard driver api test')

                .get('http://apps.driveubox.com/driver/app/dashboard/?driver_id='+jsonContent[i].driver_id+'&imei_number='+jsonContent[i].imei_number)

                .expectStatus(200)

                .expectHeaderContains('content-type','application/json')

                .expectJSONTypes({status:String,

                        today_count:Number,

                        driver_rating:Number,

                        driver_image:String,

                        today_earnings:Number,

                        driver_name:String,

                        message:String})

                .inspectRequest()

                .inspectBody()

        .toss();

}
