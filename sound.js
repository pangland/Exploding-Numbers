const music = new Audio('./assets/sounds/Elevator-music.mp3');
music.volume = .5;
music.loop = true;

const clickSound = new Audio('./assets/sounds/click-effect.mp3');
music.volume = .2;

export const sound = {
  playMusic() {
    music.play();
  },

  playClickSound() {
    clickSound.load();
    clickSound.play();
    // clickSound.currentTime = 0;
  }
};
