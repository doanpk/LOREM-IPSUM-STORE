// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Load featured products
    loadFeaturedProducts();

    // Load categories
    loadCategories();

    // Add to cart functionality
    initializeAddToCart();
});

// Function to load featured products
function loadFeaturedProducts() {
    // This would typically be an API call
    const products = [
        {
            id: 1,
            name: 'Áo Polo Nike',
            price: '599.000đ',
            image: 'images/products/polo-nike.jpg'
        },
        {
            id: 2,
            name: 'Áo Thun Adidas',
            price: '399.000đ',
            image: 'images/products/thun-adidas.jpg'
        },
        // Add more products as needed
    ];

    const productsContainer = document.querySelector('.featured-products .row');
    if (productsContainer) {
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }
}

// Function to create product card
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';
    
    col.innerHTML = `
        <div class="product-card animate-fade-in">
            <img src="${product.image}" alt="${product.name}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="price">${product.price}</p>
                <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Function to load categories
function loadCategories() {
    // This would typically be an API call
    const categories = [
        {
            id: 1,
            name: 'Áo Nam',
            image: 'images/categories/ao-nam.jpg'
        },
        {
            id: 2,
            name: 'Áo Nữ',
            image: 'images/categories/ao-nu.jpg'
        },
        // Add more categories as needed
    ];

    const categoriesContainer = document.querySelector('.categories .row');
    if (categoriesContainer) {
        categories.forEach(category => {
            const categoryCard = createCategoryCard(category);
            categoriesContainer.appendChild(categoryCard);
        });
    }
}

// Function to create category card
function createCategoryCard(category) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6';
    
    col.innerHTML = `
        <div class="category-card animate-fade-in">
            <img src="${category.image}" alt="${category.name}">
            <div class="category-overlay">
                <h3>${category.name}</h3>
                <a href="products.html?category=${category.id}" class="btn btn-light btn-sm">
                    Xem thêm
                </a>
            </div>
        </div>
    `;
    
    return col;
}

// Function to initialize add to cart functionality
function initializeAddToCart() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.productId;
            addToCart(productId);
        }
    });
}

// Function to add product to cart
function addToCart(productId) {
    // This would typically be an API call
    console.log(`Adding product ${productId} to cart`);
    
    // Show success message
    showNotification('Sản phẩm đã được thêm vào giỏ hàng!', 'success');
}

// Function to show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 
// Enhance dropdown functionality for compact menus
document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdown hover on desktop
    const handleDropdownHover = function() {
        if (window.innerWidth >= 992) { // Only on desktop
            const dropdowns = document.querySelectorAll('.navbar-nav .dropdown');
            
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    // Close all other open dropdowns first
                    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                        if (!this.contains(menu)) {
                            menu.classList.remove('show');
                            menu.closest('.dropdown').classList.remove('show');
                        }
                    });
                    
                    // Open this dropdown
                    this.classList.add('show');
                    const menu = this.querySelector('.dropdown-menu');
                    menu.classList.add('show');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.classList.remove('show');
                    const menu = this.querySelector('.dropdown-menu');
                    menu.classList.remove('show');
                });
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                        menu.classList.remove('show');
                        menu.closest('.dropdown').classList.remove('show');
                    });
                }
            });
        }
    };
    
    // Initialize
    handleDropdownHover();
    
    // Re-initialize on window resize
    window.addEventListener('resize', handleDropdownHover);
});