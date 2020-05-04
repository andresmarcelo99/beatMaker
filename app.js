class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.StopButton = document.querySelector(".stop");
    this.clearButton = document.querySelector(".clear");
    this.editButton = document.querySelector(".edit-volume");
    this.kickAudio = document.querySelector(".kick-sound");
    this.tomAudio = document.querySelector(".tom-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
  }
  activePad() {
    this.classList.toggle("active");
  }
  clear() {
    if (!this.isPlaying) {
      let step = this.index % 8;
      const Bars = document.querySelectorAll(`.active`);
      Bars.forEach((bar) => {
        bar.classList.toggle("active");
      });
    }
  }
  repeat() {
    let step = this.index % 8;
    const activeBar = document.querySelectorAll(`.b${step}`);
    activeBar.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("crash-pad")) {
          this.crashAudio.currentTime = 0;
          this.crashAudio.play();
        }
        if (bar.classList.contains("tom-pad")) {
          this.tomAudio.currentTime = 0;

          this.tomAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start(t_btn) {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying && t_btn) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else if (this.isPlaying && !t_btn) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  stop() {
    clearInterval();
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  console.log("Starting");
  drumKit.start(true);
});

drumKit.StopButton.addEventListener("click", () => {
  console.log("Stopping");
  drumKit.start(false);
});

drumKit.clearButton.addEventListener("click", () => {
  drumKit.clear();
});
