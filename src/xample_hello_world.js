// const abc = require('./hello-world-functions');
// const def = abc.helloWorldString()
import { helloWorldString, helloWorldString2 } from './hello-world-functions';
function sayHello() {
    let testString = helloWorldString();
    console.log(testString);
    let testString2 = helloWorldString2();
    console.log(testString2);
}
export {sayHello}



  