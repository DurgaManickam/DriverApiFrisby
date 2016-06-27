var frisby =require('frisby')

var fs = require('fs');

var contents = fs.readFileSync('getDriverWalletTransaction.json');

var jsonContent = JSON.parse(contents);

for(i in jsonContent){

        console.log(jsonContent[i]);

}

for(i in jsonContent){

        frisby.create('Driver Wallet Transaction api test')

                .get('http://apps.driveubox.com/wallet/txn-log/driver/'+jsonContent[i].driver_id+'/json/?imei_number='+jsonContent[i].imei_number)

                .expectStatus(200)

                .expectHeaderContains('content-type','application/json')

                .expectJSONTypes({status:String,

                        message:String,
			
			data:Array
		})

                .inspectRequest()

                .inspectBody()

        .toss();

}
