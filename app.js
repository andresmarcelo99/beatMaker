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
    this.muteButtons = document.querySelectorAll(".mute");
    this.isoButtons = document.querySelectorAll(".solo");
    this.tempoSlider = document.querySelector(".tempoSlider");
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
    console.log(this.isPlaying, t_btn);
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

  changeTempo(e) {
    const tempText = document.querySelector(".temp-nr");
    tempText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const plyBtn = document.querySelector(".play");
    console.log(plyBtn.classList.contains("active"));
    if (!plyBtn.classList.contains("active")) {
      this.start(true);
    }
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
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    const checkIso = document.querySelectorAll(".solo");
    let check = true;
    checkIso.forEach((box) => {
      if (box.classList.contains("active")) {
        check = false;
      }
    });
    e.target.classList.toggle("active");

    if (check) {
      if (e.target.classList.contains("active")) {
        switch (muteIndex) {
          case "0":
            this.kickAudio.volume = 0;
            break;
          case "1":
            this.snareAudio.volume = 0;
            break;
          case "2":
            this.crashAudio.volume = 0;
            break;
          case "3":
            this.tomAudio.volume = 0;
            break;
          case "4":
            this.hihatAudio.volume = 0;
            break;
        }
      } else {
        switch (muteIndex) {
          case "0":
            this.kickAudio.volume = 1;
            break;
          case "1":
            this.snareAudio.volume = 1;
            break;
          case "2":
            this.crashAudio.volume = 1;
            break;
          case "3":
            this.tomAudio.volume = 1;
            break;
          case "4":
            this.hihatAudio.volume = 1;
            break;
        }
      }
    }
  }
  isolateTrack(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.snareAudio.volume = 0;
          this.crashAudio.volume = 0;
          this.tomAudio.volume = 0;
          this.hihatAudio.volume = 0;
          break;
        case "1":
          this.kickAudio.volume = 0;
          this.crashAudio.volume = 0;
          this.tomAudio.volume = 0;
          this.hihatAudio.volume = 0;
          break;
        case "2":
          this.kickAudio.volume = 0;
          this.snareAudio.volume = 0;
          this.tomAudio.volume = 0;
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.kickAudio.volume = 0;
          this.snareAudio.volume = 0;
          this.crashAudio.volume = 0;
          this.hihatAudio.volume = 0;
          break;
        case "4":
          this.kickAudio.volume = 0;
          this.snareAudio.volume = 0;
          this.crashAudio.volume = 0;
          this.tomAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.snareAudio.volume = 1;
          this.crashAudio.volume = 1;
          this.tomAudio.volume = 1;
          this.hihatAudio.volume = 1;
          break;
        case "1":
          this.kickAudio.volume = 1;
          this.crashAudio.volume = 1;
          this.tomAudio.volume = 1;
          this.hihatAudio.volume = 1;
          break;
        case "2":
          this.kickAudio.volume = 1;
          this.snareAudio.volume = 1;
          this.tomAudio.volume = 1;
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.kickAudio.volume = 1;
          this.snareAudio.volume = 1;
          this.crashAudio.volume = 1;
          this.hihatAudio.volume = 1;
          break;
        case "4":
          this.kickAudio.volume = 1;
          this.snareAudio.volume = 1;
          this.crashAudio.volume = 1;
          this.tomAudio.volume = 1;
          break;
      }
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

drumKit.muteButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.isoButtons.forEach((iso) => {
  iso.addEventListener("click", function (e) {
    drumKit.isolateTrack(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
