var cipher =  require('./cipher');
var argv =  require('./argv');

var opts = argv.getOptions();
//  opts = {
//      action: ...,
//      shift: ...,
//      input: ...,
//      output: ...
//  }

opts.input.on('data', function(data) {
    if (data == 0) process.exit(0);
                  
    for (i = 0; i < data.length; i++) {
        data[i] = cipher.codeOrd(data[i], opts.action, opts.shift);
    };
    opts.output.write(data);    
});
