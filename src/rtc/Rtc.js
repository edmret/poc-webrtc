import { createContext } from "vm";

const getScreenId = window.getScreenId;

export class RTC{

    static shareScreen = () => getScreenId(function (error, sourceId, screen_constraints) {
        // error    == null || 'permission-denied' || 'not-installed' || 'installed-disabled' || 'not-chrome'
        // sourceId == null || 'string' || 'firefox'

        if(sourceId && sourceId != 'firefox') {
            screen_constraints = {
                video: {
                    mandatory: {
                        chromeMediaSource: 'screen',
                        maxWidth: 1920,
                        maxHeight: 1080,
                        minAspectRatio: 1.77
                    }
                }
            };

            if (error === 'permission-denied') return alert('Permission is denied.');
            if (error === 'not-chrome') return alert('Please use chrome.');

            if (!error && sourceId) {
                screen_constraints.video.mandatory.chromeMediaSource = 'desktop';
                screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
            }
        }

        navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        navigator.getUserMedia(screen_constraints, function (stream) {
            let windowVideo = document.getElementById('share-video');
            let copyVideo = document.getElementById('copy-video');
            let canvasVideo = document.querySelector('.video-img')
            let canvasContext = canvasVideo.getContext( '2d' );


            canvasVideo.width = window.screen.width;
            canvasVideo.height = window.screen.height;

            function drawToCanvas() {
                let positions = window.positions;
                let screen = window.screen;
                // draw the current frame of localVideo onto the canvas,
                // starting at 0, 0 (top-left corner) and covering its full
                // width and heigth

                let shareArea = document.getElementById('selected-positions-share').innerHTML.trim();
                if(!!shareArea){
                    positions = JSON.parse(shareArea);
                }

                let sw = screen.width;
                let sh = screen.height;
                let ratio;
                
                if(positions.width > positions.height){
                    ratio = sw/positions.width;
                }else{
                    ratio = sh/positions.height;
                }

                let newheight = positions.height*ratio;
                let newWidth = positions.width*ratio;

                let newTop = (sh - newheight) / 2;
                let newLeft = (sw - newWidth) / 2;

                canvasContext.rect(0,0, sw, sh);
                canvasContext.fillStyle = 'black';
                canvasContext.fill();
                canvasContext.drawImage( windowVideo, positions.left, positions.top, positions.width, positions.height, newLeft, newTop, newWidth ,newheight );
            
                //repeat this every time a new frame becomes available using
                //the browser's build-in requestAnimationFrame method
                requestAnimationFrame( drawToCanvas );
            }

            drawToCanvas();

            windowVideo.src = URL.createObjectURL(stream);

            windowVideo.addEventListener('canplay', () => {
                const stream = canvasVideo.captureStream();
                copyVideo.srcObject = stream;
              });

            // share this "MediaStream" object using RTCPeerConnection API
        }, function (error) {
        console.error('getScreenId error', error);

        alert('Failed to capture your screen. Please check Chrome console logs for further information.');
        });
    });
}