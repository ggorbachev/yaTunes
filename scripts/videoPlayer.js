export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoVolumeOff = document.querySelector('.video-volume-off');
  const videoVolumeDown = document.querySelector('.video-volume-down');
  const videoVolumeUp = document.querySelector('.video-volume-up');
  const videoFullscreen = document.querySelector('.video-fullscreen');


  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.remove('fa-play');
      videoButtonPlay.classList.add('fa-pause');
    }
  };

  const togglePlay = event => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  const addZero = n => n < 10 ? '0' + n : n;

  const changeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);
  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoPlayer.addEventListener('timeupdate', () => {

    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;

  });

  videoVolume.addEventListener('input', changeValue);

  changeValue();

  videoVolumeOff.addEventListener('click', () => {
    let currentVolume;
    if (videoVolume.value != 0 ) {
      currentVolume = videoVolume.value;
      videoVolume.value = 0;
    } else {
      videoVolume.value = currentVolume;
    }
    changeValue();
  });

  videoVolumeDown.addEventListener('click', () => {
    videoVolume.value -= 5;
    changeValue();
  });
  videoVolumeUp.addEventListener('click', () => {
    let currentVolume = +(videoVolume.value);
    currentVolume += 5;
    videoVolume.value = currentVolume;
    changeValue();
  });

  videoPlayer.addEventListener('volumechange', ()=> {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  });
}