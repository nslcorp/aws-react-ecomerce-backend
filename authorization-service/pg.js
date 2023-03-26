

const str = "my-git-user-name=TEST_PASSWORD"  // bXktZ2l0LXVzZXItbmFtZT1URVNUX1BBU1NXT1JE
//"nslcorp:TEST_PASSWORD" bnNsY29ycDpURVNUX1BBU1NXT1JE
console.log(btoa(str));

console.log(Buffer.from(str).toString("base64"))
console.log(atob('dGVzdFBhc3N3b3Jk'));

console.log(Buffer.from('dGVzdFBhc3N3b3Jk', 'base64').toString('utf-8'))

console.log('here')

console.log('admin', btoa('admin'));
console.log('test', btoa('test'));
console.log('nslcorp', btoa('nslcorp'));

