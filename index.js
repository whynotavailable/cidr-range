const maxMask = toNum("255.255.255.255");

function getCIDR(str) {
    let parts = str.split('/');
    return getRange(parts[0], parts[1]);
}

function getRange(ip, cidr) {
    let shortMask = getMask(32 - cidr);
    let actualMask = maxMask - shortMask;
    let ipNum = toNum(ip);

    let min = (ipNum & actualMask) >>> 0;
    let max = (ipNum + shortMask) >>> 0;

    return {
        min: min,
        max: max,
        minIp: toIp(min),
        maxIp: toIp(max),
        inRange(ipToCheck) {
            let num = toNum(ipToCheck);
            return num >= min && num <= max;
        }
    }
}

function getMask(num) {
    return Math.pow(2, num) - 1;
}

function toNum(ip) {
    return ip.split('.').reduce((state, val) => (state << 8) + parseInt(val), 0) >>> 0
}

function toIp(num) {
    return (num >>> 24) + '.' + (num >>> 16 & 255) + '.' + (num >>> 8 & 255) + '.' + (num & 255);
}

function printBin(num) {
    console.log((num >>> 0).toString(2));
}

module.exports = {
    getRange,
    getCIDR
}
