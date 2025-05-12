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
// Cập nhật hàm loadFeaturedProducts để xóa các sản phẩm cũ trước khi thêm mới
function loadFeaturedProducts() {
    // Xóa sạch các sản phẩm cũ trước khi load mới
    const featuredProductsContainer = document.getElementById('featured-products-container');
    if (featuredProductsContainer) {
        featuredProductsContainer.innerHTML = ''; // Xóa toàn bộ nội dung cũ
        
        // Thêm sản phẩm mới từ API hoặc dữ liệu tĩnh
        // Ví dụ:
        const products = [
            {
                id: 1,
                name: 'Áo Polo Nike',
                price: '599.000đ',
                image: 'image/products/AoPoloNike.png',
            },
            {
                id: 2,
                name: 'Áo Thun Adidas',
                price: '399.000đ',
                image: 'image/products/AoThunAdidas.png',
            },
            {
                id: 3, 
                name: 'Áo Polo Nike Blue',
                price: '599.000đ',
                image: 'image/products/AoPoloNikeBlue.png',
            },
            {
                id: 4,
                name: 'Áo Thun Adidas Black',
                price: '399.000đ',
                image: 'image/products/AoThunAdidasBlack.png',
            }
        ];
        
        // Thêm mỗi sản phẩm vào container
        products.forEach(product => {
            const productHtml = `
                <div class="col-6 col-md-6 col-lg-6 mb-4">
                    <div class="product-card p-3 bg-white rounded shadow-sm h-100">
                        <div class="product-img-container mb-3">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid w-100">
                        </div>
                        <h5 class="product-title">${product.name}</h5>
                        <div class="product-price mb-3">${product.price}</div>
                        <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">THÊM VÀO GIỎ</button>
                    </div>
                </div>
            `;
            featuredProductsContainer.innerHTML += productHtml;
        });
    }
}

// Hàm bổ sung để xử lý thêm vào giỏ hàng
function addToCart(productId) {
    // Xử lý thêm sản phẩm vào giỏ hàng
    console.log('Thêm sản phẩm ID:', productId, 'vào giỏ hàng');
    
    // Hiển thị thông báo
    const toast = new bootstrap.Toast(document.getElementById('notificationToast'));
    toast.show();
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
    
    // Thêm hiệu ứng co nhỏ header khi cuộn
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) { // Khi cuộn xuống quá 100px
            header.classList.add('header-shrink');
            navbar.classList.add('navbar-shrink');
        } else {
            header.classList.remove('header-shrink');
            navbar.classList.remove('navbar-shrink');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');

    // Ẩn nút ngay khi load trang nếu ở đầu trang
    if (window.pageYOffset <= 300) {
        backToTopButton.style.display = 'none';
    } else {
        backToTopButton.style.display = 'block';
    }

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});