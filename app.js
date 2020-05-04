class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.editButton = document.querySelector(".edit-volume");
    this.kickAudio = document.querySelector(".kick-sound");
    this.tomAudio = document.querySelector(".tom-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.index = 0;
    this.bpm = 120;
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBar = document.querySelectorAll(`.b${step}`);
    console.log(activeBar);
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.start();
  console.log("Starting");
});
