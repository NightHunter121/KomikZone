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
    }
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
    // Gulirkan halaman ke atas setiap kali ganti halaman
    window.scrollTo(0, 0);
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

// Pastikan halaman utama yang pertama kali ditampilkan
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
