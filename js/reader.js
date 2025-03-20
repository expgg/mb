// JavaScript for the reader page

// Function to get Google Drive image URL from file ID
function getGoogleDriveImageUrl(fileId) {
    // This format works more consistently than the uc?export=view format
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    
    // Alternative method if the above doesn't work:
    // return `https://lh3.googleusercontent.com/d/${fileId}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the manhwa ID and chapter number from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const manhwaId = urlParams.get('id');
    let chapterNumber = parseInt(urlParams.get('chapter'));
    
    // Validate the chapter number
    if (isNaN(chapterNumber) || chapterNumber <= 0) {
        chapterNumber = 1; // Default to chapter 1 if invalid or not provided
    }
    
    // Set up the back button functionality
    const backButton = document.getElementById('back-to-chapters');
    backButton.href = `chapters.html?id=${manhwaId}`;
    
    // Find the manhwa with the matching ID
    const manhwa = manhwas.find(m => m.id === manhwaId);
    
    // If manhwa is not found, display an error message
    if (!manhwa) {
        // Get the reader content container
        const readerContent = document.getElementById('reader-content');
        
        // Clear any existing content
        readerContent.innerHTML = '';
        
        // Create error message
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errorContainer.innerHTML = `
            <h2>Manhwa Not Found</h2>
            <p>Sorry, we couldn't find the manhwa you're looking for.</p>
            <a href="index.html" class="reader-btn">Return to Home</a>
        `;
        
        // Add error container to reader content
        readerContent.appendChild(errorContainer);
        return; // Stop execution
    }
    
    // If manhwa is found, display the chapter
    if (manhwa) {
        // Get the chapters data
        let chapters = manhwa.chaptersData.chapters;
        
        // Check if chapters is a nested array (like in Wind Breaker) and flatten it
        if (chapters.length > 0 && Array.isArray(chapters[0])) {
            chapters = chapters.flat();
        }
        
        // Find the current chapter
        const currentChapter = chapters.find(c => c.number === chapterNumber);
        
        if (!currentChapter) {
            // Get the reader content container
            const readerContent = document.getElementById('reader-content');
            
            // Clear any existing content
            readerContent.innerHTML = '';
            
            // Create error message
            const errorContainer = document.createElement('div');
            errorContainer.className = 'error-container';
            errorContainer.innerHTML = `
                <h2>Chapter Not Found</h2>
                <p>Sorry, we couldn't find chapter ${chapterNumber} for ${manhwa.title}.</p>
                <a href="chapters.html?id=${manhwaId}" class="reader-btn">View All Chapters</a>
            `;
            
            // Add error container to reader content
            readerContent.appendChild(errorContainer);
            return; // Stop execution
        }
        
        if (currentChapter) {
            // Update the page title and chapter title
            document.title = `${manhwa.title} - Chapter ${currentChapter.number} | Manhwa Reader`;
            document.getElementById('chapter-title').textContent = `Chapter ${currentChapter.number}: ${currentChapter.title}`;
            
            // Get the reader content container
            const readerContent = document.getElementById('reader-content');
            
            // Clear any existing content
            readerContent.innerHTML = '';
            
            // Create loading animation container
            const loadingContainer = document.createElement('div');
            loadingContainer.className = 'loading-container';
            
            // Create spinner
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            loadingContainer.appendChild(spinner);
            
            // Create loading text
            const loadingText = document.createElement('div');
            loadingText.className = 'loading-text';
            loadingText.textContent = 'Preparing your manhwa...';
            loadingContainer.appendChild(loadingText);
            
            // Create manhwa title element
            const manhwaTitleElement = document.createElement('div');
            manhwaTitleElement.className = 'loading-title';
            manhwaTitleElement.textContent = manhwa.title;
            loadingContainer.appendChild(manhwaTitleElement);
            
            // Create chapter title element
            const chapterTitleElement = document.createElement('div');
            chapterTitleElement.className = 'loading-chapter';
            chapterTitleElement.textContent = `Chapter ${currentChapter.number}: ${currentChapter.title}`;
            loadingContainer.appendChild(chapterTitleElement);
            
            // Create progress container
            const progressContainer = document.createElement('div');
            progressContainer.className = 'loading-progress';
            
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'loading-progress-bar';
            progressContainer.appendChild(progressBar);
            loadingContainer.appendChild(progressContainer);
            
            // Create custom credit text
            const creditText = document.createElement('div');
            creditText.className = 'loading-credit';
            creditText.textContent = 'MADE BY EXPLORIOT';
            loadingContainer.appendChild(creditText);
            
            // Add loading container to reader content
            readerContent.appendChild(loadingContainer);
            
            // Set up variables to track loading progress
            const totalImages = currentChapter.images.length;
            let loadedImages = 0;
            const imageElements = [];
            
            // Update the loading text with total image count
            loadingText.textContent = `Loading (0/${totalImages})`;
            
            // Function to update loading progress
            function updateLoadingProgress() {
                loadedImages++;
                const progressPercentage = (loadedImages / totalImages) * 100;
                progressBar.style.width = `${progressPercentage}%`;
                loadingText.textContent = `Loading (${loadedImages}/${totalImages})`;
                
                // If all images are loaded, hide the loading container
                if (loadedImages >= totalImages) {
                    // Add a small delay to ensure all images are rendered
                    setTimeout(() => {
                        loadingContainer.style.opacity = '0';
                        setTimeout(() => {
                            loadingContainer.remove();
                            
                            // Add all image elements to the reader content
                            imageElements.forEach(img => {
                                readerContent.appendChild(img);
                            });
                            
                            // Add bottom next chapter button (only if there is a next chapter)
                            // Check if the next chapter actually exists in the array
                            const nextChapterExists = chapters.some(c => c.number === chapterNumber + 1);
                            if (nextChapterExists) {
                                // Create a container for the bottom next chapter button
                                const bottomNavContainer = document.createElement('div');
                                bottomNavContainer.className = 'bottom-reader-controls';
                                
                                // Create the bottom next chapter button
                                const bottomNextChapterBtn = document.createElement('button');
                                bottomNextChapterBtn.className = 'reader-btn';
                                bottomNextChapterBtn.textContent = 'Next Chapter';
                                bottomNextChapterBtn.addEventListener('click', function() {
                                    window.location.href = `reader.html?id=${manhwaId}&chapter=${chapterNumber + 1}`;
                                });
                                
                                // Add the button to the container
                                bottomNavContainer.appendChild(bottomNextChapterBtn);
                                
                                // Add the container to the reader content
                                readerContent.appendChild(bottomNavContainer);
                            }
                        }, 500); // Match the transition duration in CSS
                    }, 300);
                }
            }
            
            // Loop through each image and prepare them for loading
            currentChapter.images.forEach(imageId => {
                // Create an image element
                const img = document.createElement('img');
                img.className = 'reader-image';
                
                // Store the image element for later appending
                imageElements.push(img);
                
                // Set up load event before setting src
                img.onload = function() {
                    updateLoadingProgress();
                };
                
                // Add error handling for images that fail to load
                img.onerror = function() {
                    console.error(`Failed to load image: ${imageId}`);
                    // Replace with a placeholder or error message
                    this.src = 'https://via.placeholder.com/800x1200?text=Image+Not+Available';
                    updateLoadingProgress(); // Count error as loaded to continue progress
                };
                
                // Use the new function to get better quality images
                img.src = getGoogleDriveImageUrl(imageId);
                img.alt = `${manhwa.title} - Chapter ${currentChapter.number} - Page`;
            });
            
            // Back button removed
            
            // Set up the previous chapter button
            const prevChapterBtn = document.getElementById('prev-chapter');
            if (chapterNumber > 1) {
                prevChapterBtn.addEventListener('click', function() {
                    window.location.href = `reader.html?id=${manhwaId}&chapter=${chapterNumber - 1}`;
                });
            } else {
                prevChapterBtn.disabled = true;
                prevChapterBtn.classList.add('disabled');
            }
            
            // Set up the next chapter button
            const nextChapterBtn = document.getElementById('next-chapter');
            // Check if the next chapter actually exists in the array
            const nextChapterExists = chapters.some(c => c.number === chapterNumber + 1);
            if (nextChapterExists) {
                nextChapterBtn.addEventListener('click', function() {
                    window.location.href = `reader.html?id=${manhwaId}&chapter=${chapterNumber + 1}`;
                });
            } else {
                nextChapterBtn.disabled = true;
                nextChapterBtn.classList.add('disabled');
            }
            
            // Set up the chapters dropdown with virtual scrolling
            const dropdownContent = document.getElementById('dropdown-content');
            const dropdownToggle = document.getElementById('dropdown-toggle');
            
            // Toggle the dropdown when the button is clicked - optimized
            dropdownToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
                
                // Only load chapters when dropdown is shown
                if (dropdownContent.classList.contains('show') && dropdownContent.children.length === 0) {
                    renderChaptersDropdown(chapters, chapterNumber, manhwaId);
                }
            });
            
            // Close the dropdown when clicking outside of it - optimized
            document.addEventListener('click', function(event) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }, { passive: true });
            
            // Function to render chapters with virtual scrolling
            function renderChaptersDropdown(chapters, currentChapter, manhwaId) {
                // Clear existing content
                dropdownContent.innerHTML = '';
                
                // Add search input for large chapter lists
                if (chapters.length > 20) {
                    const searchContainer = document.createElement('div');
                    searchContainer.className = 'dropdown-search';
                    
                    const searchInput = document.createElement('input');
                    searchInput.type = 'text';
                    searchInput.placeholder = 'Search chapters...';
                    searchInput.className = 'dropdown-search-input';
                    
                    searchInput.addEventListener('input', function(event) {
                        // Stop propagation to prevent the dropdown from closing
                        event.stopPropagation();
                        const searchTerm = this.value.toLowerCase();
                        filterAndRenderChapters(chapters, currentChapter, manhwaId, searchTerm);
                    });
                    
                    // Prevent clicks on the search input from closing the dropdown
                    searchInput.addEventListener('click', function(event) {
                        event.stopPropagation();
                    });
                    
                    searchContainer.appendChild(searchInput);
                    dropdownContent.appendChild(searchContainer);
                }
                
                // Create chapter groups for better organization
                const chapterGroups = createChapterGroups(chapters);
                
                // Render chapter groups
                renderChapterGroups(chapterGroups, currentChapter, manhwaId);
                
                // Scroll to active chapter
                scrollToActiveChapter();
            }
            
            // Function to filter and render chapters based on search term
            function filterAndRenderChapters(chapters, currentChapter, manhwaId, searchTerm) {
                // Clear existing chapter groups
                const chapterGroupsContainer = document.querySelector('.chapter-groups-container');
                if (chapterGroupsContainer) {
                    chapterGroupsContainer.remove();
                }
                
                // Filter chapters based on search term
                const filteredChapters = chapters.filter(chapter => {
                    // Convert chapter number and title to string for searching
                    const chapterNumber = chapter.number.toString();
                    const chapterTitle = chapter.title.toLowerCase();
                    
                    // Check if search term is in chapter number or title
                    return chapterNumber.includes(searchTerm) || chapterTitle.includes(searchTerm);
                });
                
                // Create chapter groups for filtered chapters
                const filteredChapterGroups = createChapterGroups(filteredChapters);
                
                // Render filtered chapter groups
                renderChapterGroups(filteredChapterGroups, currentChapter, manhwaId);
            }
            
            // Function to create chapter groups for better organization
            function createChapterGroups(chapters) {
                // Group chapters by tens (1-10, 11-20, etc.)
                const groups = {};
                
                chapters.forEach(chapter => {
                    // Calculate group number (1-10 = group 1, 11-20 = group 2, etc.)
                    const groupNumber = Math.ceil(chapter.number / 10);
                    const groupName = `${(groupNumber - 1) * 10 + 1}-${groupNumber * 10}`;
                    
                    // Create group if it doesn't exist
                    if (!groups[groupName]) {
                        groups[groupName] = [];
                    }
                    
                    // Add chapter to group
                    groups[groupName].push(chapter);
                });
                
                return groups;
            }
            
            // Function to render chapter groups
            function renderChapterGroups(chapterGroups, currentChapter, manhwaId) {
                // Create container for chapter groups
                const groupsContainer = document.createElement('div');
                groupsContainer.className = 'chapter-groups-container';
                
                // Get dropdown content container
                const dropdownContent = document.getElementById('dropdown-content');
                
                // Loop through each group and create a collapsible section
                Object.keys(chapterGroups).sort((a, b) => {
                    // Extract the first number from each group name for sorting
                    const aNum = parseInt(a.split('-')[0]);
                    const bNum = parseInt(b.split('-')[0]);
                    return bNum - aNum; // Sort in descending order (newest chapters first)
                }).forEach(groupName => {
                    const chapters = chapterGroups[groupName];
                    
                    // Create group header
                    const groupHeader = document.createElement('div');
                    groupHeader.className = 'chapter-group-header';
                    groupHeader.textContent = `Chapters ${groupName}`;
                    
                    // Create group content container
                    const groupContent = document.createElement('div');
                    groupContent.className = 'chapter-group-content';
                    
                    // Add chapters to group content
                    chapters.sort((a, b) => b.number - a.number).forEach(chapter => {
                        const chapterItem = document.createElement('a');
                        chapterItem.className = 'chapter-item';
                        chapterItem.href = `reader.html?id=${manhwaId}&chapter=${chapter.number}`;
                        chapterItem.textContent = `Chapter ${chapter.number}: ${chapter.title}`;
                        
                        // Highlight current chapter
                        if (chapter.number === currentChapter) {
                            chapterItem.classList.add('active');
                        }
                        
                        // Prevent click event from closing dropdown
                        chapterItem.addEventListener('click', function(event) {
                            event.stopPropagation();
                        });
                        
                        groupContent.appendChild(chapterItem);
                    });
                    
                    // Add group header and content to container
                    groupsContainer.appendChild(groupHeader);
                    groupsContainer.appendChild(groupContent);
                    
                    // Toggle group content when header is clicked
                    groupHeader.addEventListener('click', function(event) {
                        event.stopPropagation();
                        groupContent.classList.toggle('show');
                    });
                    
                    // Expand group containing current chapter
                    const hasCurrentChapter = chapters.some(chapter => chapter.number === currentChapter);
                    if (hasCurrentChapter) {
                        groupContent.classList.add('show');
                        // Add active class to the group header to highlight the selected batch
                        groupHeader.classList.add('active');
                    }
                });
                
                // Add groups container to dropdown content
                dropdownContent.appendChild(groupsContainer);
            }
            
            // Function to scroll to active chapter
            function scrollToActiveChapter() {
                // Wait a bit for the DOM to update
                setTimeout(() => {
                    const activeChapter = document.querySelector('.chapter-item.active');
                    if (activeChapter) {
                        // Scroll the active chapter into view
                        activeChapter.scrollIntoView({ block: 'center' });
                        
                        // Make sure the group containing the active chapter is expanded
                        const parentGroup = activeChapter.closest('.chapter-group-content');
                        if (parentGroup) {
                            parentGroup.classList.add('show');
                        }
                    }
                }, 100);
            }
        }
    }
});