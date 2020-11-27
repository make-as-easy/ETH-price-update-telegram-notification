const dotenv = require('dotenv');
dotenv.config();
var crontab = require('node-crontab');
const axios = require('axios');
async function sendMessage() {
    let res = await axios.get('https://api.beldex.io/api/v1/market/last/ETHUSDT');
    let price = res.data.result
    const token = '1243159687:AAEAO_Qk779YEWXkcQ6NPMoAJm1Dw8tQ_tw'
    let data = {
        "chat_id": "@marketlast",
        "text": `ETH-USDT:${price}`,
        "parse_mode": "HTML"
    }
    let lowfirstPrice = process.env.LOWFIRSTPRICE
    let lowsecondPrice = process.env.LOWSECONDPRICE
    let highfirstPrice = process.env.HIGHFIRSTPRICE
    let highsecondPrice = process.env.HIGHSECONDPRICE
    if(lowfirstPrice <= price && lowsecondPrice >= price){
        let i=0;
        while(i<5){
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage?`, data)
            i++;
        }
    }
    if(highfirstPrice <= price && highsecondPrice >= price){
        let i=0;
        while(i<5){
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage?`, data)
            i++;
        }
    }
    //console.log(repsonse)
}
crontab.scheduleJob("1 * * * * *", function () {
    sendMessage()
});