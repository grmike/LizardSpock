
function randomTest(count) {
    randomTemplate(count, baseRandom, 'randomResult');
}

function randomBetterTest(count) {
    randomTemplate(count, betterRandom, 'randomBetterResult');
}

function randomTemplate(count, randomFunc, resultId) {

    var ret = [0, 0, 0, 0, 0];
    for (var i = 0; i < count; ++i) {
        ret[randomFunc()]++;
    }

    var str = ''
    for (var j = 0; j < ret.length; ++j)
        str += ret[j] + ' - ';
    str = str.substr(0, str.length - 3);

    $('#' + resultId).text(str);
}

function baseRandom() {
    return Math.round(Math.random() * 4);
}

function betterRandom() {
    return Math.floor(Math.random() * 5);
}

function better2Random() {
    var ret = Math.round(Math.random() * 5);
    return (ret == 5) ? 0 : ret;
}