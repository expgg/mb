// Security measures to protect website content

// Function to disable right-click context menu
function disableRightClick() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}

// Function to disable keyboard shortcuts for developer tools
function disableDevToolsShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Prevent F12 key
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Prevent Ctrl+Shift+I (Chrome, Firefox, Edge)
        if ((e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }
        
        // Prevent Ctrl+Shift+J (Chrome)
        if ((e.ctrlKey && e.shiftKey && e.key === 'J') || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }
        
        // Prevent Ctrl+Shift+C (Chrome)
        if ((e.ctrlKey && e.shiftKey && e.key === 'C') || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        
        // Prevent Ctrl+U (View source)
        if ((e.ctrlKey && e.key === 'u') || 
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
    });
}

// Function to disable text selection
function disableTextSelection() {
    // Apply to body
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    
    // Apply to all elements to ensure complete coverage
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.msUserSelect = 'none';
        element.style.mozUserSelect = 'none';
        element.style.webkitTouchCallout = 'none';
    });
}

// Function to disable image dragging
function disableImageDragging() {
    // Target all images, with special focus on reader images
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        // Disable draggable attribute
        images[i].setAttribute('draggable', 'false');
        
        // Prevent dragstart event
        images[i].addEventListener('dragstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        // Prevent dragend event
        images[i].addEventListener('dragend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        // Prevent drop event
        images[i].addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        // Prevent mousedown event with capture to block right-click save
        images[i].addEventListener('mousedown', function(e) {
            if (e.button === 2) { // Right mouse button
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
        
        // Add pointer events none on mousedown and restore on mouseup
        // This prevents the browser from initiating drag operations
        images[i].addEventListener('mousedown', function(e) {
            // Store original CSS for pointer events
            const originalPointerEvents = this.style.pointerEvents;
            
            // Temporarily disable pointer events during potential drag
            this.style.pointerEvents = 'none';
            
            // Create a function to restore pointer events
            const restorePointerEvents = () => {
                this.style.pointerEvents = originalPointerEvents;
                // Remove the event listeners after they're used
                document.removeEventListener('mouseup', restorePointerEvents);
                document.removeEventListener('mouseleave', restorePointerEvents);
            };
            
            // Add event listeners to restore pointer events
            document.addEventListener('mouseup', restorePointerEvents);
            document.addEventListener('mouseleave', restorePointerEvents);
        });
    }
    
    // Specifically target reader images for additional protection
    const readerImages = document.querySelectorAll('.reader-image');
    readerImages.forEach(img => {
        // Apply CSS that makes it harder to extract the image
        img.style.webkitUserDrag = 'none';
        img.style.KhtmlUserDrag = 'none';
        img.style.MozUserDrag = 'none';
        img.style.OUserDrag = 'none';
        img.style.userDrag = 'none';
        
        // Add a transparent overlay to prevent direct interaction with the image
        const parent = img.parentNode;
        if (parent && !parent.querySelector('.image-protector')) {
            const overlay = document.createElement('div');
            overlay.className = 'image-protector';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '10';
            overlay.style.backgroundColor = 'transparent';
            
            // Make sure the parent has position relative for absolute positioning
            if (window.getComputedStyle(parent).position === 'static') {
                parent.style.position = 'relative';
            }
            
            parent.appendChild(overlay);
        }
    });
    
    // Prevent global drag and drop events
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
}

// Function to detect and prevent DevTools from opening
function detectDevTools() {
    // For Chrome and Firefox
    const devtools = {
        isOpen: false,
        orientation: undefined
    };
    
    // Check for resize events that might indicate DevTools opening
    const threshold = 160;
    const emitEvent = (isOpen, orientation) => {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: {
                isOpen,
                orientation
            }
        }));
    };
    
    // Function to check if DevTools is open
    const checkDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';
        
        if ((widthThreshold || heightThreshold) && !(devtools.isOpen && devtools.orientation === orientation)) {
            devtools.isOpen = true;
            devtools.orientation = orientation;
            emitEvent(true, orientation);
            // Redirect or show warning when DevTools is opened
            alert('Developer tools are not allowed on this site.');
            window.location.reload();
        } else if (!(widthThreshold || heightThreshold) && devtools.isOpen) {
            devtools.isOpen = false;
            devtools.orientation = undefined;
            emitEvent(false, undefined);
        }
    };
    
    window.addEventListener('resize', checkDevTools);
    setInterval(checkDevTools, 1000);
}

// Function to disable saving page with Ctrl+S
function disableSaving() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 's' || e.keyCode === 83)) {
            e.preventDefault();
            return false;
        }
    });
}

// Function to disable printing
function disablePrinting() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 'p' || e.keyCode === 80)) {
            e.preventDefault();
            return false;
        }
    });
    
    // Also disable the print function
    window.addEventListener('beforeprint', function(e) {
        e.preventDefault();
        return false;
    });
}

// Function to add CSS that prevents inspection
function addSecurityCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Disable selection */
        * {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            -khtml-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Prevent image dragging - enhanced */
        img {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
            pointer-events: auto !important;
        }
        
        /* Enhanced protection for reader images */
        .reader-image {
            -webkit-user-drag: none !important;
            -khtml-user-drag: none !important;
            -moz-user-drag: none !important;
            -o-user-drag: none !important;
            user-drag: none !important;
            -webkit-touch-callout: none !important;
            pointer-events: auto !important;
            position: relative !important;
            z-index: 1 !important;
        }
        
        /* Reader content container positioning */
        .reader-content {
            position: relative !important;
        }
        
        /* Image protector overlay styling */
        .image-protector {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            background-color: transparent;
            cursor: default;
        }
        
        /* Disable context menu on images */
        img::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
}

// Function to continuously monitor and protect new images added to the DOM
function setupImageProtectionObserver() {
    // Create a MutationObserver to watch for new images being added to the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if nodes were added
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Loop through added nodes
                mutation.addedNodes.forEach(function(node) {
                    // Check if the node is an image
                    if (node.nodeName === 'IMG') {
                        // Apply protection to the new image
                        protectImage(node);
                    } else if (node.nodeType === 1) {
                        // If it's an element node, check for images inside it
                        const images = node.querySelectorAll('img');
                        images.forEach(function(img) {
                            protectImage(img);
                        });
                    }
                });
            }
        });
    });
    
    // Function to apply protection to a single image
    function protectImage(img) {
        // Disable draggable attribute
        img.setAttribute('draggable', 'false');
        
        // Prevent dragstart event
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        // Prevent dragend event
        img.addEventListener('dragend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        // Prevent drop event
        img.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        // Apply additional protection for reader images
        if (img.classList.contains('reader-image')) {
            // Apply CSS that makes it harder to extract the image
            img.style.webkitUserDrag = 'none';
            img.style.KhtmlUserDrag = 'none';
            img.style.MozUserDrag = 'none';
            img.style.OUserDrag = 'none';
            img.style.userDrag = 'none';
            
            // Add a transparent overlay to prevent direct interaction with the image
            const parent = img.parentNode;
            if (parent && !parent.querySelector('.image-protector')) {
                const overlay = document.createElement('div');
                overlay.className = 'image-protector';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.zIndex = '10';
                overlay.style.backgroundColor = 'transparent';
                
                // Make sure the parent has position relative for absolute positioning
                if (window.getComputedStyle(parent).position === 'static') {
                    parent.style.position = 'relative';
                }
                
                parent.appendChild(overlay);
            }
        }
    }
    
    // Start observing the entire document
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}

// Initialize all security measures
function initSecurity() {
    disableRightClick();
    disableDevToolsShortcuts();
    disableTextSelection();
    disableImageDragging();
    detectDevTools();
    disableSaving();
    disablePrinting();
    addSecurityCSS();
    setupImageProtectionObserver();
    
    // Additional measure: Clear console messages
    console.clear();
    // Override console methods to prevent debugging
    const originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
        debug: console.debug
    };
    
    // Replace console methods with empty functions
    console.log = console.info = console.warn = console.error = console.debug = function() {
        return false;
    };
    
    // Add a warning message if someone tries to access the console
    Object.defineProperty(window, 'console', {
        get: function() {
            if (devtools.isOpen) {
                window.location.reload();
            }
            return originalConsole;
        }
    });
}

// Run security measures when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initSecurity();
});

// Also run immediately in case the DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initSecurity();
}