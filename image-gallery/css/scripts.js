const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");//хммм
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");//апппп
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playlistSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");//бегунок

//index songs
let index;

//initially loop=true
let loop = true;

const songsList = [
{
  name: "ivolgi",
  link: "files/sladkogolosaya-trel-ivolgi.mp3",
  artist: "audio 2",
  image: "img/Martyicon.ico",
  duration:"05:53"
 },
{
  name: "audio",
  link: "img/audio.mp3",
  artist: "audio 2",
  image: "img/M8DWFVinWT8.jpg",
  duration:"05:53"
},
{
  name: "vorobev",
  link: "img/chirikane-vorobev-v-selskoy-mestnosti-35687.mp3",
  artist: "audio 3",
  image: "img/desktop_folder_20366(1).ico",
  duration:"05:53"
},
{
  name: "kukushka",
  link: "img/kukushka-2-26173.mp3",
  artist: "audio 4",
  image: "img/TlJvr3AsSlw.jpg",
  duration:"05:53"
},
{
  name: "drozd",
  link: "img/penie-zvonkogolosogo-drozda.mp3",
  artist: "audio 5",
  image: "img/jE9kLS_slD0.jpg",
  duration:"05:53"
},
];

//object
let events = {
  mouse: {
  click: "click",
},
  touch: {
  click: "touchstart",
},
};

let deviceType = "";

// device

const isTouchDevice = () => {
  try {
  document.createEvent("TouchEvent");
  deviceType = "touch";
  return true;
} catch (e) {
  deviceType = "mouse";
  return false;
}
};

//Format time
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//хммммммм
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;
  audio.onloadedmetadata = () => {
  maxDuration.innerText = timeFormatter(audio.duration);
};
};

//play song
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//repeat button
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
  repeatButton.classList.remove("active");
  audio.loop = false;
  console.log("repeat off");
  } else {
  repeatButton.classList.add("active");
  audio.loop = true;
  console.log("repeat on");
}
});

//Next song
const nextSong = () => {
  if (loop) {
  if (index == songsList.length - 1) {
  index = 0;
  } else {
  index += 1;
  }
  setSong(index);
  playAudio();
  } else {
  let randIndex = Math.floor(Math.random() * songsList.length);
  console.log(randIndex);
  setSong(randIndex);
  playAudio();
}
};

//pause song
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//previous song
const previousSong = () => {
  if (index > 0) {
  pauseAudio();
  index -= 1;
  } else {
  index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

//next song
audio.onended = () => {
  nextSong();
};

//Shuffle songs
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
  shuffleButton.classList.remove("active");
  loop = true;
  console.log("shuffle off");
} else {
  shuffleButton.classList.add("active");
  loop = false;
  console.log("shuffle on");
}
});

//play button
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);

//prev button
prevButton.addEventListener("click", previousSong);

//if user clicks 
isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  // бегунок
  currentProgress.style.width = progress * 100 + "%";
  //set time
  audio.currentTime = progress * audio.duration;
  //play
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});
//бегунок
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
});
//update time
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});
//Creates playlist
const initializePlaylist = () => {
  for (let i in songsList) {
playlistSongs.innerHTML += `<li class='playlistSong' onclick='setSong(${i})'>
<div class="playlist-image-container">
 <img src="${songsList[i].image}"/>
</div>
<div class="playlist-song-details">
<span id="playlist-song-name">
${songsList[i].name}
</span>
<span id="playlist-song-artist-album">
  ${songsList[i].artist}
</span>
</div>
</li>`;
}
};
//display playlist
playlistButton.addEventListener("click", () => {
  playlistContainer.classList.remove("hide");
});
//hide playlist
closeButton.addEventListener("click", () => {
  playlistContainer.classList.add("hide");
});
window.onload = () => {
  index = 0;
  setSong(index);
  initializePlaylist();
};