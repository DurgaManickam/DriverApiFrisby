var frisby = require('frisby');
var fs = require('fs');
var contents = fs.readFileSync('txtsingleDriver.txt').toString().split(",");
frisby.create('Dashboard driver api test')
        .get('http://apps.driveubox.com/driver/app/dashboard/?driver_id=' + contents)
        .expectStatus(200)
        .expectHeaderContains('content-type','application/json')
        .expectJSONTypes({status:String,
                        today_count:Number,
                        driver_rating:Number,
                        driver_image:String,
                        today_earnings:Number,
                        driver_name:String,
                        message:String})
	.inspectBody()
        .toss();

