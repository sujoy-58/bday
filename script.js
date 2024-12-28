
let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 20 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.style.transform = `rotateZ(${this.rotation}deg)`;
    const handleMove = (x, y) => {
      if (!this.rotating) {
        this.velX = x - this.prevX;
        this.velY = y - this.prevY;
      }

      const dirX = x - this.startX;
      const dirY = y - this.startY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevX = x;
        this.prevY = y;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    const onStart = (x, y) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.startX = x;
      this.startY = y;
      this.prevX = x;
      this.prevY = y;
    };

    const onEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Event listeners for both touch and mouse
    paper.addEventListener("mousedown", (e) => onStart(e.clientX, e.clientY));
    document.addEventListener("mousemove", (e) => this.holdingPaper && handleMove(e.clientX, e.clientY));
    window.addEventListener("mouseup", onEnd);

    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      onStart(touch.clientX, touch.clientY);
    });
    paper.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.holdingPaper && handleMove(touch.clientX, touch.clientY);
    });
    paper.addEventListener("touchend", onEnd);

    // Optional gesture rotation (for touch devices)
    paper.addEventListener("gesturestart", (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener("gestureend", () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});




//for the audio 
var mysong = document.getElementById("mysong");
var songsource = document.getElementById("songsource");

var songstoplay = [
    "/audio/song2.mp3",
    "/audio/song3.mp3",
    "/audio/song4.mp3",
    "/audio/song5.mp3",
    "/audio/song6.mp3",
    "/audio/song7.mp3",
    "/audio/song8.mp3",
    "/audio/song9.mp3",
    "/audio/song10.mp3",
    "/audio/song11.mp3",
    "/audio/song12.mp3",
    "/audio/song13.mp3",
    "/audio/song14.mp3"
    
];

// Function to play a random song
function playRandomSong() {
    var randomIndex = Math.floor(Math.random() * songstoplay.length);
    songsource.src = songstoplay[randomIndex];
    console.log(randomIndex);
    mysong.load();
    mysong.play().catch((error) => {
        console.log("Autoplay prevented. Please interact with the page.");
    });
}

// Set volume
mysong.volume = 0.15;

// Play a random song on page load
window.onload = function () {
    mysong.muted = true; // Start muted for autoplay compliance
    playRandomSong();
    setTimeout(() => {
        mysong.muted = false; // Unmute after a delay
    }, 100);
};

// Event handler for click and touch
function handleInteraction(event) {
    // Check if the click or touch target is the body
    if (event.target === document.body) {
        mysong.muted = false; // Ensure the song is unmuted
        if (mysong.paused) {
            playRandomSong(); // Play a new random song
        } else {
            mysong.pause(); // Pause the current song
        }
    }
}

// Add event listeners for both click and touch
document.body.addEventListener("click", handleInteraction);
document.body.addEventListener("touchstart", handleInteraction);
