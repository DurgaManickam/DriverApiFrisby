var frisby =require('frisby')

var fs = require('fs');

var contents = fs.readFileSync('getDriverUpcomingBookings.json');

var jsonContent = JSON.parse(contents);

for(i in jsonContent){

        console.log(jsonContent[i]);

}

for(i in jsonContent){

        frisby.create('Driver Upcoming Bookings api test')

                .get('http://apps.driveubox.com/driver/upcoming-bookings/?driver_id='+jsonContent[i].driver_id+'&imei_number='+jsonContent[i].imei_number)

                .expectStatus(200)

                .expectHeaderContains('content-type','application/json')

                .expectJSONTypes({status:String,

			bookings:Array,

			message:String,

                       	count:Number,
			
			pending_payments:Array

               })

                .inspectRequest()

                .inspectBody()

        .toss();

}
