//https://github.com/mscdex/node-imap
{ // create raw message headers and body        
var mimemessage = require('mimemessage');

        let msg, htmlEntity, plainEntity;

        msg = mimemessage.factory({
          contentType: 'multipart/alternate',
          body: []
        });
        htmlEntity = mimemessage.factory({
          contentType: 'text/html;charset=utf-8',
          body: data.body
        });
        plainEntity = mimemessage.factory({
          body: data.body
        });
        msg.header('Message-ID', '<1234qwerty>');
        msg.header('To', data.to);
        msg.header('Subject', data.subject);
        //msg.body.push(htmlEntity);
        msg.body.push(plainEntity);

        imap.append(msg.toString());
}

{ // file stream example save as .txt most best maybe 
// using the functions and variables already defined in the first example ...

var fs = require('fs'), fileStream;

openInbox(function(err, box) {
  if (err) throw err;
  imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
    if (err) throw err;
    var f = imap.fetch(results, { bodies: '' });
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        console.log(prefix + 'Body');
        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
      });
      msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function() {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});
  
}

{ // reading the .txt files from above via fs.readFileSync or directly replace write with this in above example
  
}
