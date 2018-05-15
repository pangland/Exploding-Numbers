const music = new Audio('./assets/sounds/Elevator-music.mp3');
music.volume = .5;
music.loop = true;

const clickSound = new Audio('./assets/sounds/click-effect.mp3');
music.volume = .2;

export let musicOn = false;

export const sound = {
  soundState() {
    let value = false;

    function switchValue() {
      value = value ? false : true;
    }

    function soundOn() {
      return value;
    }
  },

  playMusic() {
    music.play();
  },

  stopSound() {
    music.pause();
  },

  playClickSound() {
    clickSound.load();
    clickSound.play();
  }
};
