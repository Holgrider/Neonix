const axios = require('axios')
const fs = require('fs');
const path = require('path');

const currentVersion = require('./version.json')
const owner = 'MaxMady';
const repo = 'Neonix';
const branch = 'main';
const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;


async function fetchData(url) {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
}
(async () => {
    let versionUrl = await fetchData(rawBaseUrl+`version.json`)
    console.log(versionUrl)
})