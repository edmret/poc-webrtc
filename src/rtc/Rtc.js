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
            document.querySelector('video').src = URL.createObjectURL(stream);

            // share this "MediaStream" object using RTCPeerConnection API
        }, function (error) {
        console.error('getScreenId error', error);

        alert('Failed to capture your screen. Please check Chrome console logs for further information.');
        });
    });
}