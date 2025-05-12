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