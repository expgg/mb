// Main JavaScript file for the home page

document.addEventListener('DOMContentLoaded', function() {
    // Get the container for the manhwa grid
    const manhwaGrid = document.getElementById('manhwa-grid');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Function to display manhwas
    function displayManhwas(manhwasToDisplay) {
        // Clear the grid first
        manhwaGrid.innerHTML = '';
        
        if (manhwasToDisplay.length === 0) {
            // Display a message if no manhwas match the search
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No manhwas found matching your search.';
            manhwaGrid.appendChild(noResults);
            return;
        }
        
        // Loop through each manhwa and create a tile
        manhwasToDisplay.forEach(manhwa => {
            // Create the manhwa card element
            const manhwaCard = document.createElement('div');
            manhwaCard.className = 'manhwa-card';
            manhwaCard.setAttribute('data-id', manhwa.id);
            
            // Create the HTML for the manhwa card - removed genre tags for cleaner look
            manhwaCard.innerHTML = `
                <div class="manhwa-cover">
                    <img src="${manhwa.cover}" alt="${manhwa.title}">
                </div>
                <div class="manhwa-title-overlay">
                    <h3 class="manhwa-title">${manhwa.title}</h3>
                </div>
            `;
            
            // Add click event to navigate to the detail page
            manhwaCard.addEventListener('click', function() {
                window.location.href = `detail.html?id=${manhwa.id}`;
            });
            
            // Add the card to the grid
            manhwaGrid.appendChild(manhwaCard);
        });
    }
    
    // Function to filter manhwas based on search input
    function searchManhwas() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, display all manhwas
            displayManhwas(manhwas);
            return;
        }
        
        // Filter manhwas by title or genre
        const filteredManhwas = manhwas.filter(manhwa => {
            // Check if title matches
            if (manhwa.title.toLowerCase().includes(searchTerm)) {
                return true;
            }
            
            // Check if any genre matches
            for (const genre of manhwa.genres) {
                if (genre.toLowerCase().includes(searchTerm)) {
                    return true;
                }
            }
            
            return false;
        });
        
        // Display the filtered manhwas
        displayManhwas(filteredManhwas);
    }
    
    // Add event listener for real-time search as user types
    searchInput.addEventListener('input', searchManhwas);
    
    // Keep the Enter key functionality for accessibility
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchManhwas();
        }
    });
    
    // Keep the button click event for accessibility
    searchButton.addEventListener('click', searchManhwas);
    
    // Initial display of all manhwas
    displayManhwas(manhwas);
});