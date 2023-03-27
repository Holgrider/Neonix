const colors = require('colors');

global.date = function date() {
    let d = new Date()
    let str = `[`+d.getHours()+`:`+d.getMinutes()+`:`+(int)(d.getMilliseconds()/10)+`] `
    return str;
}

global.log = function log(string, color, boolean) {
    if(boolean == true) {
        string = date()+string
    }
    console.log(colors[color](string));
}


module.exports = { date, log}