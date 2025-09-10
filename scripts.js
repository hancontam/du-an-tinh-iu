const lyrics = [
  { time: 0, text: '"Chỉ cần nghĩ về em"' },
  { time: 2, text: '"Mọi cảm giác khó chịu liền tan biến"' },
  { time: 4, text: '"Mỗi một ngày của sau này"' },
  { time: 6, text: '"Đều yêu em thêm một chút"' },
  { time: 8.5, text: '"I\'M THINKING ABOUT YOU<br>tôi mãi nghĩ về em"' },
  { time: 12.5, text: '"I\'M THINKING ABOUT YOU<br>tôi mãi nghĩ về em"' },
  { time: 16, text: '"I\'M THINKING ABOUT YOU<br>tôi mãi nghĩ về em"' },
];

const letterText = `
        Chat GPT ngusi xaugai sinh nhat vui ve nhen em 🎉<br>
        Cảm ơn em đã đến bên tui, cảm ơn em làm cuộc sống tui có ý nghĩa hơn, vui vẻ hơn, tươi sáng hơn 🥳 <br>
        Đối với tui em là bông hoa mà tui không muốn hái, là bản tình ka nghe hoài không chán, là người mà dù tui hong có nhiều công đức cũng muốn hồi hướng cho em. <br>
        Từ tận đáy lòng, rất biết ơn ngày hôm đó, ngày mà thức khuya hơn một chút, tò mò về em một chút, ông trời sui khiến kết bạn với em, nên mới may mắn được ở bên cạnh em. <br>
        Từ tận đáy lòng, muốn đi cùng em, nắm tay em, chăm sóc cho em. <br>
        Ehehe <br>
        cuối cùng chúc em có một ngày thật vui, chúc xinh nhất xinh nhật dui dẻ  ❤️ ❤️ 
      `;

const audio = document.getElementById("birthdaySong");
const typingSound = document.getElementById("typingSound");
const lyricsDiv = document.getElementById("lyrics");
const giftBox = document.getElementById("gift-box");
const openBtn = document.getElementById("open-btn");
const letterDiv = document.getElementById("letter");
let currentIndex = -1;

// Hiệu ứng gõ chữ cho thư
function typeLetter(text) {
  let i = 0;
  letterDiv.style.display = "block";
  typingSound.loop = true;
  typingSound.play();

  function type() {
    if (i < text.length) {
      letterDiv.innerHTML = text.substring(0, i + 1);
      i++;
      setTimeout(type, 45);
    } else {
      typingSound.pause();
      typingSound.currentTime = 0;
    }
  }
  type();
}

// Chạy lyrics
function updateLyrics() {
  const currentTime = audio.currentTime;
  let newIndex = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      newIndex = i;
    } else {
      break;
    }
  }
  if (newIndex !== currentIndex && newIndex >= 0) {
    lyricsDiv.classList.remove("fade-in");
    lyricsDiv.classList.add("fade-out");
    setTimeout(() => {
      lyricsDiv.innerHTML = lyrics[newIndex].text;
      lyricsDiv.classList.remove("fade-out");
      lyricsDiv.classList.add("fade-in");
      currentIndex = newIndex;
    }, 500);
  }
}

// Sự kiện mở quà
openBtn.addEventListener("click", () => {
  giftBox.style.display = "none";
  audio.play();
  lyricsDiv.style.display = "flex";
  audio.addEventListener("timeupdate", updateLyrics);
  typeLetter(letterText);
});

// Three.js particles
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 1000;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  size: 5,
  color: 0xff6b6b,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 500;

// Handle window resize for Three.js
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
