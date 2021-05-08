const ffmpeg = require('fluent-ffmpeg');

var convertings = [];

const command1 = ffmpeg('./v.mp4').on('progress', function (progress) {
    percent = parseInt(progress.percent);
    console.log(parseInt(progress.percent) + '% percent');

}).save('./v1.mp4');
const command2 = ffmpeg('./v.mp4').on('progress', function (progress) {
    percent = parseInt(progress.percent);
    console.log(parseInt(progress.percent) + '% percent');

}).save('./v2.mp4');

convertings.push(command1);
convertings.push(command2);

setTimeout(function () {
    convertings.forEach(converting => {
        converting.on('error', function () {
            console.log('Ffmpeg has been killed');
        });

        converting.kill();
    });
}, 3000);