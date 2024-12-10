const videoPlayer = {
    video: document.getElementById('championshipVideo'),
    
    playPause: function() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    },
    
    restart: function() {
        this.video.currentTime = 0;
        this.video.play();
    },
    
    skip: function(seconds) {
        this.video.currentTime += seconds;
    },
    
    init: function() {
        // Add keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.playPause();
            } else if (e.code === 'ArrowRight') {
                this.skip(10);
            } else if (e.code === 'ArrowLeft') {
                this.skip(-10);
            }
        });
    }
};

// Initialize the video player
videoPlayer.init();
