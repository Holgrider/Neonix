const colors = require('colors');

global.date = function date() {
    let d = new Date()
    let str = `[`+d.getHours()+`:`+d.getMinutes()+`:`+ parseInt(d.getMilliseconds()/10)+`] `
    return str;
}

global.log = function log(string, color, boolean) {
    if(string.includes(`error`)) string+= `\n\t> Please make an issue from here and report this Error! https://github.com/MaxMady/Neonix/issues`
    if(boolean == true) {
        string = date()+string
    }
    console.log(colors[color](string));
}



module.exports = { date, log }