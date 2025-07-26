/*Offcanvas*/
const toggleButtons = document.querySelectorAll('[data-offcanvas-target]');
const overlay = document.getElementById('offcanvasOverlay');

let currentMenu = null;

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSelector = button.getAttribute('data-offcanvas-target');
        const menu = document.querySelector(targetSelector);
        if (menu) {
            currentMenu = menu;
            menu.classList.add('active');
            overlay.classList.add('active');
        }
    });
});


overlay.addEventListener('click', () => {
    if (currentMenu) {
        currentMenu.classList.remove('active');
        overlay.classList.remove('active');
        currentMenu = null;
    }
});

document.querySelectorAll('.offcanvas-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        if (currentMenu) {
            currentMenu.classList.remove('active');
            overlay.classList.remove('active');
            currentMenu = null;
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentMenu) {
        currentMenu.classList.remove('active');
        overlay.classList.remove('active');
        currentMenu = null;
    }
});

/*Tabs*/
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector(button.dataset.tabTarget);

        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));
        if (target) target.classList.add('active');
    });
});

/*Accordion*/
const accordionButtons = document.querySelectorAll('.accordion-header');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSelector = button.getAttribute('data-accordion-target');
        const content = document.querySelector(targetSelector);

        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item !== content) {
                item.classList.remove('open');
            }
        });

        content.classList.toggle('open');
    });
});

/*Number of Days Spent Together*/
const start_Date = new Date("2025-03-05");
const today_Date = new Date();

const timeDiff = today_Date - start_Date;
const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

document.getElementById("together_day").textContent = dayDiff;

/*Prevent Default*/
document.querySelectorAll('a[data-button-type="go-to"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("data-go-target");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth"
            })
        }
    });
});

/*Playlist Fetch*/
let allMusic = [];

function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function renderMusicList() {
    const listDiv = document.getElementById('playlistDiv');
    listDiv.innerHTML = '';

    const randomSongs = getRandomItems(allMusic, 4);

    randomSongs.forEach(item => {
        const card = document.createElement('div');
        card.className = 'playlist-card';

        card.innerHTML = `
        <div class="bg-image">
                            <img src="assets/img/${item.coverImage}">
                        </div>
                        <div class="card-details">
                            <div class="detail-more">
                                <div class="detail-genre">
                                    <svg width="14px" height="14px" viewBox="0 0 512 512">
                                        <g>
                                            <path
                                                d="M 384 181.332031 L 384 330.667969 C 384 348.332031 369.664062 362.667969 352 362.667969 C 334.335938 362.667969 320 348.332031 320 330.667969 L 320 181.332031 C 320 163.667969 334.335938 149.332031 352 149.332031 C 369.664062 149.332031 384 163.667969 384 181.332031 Z M 245.332031 0 C 227.667969 0 213.332031 14.335938 213.332031 32 L 213.332031 480 C 213.332031 497.664062 227.667969 512 245.332031 512 C 262.996094 512 277.332031 497.664062 277.332031 480 L 277.332031 32 C 277.332031 14.335938 262.996094 0 245.332031 0 Z M 458.667969 85.332031 C 441.003906 85.332031 426.667969 99.667969 426.667969 117.332031 L 426.667969 394.667969 C 426.667969 412.332031 441.003906 426.667969 458.667969 426.667969 C 476.332031 426.667969 490.667969 412.332031 490.667969 394.667969 L 490.667969 117.332031 C 490.667969 99.667969 476.332031 85.332031 458.667969 85.332031 Z M 138.667969 106.667969 C 121.003906 106.667969 106.667969 121.003906 106.667969 138.667969 L 106.667969 373.332031 C 106.667969 390.996094 121.003906 405.332031 138.667969 405.332031 C 156.332031 405.332031 170.667969 390.996094 170.667969 373.332031 L 170.667969 138.667969 C 170.667969 121.003906 156.332031 106.667969 138.667969 106.667969 Z M 32 192 C 14.335938 192 0 206.335938 0 224 L 0 288 C 0 305.664062 14.335938 320 32 320 C 49.664062 320 64 305.664062 64 288 L 64 224 C 64 206.335938 49.664062 192 32 192 Z M 32 192" />
                                        </g>
                                    </svg>
                                    ${item.genre}
                                </div>
                                <div class="detail-play">
                                    <a class="play-spotify" href="${item.spotify}" target="_blank">
                                        <svg width="24px" height="24px" viewBox="0 0 150 150">
                                            <g>
                                                <path
                                                    d="M 74.996094 0 C 33.574219 0 0 33.578125 0 75.003906 C 0 116.425781 33.574219 150 74.996094 150 C 116.421875 150 150 116.425781 150 75.003906 C 150 33.578125 116.421875 0 74.996094 0 Z M 102.054688 103.527344 C 100.675781 105.265625 98.304688 105.648438 96.074219 104.632812 C 92.703125 103.089844 89.371094 101.40625 85.878906 100.195312 C 80.46875 98.316406 74.816406 97.523438 69.085938 97.132812 C 60.820312 96.570312 52.710938 97.402344 44.660156 99.171875 C 41.707031 99.820312 39.328125 98.554688 38.589844 96.003906 C 37.875 93.53125 39.265625 90.785156 41.785156 90.28125 C 45.9375 89.4375 50.121094 88.710938 54.332031 88.167969 C 57.617188 87.734375 60.949219 87.644531 62.960938 87.496094 C 74.722656 87.683594 84.917969 89.109375 94.554688 93.378906 C 96.75 94.332031 98.882812 95.425781 100.941406 96.648438 C 103.402344 98.183594 103.828125 101.28125 102.039062 103.527344 Z M 111.371094 83.210938 C 111.371094 87.207031 107.277344 89.683594 103.472656 87.890625 C 100.207031 86.355469 96.996094 84.667969 93.644531 83.347656 C 87.945312 81.152344 81.957031 79.792969 75.867188 79.304688 C 72.710938 79.019531 69.542969 78.804688 66.375 78.738281 C 58.070312 78.613281 49.785156 79.519531 41.703125 81.441406 C 38.410156 82.203125 35.429688 80.476562 34.78125 77.457031 C 34.085938 74.28125 35.84375 71.574219 39.125 70.789062 C 46.117188 69.113281 53.1875 67.972656 60.394531 67.890625 C 64.589844 67.847656 68.800781 67.667969 72.980469 67.945312 C 85.550781 68.785156 97.542969 71.792969 108.539062 78.171875 C 110.410156 79.257812 111.449219 80.847656 111.371094 83.210938 Z M 122.179688 64.890625 C 121.703125 67.503906 120.074219 69.265625 117.476562 69.992188 C 115.617188 70.507812 113.625 70.222656 111.984375 69.207031 C 105.078125 65.207031 97.5625 62.359375 89.738281 60.78125 C 85.304688 59.886719 80.796875 59.296875 76.300781 58.769531 C 73.148438 58.386719 69.972656 58.203125 66.796875 58.214844 C 56.519531 58.292969 46.339844 59.292969 36.324219 61.742188 C 32.320312 62.71875 28.875 60.671875 27.882812 56.785156 C 26.988281 53.257812 29.265625 49.757812 33.148438 48.789062 C 39.433594 47.167969 45.847656 46.097656 52.320312 45.585938 C 57.046875 45.25 61.773438 44.996094 64.53125 44.828125 C 79.226562 45.027344 91.71875 46.589844 103.78125 50.851562 C 109.144531 52.699219 114.304688 55.085938 119.183594 57.976562 C 121.769531 59.507812 122.699219 61.988281 122.164062 64.890625 Z M 122.179688 64.890625 " />
                                            </g>
                                        </svg>
                                    </a>
                                    <a class="play-youtube" href="${item.youtube}" target="_blank">
                                        <svg width="24px" height="24px" viewBox="0 0 150 150">
                                            <g>
                                                <path
                                                    d="M 64.703125 63.035156 L 85.3125 75.003906 L 64.703125 86.980469 Z M 64.703125 63.035156 M 74.996094 0 C 33.574219 0 0 33.578125 0 75.003906 C 0 116.425781 33.574219 150 74.996094 150 C 116.421875 150 150 116.425781 150 75.003906 C 150 33.578125 116.421875 0 74.996094 0 Z M 114.542969 88.792969 C 114.375 96.820312 108.109375 102.910156 100.070312 103.277344 C 99.828125 103.277344 99.582031 103.3125 99.339844 103.3125 L 74.972656 103.3125 C 67.003906 103.3125 59.027344 103.238281 51.054688 103.332031 C 43 103.425781 37.648438 98.234375 36.113281 92.816406 C 35.636719 91.125 35.386719 89.382812 35.371094 87.625 C 35.296875 79.214844 35.410156 70.796875 35.316406 62.386719 C 35.210938 53.367188 42.199219 46.527344 51.046875 46.660156 C 60.582031 46.800781 70.125 46.6875 79.671875 46.691406 C 86.472656 46.691406 93.273438 46.582031 100.0625 46.765625 C 108.105469 46.988281 114.375 53.179688 114.542969 61.203125 C 114.734375 70.398438 114.734375 79.59375 114.542969 88.792969 Z M 114.542969 88.792969" />
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div class="detail-header">
                                <h1>${item.title}</h1>
                            </div>
                            <div class="detail-artist">
                                <h3>${item.artist}</h3>
                                <span>
                                    <svg width="14px" height="14px" viewBox="0 0 512 512">
                                        <g>
                                            <path
                                                d="M 490.667969 234.667969 C 478.882812 234.667969 469.332031 244.21875 469.332031 256 C 469.691406 358.300781 397.609375 446.558594 297.300781 466.640625 C 196.988281 486.726562 96.484375 433.023438 57.429688 338.46875 C 18.375 243.914062 51.683594 134.941406 136.929688 78.378906 C 222.175781 21.820312 335.527344 33.484375 407.464844 106.21875 L 341.332031 106.667969 C 329.550781 106.667969 320 116.21875 320 128 C 320 139.78125 329.550781 149.332031 341.332031 149.332031 L 405.332031 149.332031 C 440.679688 149.332031 469.332031 120.679688 469.332031 85.332031 L 469.332031 21.332031 C 469.332031 9.550781 459.78125 0 448 0 C 436.21875 0 426.667969 9.550781 426.667969 21.332031 L 426.667969 65.386719 C 336.652344 -15.085938 202.636719 -21.6875 105.152344 49.554688 C 7.671875 120.796875 -26.746094 250.488281 22.589844 360.691406 C 71.925781 470.890625 191.582031 531.609375 309.652344 506.351562 C 427.71875 481.09375 512.066406 376.742188 512 256 C 512 244.21875 502.449219 234.667969 490.667969 234.667969 Z M 490.667969 234.667969 " />
                                            <path
                                                d="M 256 128 C 244.21875 128 234.667969 137.550781 234.667969 149.332031 L 234.667969 256 C 234.667969 261.65625 236.917969 267.082031 240.917969 271.082031 L 304.917969 335.082031 C 313.289062 343.167969 326.59375 343.050781 334.824219 334.824219 C 343.050781 326.59375 343.167969 313.289062 335.082031 304.917969 L 277.332031 247.167969 L 277.332031 149.332031 C 277.332031 137.550781 267.78125 128 256 128 Z M 256 128 " />
                                        </g>
                                    </svg>
                                    ${item.duration}</span>
                            </div>
                        </div>
    `;

        listDiv.appendChild(card);
    });
}

fetch('assets/js/playlist.json')
    .then(response => response.json())
    .then(data => {
        allMusic = data.playlist;
        renderMusicList();
    })
    .catch(error => {
        console.error('JSON yüklenirken hata oluştu:', error);
    });

document.getElementById('refreshPlaylist').addEventListener('click', renderMusicList);

