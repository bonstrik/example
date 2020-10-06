const dev = false;

const ABC = [];
const abc = [];

for (i = 65; i < 65 + 26; i++) {
    ABC[i] = i;
    ABC[i + 26] = i;
    ABC[i - 26] = i;
}

for (i = 97; i < 97 + 26; i++) {
    abc[i] = i;
    abc[i + 26] = i;
    abc[i - 26] = i;
}

encodeOrd = function(n, shift) {
        if (dev) console.info(n, shift);
    var result, newIndex;
    newIndex = n + shift % 26;
        if (dev) console.info(newIndex);
    if (n >= 65 && n <= 65 + 26) {
        result = ABC[newIndex];
        if (typeof result!== 'undefined') return result;
    } else if (n >= 97 && n <= 97 + 26) {
        result = abc[newIndex];
        if (typeof result!== 'undefined') return result;
    };
    return n;
}

exports.codeOrd = function(n, action, shift) {
    if (action = 'encode') {
        return encodeOrd(n, shift);
    } else if (action = 'decode') {
        return encodeOrd(n, - shift);
    }
}

