document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!'); // Add this line to verify script loading
    
    // Get the mobile menu button and mobile menu element
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    console.log('mobileMenuButton:', mobileMenuButton); // Debug
    console.log('mobileMenu:', mobileMenu); // Debug

    if (!mobileMenuButton || !mobileMenu) {
        console.error('Mobile menu elements not found!');
        return;
    }

    // Toggle mobile menu visibility when the button is clicked
    mobileMenuButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Add this line
        console.log('Menu button clicked!'); // Debug
        
        // Toggle the 'hidden' class to show/hide the menu
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon between bars and X
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a menu item
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});
