const encodeString = (...datas) => datas.join(",");
const decodeString = (payload) => payload.split(",");

module.exports = {
    encodeString,
    decodeString,
};