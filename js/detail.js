// JavaScript for the detail page

document.addEventListener('DOMContentLoaded', function() {
    // Get the manhwa ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const manhwaId = urlParams.get('id');
    
    // Find the manhwa with the matching ID
    const manhwa = manhwas.find(m => m.id === manhwaId);
    
    // If manhwa is found, display its details
    if (manhwa) {
        const manhwaDetailSection = document.getElementById('manhwa-detail');
        
        // Create the HTML for the manhwa details
        manhwaDetailSection.innerHTML = `
            <div class="detail-header">
                <img src="${manhwa.cover}" alt="${manhwa.title}" class="detail-cover">
                <div class="detail-info">
                    <h2 class="detail-title">${manhwa.title}</h2>
                    <p class="detail-description">${manhwa.description}</p>
                    <div class="detail-meta">
                        <div class="meta-item">
                            <span class="meta-label">Author:</span> ${manhwa.author}
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Artist:</span> ${manhwa.artist}
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Status:</span> ${manhwa.status}
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Release Year:</span> ${manhwa.releaseYear}
                        </div>
                    </div>
                    <div class="detail-genres">
                        ${manhwa.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                    </div>
                    <a href="chapters.html?id=${manhwa.id}" class="start-reading-btn">Start Reading</a>
                </div>
            </div>
        `;
        
        // Update the page title
        document.title = `${manhwa.title} - Manhwa Reader`;
    } else {
        // If manhwa is not found, display an error message
        const manhwaDetailSection = document.getElementById('manhwa-detail');
        manhwaDetailSection.innerHTML = `
            <div class="error-message">
                <h2>Manhwa Not Found</h2>
                <p>The manhwa you're looking for doesn't exist or has been removed.</p>
            </div>
        `;
    }
});