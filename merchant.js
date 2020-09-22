const PaperScroll = require("paper-scroll-sdk");
const readline = require('readline');

const client = new PaperScroll(123, "***")

const api = client.getApi();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
/* setInterval(() => {
api.callMethod('transfers.create', {
        "peer_id": Number(322861790),
        "object_type": "balance",
        "object_type_id": 0,
        "amount": Number(2000000000000)
      }).then((e) => {
        console.log(`Перевод выполнен.`)
     })
     .catch((e) => {
      console.log(e)
     
     }) 
}, 1000) */

rl.question('что будем делать? (1 - баланс, 2 - перевод, 3 - баланс мерчанта по ID, 4 - последние переводы): ', (answer) => {
  
  if (Number(answer) == 1) {
    api.getMerchants().then((result) => {
      console.log(`Баланс мерчанта: ${Math.floor(result[0].balance / 1000)}`)
      rl.close();
    })
    }
    if (Number(answer) == 2) {
      rl.question('введите ид: ', (answer1) => {
        rl.question('введите сумму: ', (answer2) => {
          api.callMethod('transfers.create', {
        "peer_id": Number(answer1),
        "object_type": "balance",
        "object_type_id": 0,
        "amount": Number(answer2)
      }).then((e) => {
        console.log(`Перевод выполнен.`)
        rl.close();
     })
     .catch((e) => {
      console.log(e)
     })
        })
      })
    }

   if (Number(answer) == 3) {
    rl.question('введите ид мерчанта: ', (answer1) => {
    api.getMerchants([Number(answer1)]).then((result) => {
      console.log(`Баланс мерчанта: ${Math.floor(result[0].balance / 1000)}`)
      rl.close();
    })
         .catch((e) => {
      console.log(e)
     })
  })
    }
    if (Number(answer) == 4) {
    
    api.callMethod('transfers.getHistory', {
        "limit": 5
      }).then((e) => {
        console.log(e)
        rl.close();
     })
     .catch((e) => {
      console.log(e)
     })
    }

});

