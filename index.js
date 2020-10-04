const ffmpeg = require('fluent-ffmpeg');
const path = require('path')


ffmpeg(path.join(__dirname,`videos/prueba.mp4`))
    .input(path.join(__dirname,`videos/2.png`))
    .videoBitrate(2500)
    .fps(29.7)
    .output("resultado.mp4")
    .duration(2)
    .complexFilter([
        `[0:v]scale=1280:720[bg]`,
        `[bg][1:v]overlay=10:10, subtitles=${path.join(__dirname,`videos/subs.ass`)}`
    ])
    .outputOptions([
        '-threads', 0
    ])
    .on('error', function(err, stdout, stderr) {
        console.log('error: ' + err.message);
        console.log('stderr:' + stderr);
      })
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