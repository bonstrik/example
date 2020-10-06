const fs = require('fs');

exports.getOptions = function() {
    const result = {};
    const argv = process.argv;
    const length = argv.length;

    for (i = 2; i < length; i++) {
        if (argv[i] === '-a' || argv[i] === '--action') {
            if (typeof argv[i + 1] !== 'undefined' && (
                argv[i + 1] === 'encode' 
                || argv[i + 1] === 'decode'
            )) {
                result.action = argv[i + 1];
            }
        }
        if (argv[i] === '-s' || argv[i] === '--shift') {
            if (typeof argv[i + 1] !== 'undefined' 
                && parseInt(argv[i + 1]).toString() === argv[i + 1]
            ) {
                result.shift = parseInt(argv[i + 1]);
            }
        }

        if (argv[i] === '-i' || argv[i] === '--input') {
            if (typeof argv[i + 1] !== 'undefined') {
                try {
                    result.input = fs.createReadStream(argv[i + 1]);
                } catch(error) {
                    if (error.code === 'ENOENT') {
                        console.log("Can't read file " + argv[i + 1]);
                    } else {
                    throw error;
                    }
                } 
            }
        }
        if (argv[i] === '-o' || argv[i] === '--output') {
            if (typeof argv[i + 1] !== 'undefined') {
                result.output = fs.createWriteStream(argv[i + 1], {flags: 'a'});
           
            }
        }
            
    }

    // if no -i, -o
    if (typeof result.input === 'undefined') {
        result.input = process.stdin;
    }
    if (typeof result.output === 'undefined') {
        result.output = process.stdout;
    }

    // errors proceed
    if (typeof result.action === 'undefined') {
        console.error('Action option are missing.');
        process.exit(1);
    }
    if (typeof result.shift === 'undefined') {
        console.error('Shift option are missing.');
        process.exit(1);
    }

    return result;
}
