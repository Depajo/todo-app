// Laskee ajan joka on kulunut ajanlaskennan aloittamisesta nykyhetkeen
// ja lisää sen aikaan joka on jo laskettu
const differenceBetween = async (timeNow, timeStarted, timeAlredy) => {
    return timeStarted - timeNow + timeAlredy;
};

// Palauttaa tämän hetken ajan
const timeNowSecond = async () => {
    return Math.floor(Date.now() / 1000);
};

// Käyttäjän syöttämän ajan muuttaminen sekunneiksi.
const convertTimeToSeconds = async (times) => {
    return (await Date.parse(times)) / 1000;
};

export { differenceBetween, timeNowSecond, convertTimeToSeconds };
