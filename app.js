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
    this.currentKick = "./allSounds/kick-classic.wav";
    this.currentTom = "./allSounds/tom-acoustic01.wav";
    this.currentCrash = "./allSounds/crash-acoustic.wav";
    this.currentHihat = "./allSounds/hihat-acoustic01.wav";
    this.currentSnare = "./allSounds/snare-acoustic01.wav";
    this.selects = document.querySelectorAll("select");
    this.index = 0;
    this.bpm = 160;
    this.isPlaying = null;
  }
  activePad() {
    this.classList.toggle("active");
  }
  clear() {
    if (!this.isPlaying) {
      this.clearButton.style.background = "rgb(207, 207, 207)";
      this.clearButton.style.color = "black";
      let step = this.index % 8;
      const Bars = document.querySelectorAll(`.active`);

      if (Bars[0]) {
        Bars.forEach((bar) => {
          bar.classList.toggle("active");
        });
      } else {
        alert("All pads are empty!");
      }
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
  updateButton() {
    const Bars = document.querySelectorAll(`.active`);

    if (!this.isPlaying) {
      //PLAY BUTTON
      this.playButton.style.background = "rgb(207, 207, 207)";
      this.playButton.style.color = "black";
      //edited buttons
      //STOP BUTTON
      this.StopButton.style.background = "rgb(250, 81, 81)";
      this.StopButton.style.color = "white";
      //clear button
      if (Bars[0]) {
        console.log(true);
        this.clearButton.style.background = "rgb(61, 162, 209)";
        this.clearButton.style.color = "white";
      } else {
        this.clearButton.style.background = "rgb(207, 207, 207)";
        this.clearButton.style.color = "black";
      }
    } else if (this.isPlaying) {
      //edited  button
      //PLAY BUTTON
      this.playButton.style.background = "rgb(82, 190, 167)";
      this.playButton.style.color = "white";
      //STOP BUTTON
      this.StopButton.style.background = "rgb(207, 207, 207)";
      this.StopButton.style.color = "black";
      //clear button
      this.clearButton.style.background = "rgb(207, 207, 207)";
      this.clearButton.style.color = "black";
    }
  }
  changeSound(e) {
    const selectionClass = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionClass) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "crash-select":
        this.crashAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "tom-select":
        this.tomAudio.src = selectionValue;
    }
  }
}

const drumKit = new DrumKit();

//event listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  console.log("Starting");
  drumKit.start(true);
  drumKit.updateButton();
});

drumKit.StopButton.addEventListener("click", () => {
  console.log("Stopping");
  drumKit.start(false);
  drumKit.updateButton();
});

drumKit.clearButton.addEventListener("click", () => {
  drumKit.clear();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
