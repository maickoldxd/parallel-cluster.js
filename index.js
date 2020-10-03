var ffmpeg = require('fluent-ffmpeg');
const path = require('path')
var command = ffmpeg();


ffmpeg(path.join(__dirname,`videos/prueba.mp4`))
    .size("1280x720")
    .videoBitrate(2500)
    .fps(29.7)
    .output("resultado.mp4")
    .duration(900)
    .outputOptions([
        `-vf subtitles=${path.join(__dirname,`videos/subs.ass`)}`,
        `-threads 0`
    ])
    .addOption('-vf', 'movie='+path.join(__dirname,`videos/2.png`)+ ' [watermark]; [in] [watermark] overlay=0:0 [out]')
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