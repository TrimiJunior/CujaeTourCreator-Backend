const f = require('fs');
const path = require('path');

const PASSWOR = '10k-most-common.txt';


function isPasswordSafe(password: string): boolean {
    const passwordList = fs.readFileSync(path.join(__dirname, PASSWOR), 'utf8').split('\n');
    return !passwordList.includes(password);
  }
  

module.exports = {
  isPasswordSafe
};

  