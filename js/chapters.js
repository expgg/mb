// JavaScript for the chapters page

document.addEventListener('DOMContentLoaded', function() {
    // Get the manhwa ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const manhwaId = urlParams.get('id');
    
    // Set up the back button functionality
    const backButton = document.getElementById('back-to-detail');
    backButton.href = `detail.html?id=${manhwaId}`;
    
    // Find the manhwa with the matching ID
    const manhwa = manhwas.find(m => m.id === manhwaId);
    
    // If manhwa is found, display its chapters
    if (manhwa) {
        // Update the page title and manhwa title
        document.title = `${manhwa.title} - Chapters | Manhwa Reader`;
        document.getElementById('manhwa-title').textContent = manhwa.title;
        
        // Get the chapters list container
        const chaptersListContainer = document.getElementById('chapters-list');
        
        // Get the chapters data from the manhwa
        let chapters = manhwa.chaptersData.chapters;
        
        // Check if chapters is a nested array (like in Wind Breaker) and flatten it
        if (chapters.length > 0 && Array.isArray(chapters[0])) {
            chapters = chapters.flat();
        }
        
        // Loop through each chapter and create a button
        chapters.forEach(chapter => {
            // Create the chapter button element
            const chapterBtn = document.createElement('div');
            chapterBtn.className = 'chapter-btn';
            chapterBtn.setAttribute('data-chapter', chapter.number);
            
            // Create the HTML for the chapter button - removed title as requested
            chapterBtn.innerHTML = `
                <span class="chapter-number">Chapter ${chapter.number}</span>
            `;
            
            // Add click event to navigate to the reader page
            chapterBtn.addEventListener('click', function() {
                window.location.href = `reader.html?id=${manhwaId}&chapter=${chapter.number}`;
            });
            
            // Add the button to the chapters list
            chaptersListContainer.appendChild(chapterBtn);
        });
        
        // Back button removed
    } else {
        // If manhwa is not found, display an error message
        const chaptersContainer = document.querySelector('.chapters-container');
        chaptersContainer.innerHTML = `
            <div class="error-message">
                <h2>Manhwa Not Found</h2>
                <p>The manhwa you're looking for doesn't exist or has been removed.</p>
            </div>
        `;
    }
});