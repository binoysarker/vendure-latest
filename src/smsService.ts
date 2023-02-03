const request = require('request');

export class SmsService {
  smsQuery = {
    userid: "1671",
    password: "trP2V3o5bhZTK9JM",
    sender: "SMSKAI",
    to: "9840032880",
    message:
      "KAAIKANI App Registration Code is 81154.Use this to verify your mobile. By KAAIKANI",
    reqid: "1",
    format: "\{json|text\}",
    route_id: "3",
  };
  constructor(message: string, to: string) {
    this.smsQuery.message = message;
    this.smsQuery.to = to;
  }
  sendSms() {
    const path = `https://apps.sandeshlive.com/API/WebSMS/Http/v1.0a/index.php?userid=1671&password=trP2V3o5bhZTK9JM&sender=SMSKAI&to=${this.smsQuery.to}&message=${this.smsQuery.message}&reqid=1&format={json|text}&route_id=3`;
    console.log(path);
    
    let options = {
      'method': 'GET',
      'url': path,
      'headers': {
        'Cookie': 'PHPSESSID=bagmvgdulq1os2mf60rcvrc784'
      }
    };
    request(options, (error:any, response:any) => {
      if (error) {
        console.log(error);
      }else {

        console.log(response.body);
      }
      
    });
  }
}
