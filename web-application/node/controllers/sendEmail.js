var http = require('http');

var sendEmail = (userEmail, subject, emailTemplate) => {
    var body = JSON.stringify({
        "email": userEmail,
        "subject": subject,
        "template": emailTemplate
    });
    
    var options = {
        host: "localhost",
        port: 3000,
        path: "/sendEmail",
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Content-Length' : Buffer.byteLength(body, 'utf8')
        }
    }

    console.log("About to make http call");
    var req = http.request(options, function(res) {
        console.log("made http call");
        console.log("statusCode: ", res.statusCode);
    
        res.on('data', function(d) {
            console.info('POST result:\n');
            process.stdout.write(d);
            console.info('\n\nPOST completed');
        });
    });
    
    // write the json data
    req.write(body);
    req.end();
    req.on('error', function(e) {
        console.error(e);
    });
};

module.exports = sendEmail;
