const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    playlist1Btn = document.getElementById('playlist1'),
    playlist2Btn = document.getElementById('playlist2'),
    youtubeBtn = document.getElementById('youtube'),
    spotifyBtn = document.getElementById('spotify'),
    xbtn = document.getElementById('x');

const music = new Audio();

const playlists = {
    p1: [
        /*
        {
            path: 'assets/p1/1.mp3',
            displayName: 'Bbbang',
            cover: 'assets/p1/1.jpg',
            artist: 'Reol',
            youtube: '',
            spotify: '',
            x: 'https://x.com/RRReol'
        },
        {
            path: 'assets/p1/2.mp3',
            displayName: '初恋キラー',
            cover: 'assets/p1/2.jpg',
            artist: '乃紫 (noa)',
            youtube: 'https://youtu.be/BBVIxwazmkY',
            spotify: 'https://open.spotify.com/intl-ja/album/2pUxSIXaFG9Pm3jXeYa93e',
            x: 'https://x.com/noa__aburasoba'
        },
        */
        {
            path: 'assets/p1/3.mp3',
            displayName: 'わたしの一番かわいいところ',
            cover: 'assets/p1/3.jpg',
            artist: 'FRUITS ZIPPER',
            youtube: 'https://youtu.be/NQUo3vITjgY',
            spotify: 'https://open.spotify.com/album/6A3nmC5RgTL4jbpKctmDbZ',
            x: 'https://x.com/FRUITS_ZIPPER'
        },
        {
            path: 'assets/p1/4.mp3',
            displayName: 'ビビデバ',
            cover: 'assets/p1/4.jpg',
            artist: '星街すいせい',
            youtube: 'https://youtu.be/8ZP5eqm4JqM',
            spotify: 'https://open.spotify.com/album/3E0lLznAOWAiEWizIzWzJn',
            x: ''
        },
        {
            path: 'assets/p1/5.mp3',
            displayName: 'Biri-Biri',
            cover: 'assets/p1/5.jpg',
            artist: 'YOASOBI',
            youtube: 'https://youtu.be/shZyg5VFI1Y',
            spotify: 'https://open.spotify.com/intl-ja/album/1hxB0L2PCz5d5jQl2s39Sz',
            x: 'https://x.com/YOASOBI_staff'
        },
        {
            path: 'assets/p1/6.mp3',
            displayName: 'ライラック',
            cover: 'assets/p1/6.jpg',
            artist: 'Mrs. GREEN APPLE',
            youtube: 'https://youtu.be/QjrkrVmC-8M',
            spotify: 'https://open.spotify.com/album/40CHqDtwO8xlI3Ns7sZZel',
            x: 'https://x.com/AORINGOHUZIN'
        }
    ],
    p2: [
        {
            path: 'assets/p2/1.mp3',
            displayName: 'もういいよ',
            cover: 'assets/p2/1.jpg',
            artist: 'こっちのけんと',
            youtube: 'https://youtu.be/svbfMJJk_90',
            spotify: 'https://open.spotify.com/intl-ja/album/2O6Ndu8lo4d1Ov7wz7bNGO',
            x: 'https://x.com/SuppokoPeppoko'
        },
        {
            path: 'assets/p2/2.mp3',
            displayName: 'トラエノヒメ (feat. むト & Sohbana)',
            cover: 'assets/p2/2.jpg',
            artist: 'MAISONdes',
            youtube: 'https://youtu.be/XZk_URrYRno',
            spotify: 'https://open.spotify.com/intl-ja/track/6gWRznlX7vaUW0r8KF9iMZ',
            x: 'https://x.com/MAISONdes_6half'
        }
    ]
};

let currentPlaylist = 'p1';
let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

    // アーティスト名が45文字以上の場合にスクロールクラスを追加
    if (song.artist.length > 45) {
        artist.classList.add('scroll');
    } else {
        artist.classList.remove('scroll');
    }

    // SNSリンクを設定
    youtubeBtn.href = song.youtube || '#';
    spotifyBtn.href = song.spotify || '#';
    xbtn.href = song.x || '#';
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
    loadMusic(playlists[currentPlaylist][musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function switchPlaylist(playlist) {
    currentPlaylist = playlist;
    musicIndex = 0;
    loadMusic(playlists[currentPlaylist][musicIndex]);
    playMusic();
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
playlist1Btn.addEventListener('click', () => switchPlaylist('p1'));
playlist2Btn.addEventListener('click', () => switchPlaylist('p2'));

loadMusic(playlists[currentPlaylist][musicIndex]);