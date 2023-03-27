const axios = require('axios')
const fs = require('fs');
const path = require('path');
require(`colors`)
const { date , log } = require('./index')
const version = require('./version.json')
const owner = 'MaxMady';
const repo = 'Neonix';
const branch = 'main';
const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;


async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
}
(async () => {
    let currentVersion = await fetchData(rawBaseUrl+`update/version.json`)
    if(version.version == currentVersion.version) {
        log(`Nexion is upto date!`, `green`, true)
    } else {
        let files = await fetchData(rawBaseUrl+`update/files.json`)
        
    }
})()