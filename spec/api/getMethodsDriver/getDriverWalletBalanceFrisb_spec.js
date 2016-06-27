var frisby =require('frisby')

var fs = require('fs');

var contents = fs.readFileSync('getDriverWalletBalance.json');

var jsonContent = JSON.parse(contents);

for(i in jsonContent){

        console.log(jsonContent[i]);

}

for(i in jsonContent){

        frisby.create('Driver Wallet Balance api test')

                .get('http://apps.driveubox.com//wallet/balance/driver/'+jsonContent[i].driver_id+'/?imei_number='+jsonContent[i].imei_number)

                .expectStatus(200)

                .expectHeaderContains('content-type','application/json')

                .expectJSONTypes({status:String,

                        wallet_balance:Number,

                        bank_details:Object,

                        message:String,
			
			updated_at:String
		})

                .inspectRequest()

                .inspectBody()

        .toss();

}
