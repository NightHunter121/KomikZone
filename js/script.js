// Data komik statis
const comics = {
    'komik-1': {
        title: 'Judul Komik Satu',
        cover: 'images/sampul-komik-1.jpg',
        chapters: {
            'chapter-1': {
                title: 'Chapter 1',
                pages: [
                    'images/komik-1/halaman-1.jpg',
                    'images/komik-1/halaman-2.jpg',
                    'images/komik-1/halaman-3.jpg'
                ]
            }
        }
    },
    'komik-2': {
        title: 'Judul Komik Dua',
        cover: 'images/sampul-komik-2.jpg',
        chapters: {
            'chapter-1': {
                title: 'Chapter 1',
                pages: [
                    'images/komik-2/halaman-1.jpg',
                    'images/komik-2/halaman-2.jpg'
                ]
            }
        }
    },
    'komik-3': {
        title: 'Komik Ketiga',
        cover: 'images/sampul-komik-3.jpg',
        chapters: {
            'chapter-1': {
                title: 'Chapter 1',
                pages: [
                    'images/komik-3/halaman-1.jpg',
                    'images/komik-3/halaman-2.jpg'
                ]
            }
        }
    }
    // Tambahkan data komik lain di sini
};

let currentComicId = '';
let currentChapterId = '';
let currentPageIndex = 0;

// Fungsi untuk mengganti halaman yang ditampilkan
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId + '-page').classList.add('active');
    window.scrollTo(0, 0);
}

// Fungsi untuk menampilkan daftar komik di halaman utama
function renderComicList(filter = '') {
    const comicList = document.querySelector('.komik-list');
    comicList.innerHTML = '';
    const filteredComics = Object.keys(comics).filter(id => 
        comics[id].title.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredComics.length === 0) {
        comicList.innerHTML = '<p style="text-align: center;">Komik tidak ditemukan.</p>';
        return;
    }

    filteredComics.forEach(id => {
        const comic = comics[id];
        const lastChapterKey = Object.keys(comic.chapters).pop();
        const lastChapter = comic.chapters[lastChapterKey];
        const comicItem = `
            <a href="#" onclick="showDetailPage('${id}')" class="komik-item">
                <img src="${comic.cover}" alt="Sampul ${comic.title}">
                <div class="komik-info">
                    <h3>${comic.title}</h3>
                    <p class="chapter-info">${lastChapter ? lastChapter.title : ''}</p>
                </div>
            </a>
        `;
        comicList.innerHTML += comicItem;
    });
}

// Fungsi untuk menampilkan halaman detail komik
function showDetailPage(comicId) {
    currentComicId = comicId;
    const comicData = comics[comicId];
    const detailContent = document.getElementById('detail-content');
    detailContent.innerHTML = `
        <div class="comic-detail">
            <img src="${comicData.cover}" alt="Sampul Komik">
            <div class="info">
                <h2>${comicData.title}</h2>
                <p>Sinopsis singkat komik ini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <h3>Daftar Chapter</h3>
                <ul class="chapter-list">
                    ${Object.keys(comicData.chapters).map(chapterId => `
                        <li><a href="#" onclick="showReaderPage('${comicId}', '${chapterId}')">${comicData.chapters[chapterId].title}</a></li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
    showPage('detail');
}

// Fungsi untuk menampilkan halaman reader
function showReaderPage(comicId, chapterId) {
    currentComicId = comicId;
    currentChapterId = chapterId;
    currentPageIndex = 0;
    
    updateReaderPage();
    showPage('reader');
}

// Fungsi untuk memperbarui tampilan di halaman reader
function updateReaderPage() {
    const comicData = comics[currentComicId];
    const chapterData = comicData.chapters[currentChapterId];
    
    document.getElementById('comicPage').src = chapterData.pages[currentPageIndex];
    document.getElementById('chapterTitle').textContent = `${comicData.title} - ${chapterData.title} (Halaman ${currentPageIndex + 1}/${chapterData.pages.length})`;
    
    document.getElementById('prevButton').disabled = currentPageIndex === 0;
    document.getElementById('nextButton').disabled = currentPageIndex === chapterData.pages.length - 1;
}

// Event listener untuk tombol "Sebelumnya" dan "Berikutnya"
document.getElementById('prevButton').addEventListener('click', () => {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updateReaderPage();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    const comicData = comics[currentComicId];
    const chapterData = comicData.chapters[currentChapterId];
    if (currentPageIndex < chapterData.pages.length - 1) {
        currentPageIndex++;
        updateReaderPage();
    }
});

// Event listener untuk input pencarian
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    renderComicList(query);
});

// Pastikan halaman utama yang pertama kali ditampilkan
document.addEventListener('DOMContentLoaded', () => {
    renderComicList(); // Panggil pertama kali untuk menampilkan semua komik
    showPage('home');
});
