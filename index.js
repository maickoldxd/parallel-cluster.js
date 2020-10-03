var ffmpeg = require('fluent-ffmpeg');
const path = require('path')
var command = ffmpeg();


ffmpeg(path.join(__dirname,`videos/prueba.mp4`))
    .size("1280x720")
    .videoBitrate(2500)
    .fps(29.7)
    .output("resultado.mp4")
    .duration(2)
    .outputOptions([
        `-vf subtitles=${path.join(__dirname,`videos/subs.ass`)}`,
        `-threads 0`
    ])
    .on('start', function(commandLine) {
        console.log(`video process start: `);
    })
    .on('progress', function(progress) {
        console.log(`Processing:${Math.round(progress.percent)}% done and ${progress.frames}`);
    })
    .on('end', function() {
        client.set(outputName,"fineshed")
    })
    .run()