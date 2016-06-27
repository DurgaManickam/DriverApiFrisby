var frisby =require('frisby')

var fs = require('fs');

var contents = fs.readFileSync('getDriverHistory.json');

var jsonContent = JSON.parse(contents);

for(i in jsonContent){

        console.log(jsonContent[i]);

}

for(i in jsonContent){

        frisby.create('Driver History api test')

                .get('http://apps.driveubox.com/driver/history/?driver_id='+jsonContent[i].driver_id+'&imei_number='+jsonContent[i].imei_number)

                .expectStatus(200)

                .expectHeaderContains('content-type','application/json')

                .expectJSONTypes({status:String,

                        message:String,

                        bookings:Array

               })

                .inspectRequest()

                .inspectBody()

        .toss();

}
