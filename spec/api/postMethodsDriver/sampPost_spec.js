var frisby = require('frisby');
frisby.create('POST login details')
	.post('http://apps.driveubox.com/driver/login/',{
		 "mobile_number":'9787544561',
                 "password":'1234',
                 "imei_number":'866392021956945'
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
