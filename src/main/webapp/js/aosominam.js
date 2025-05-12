document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo price slider
    initPriceSlider();
    
    // Khởi tạo các chức năng khác
    initColorAndSizeSelection();
    initQuantityControls();
    initQuickView();
    initFilterAndSort();
});

// Khởi tạo thanh trượt giá
function initPriceSlider() {
    if ($("#priceSlider").length) {
        // Định dạng số thành tiền tệ VND
        function formatPrice(value) {
            return new Intl.NumberFormat('vi-VN').format(value);
        }
        
        // Chuyển đổi từ chuỗi định dạng tiền tệ về số
        function parsePrice(value) {
            return parseInt(value.replace(/\D/g, '')) || 0;
        }
        
        // Khởi tạo slider
        $("#priceSlider").slider({
            range: true,
            min: 0,
            max: 3000000,
            step: 50000,
            values: [0, 3000000],
            slide: function(event, ui) {
                $("#minPrice").val(formatPrice(ui.values[0]));
                $("#maxPrice").val(formatPrice(ui.values[1]));
            }
        });
        
        // Gán giá trị ban đầu
        $("#minPrice").val(formatPrice($("#priceSlider").slider("values", 0)));
        $("#maxPrice").val(formatPrice($("#priceSlider").slider("values", 1)));
        
        // Xử lý khi người dùng thay đổi giá trị trong input
        $("#minPrice, #maxPrice").on("input", function() {
            var minPrice = parsePrice($("#minPrice").val());
            var maxPrice = parsePrice($("#maxPrice").val());
            
            // Đảm bảo min không lớn hơn max
            if (minPrice > maxPrice) {
                minPrice = maxPrice;
            }
            
            // Cập nhật slider
            $("#priceSlider").slider("values", 0, minPrice);
            $("#priceSlider").slider("values", 1, maxPrice);
        });

        // Xử lý khi người dùng rời khỏi input để định dạng lại giá trị
        $("#minPrice, #maxPrice").on("blur", function() {
            var value = parsePrice($(this).val());
            $(this).val(formatPrice(value));
        });
        
        // Xử lý khi người dùng nhấn Enter trong input
        $("#minPrice, #maxPrice").on("keypress", function(e) {
            if (e.which === 13) {
                e.preventDefault();
                var min = $("#priceSlider").slider("values", 0);
                var max = $("#priceSlider").slider("values", 1);
                
                // Định dạng giá trị trước khi áp dụng
                $("#minPrice").val(formatPrice(min));
                $("#maxPrice").val(formatPrice(max));
                
                applyPriceFilter(min, max);
            }
        });
        
        // Xử lý khi người dùng click nút áp dụng
        $("#applyPriceFilter").on("click", function() {
            var min = $("#priceSlider").slider("values", 0);
            var max = $("#priceSlider").slider("values", 1);
            
            // Định dạng lại giá trị trên input
            $("#minPrice").val(formatPrice(min));
            $("#maxPrice").val(formatPrice(max));
            
            applyPriceFilter(min, max);
        });

        // Hàm áp dụng bộ lọc giá
        function applyPriceFilter(min, max) {
            console.log("Áp dụng lọc giá: " + formatPrice(min) + "₫ - " + formatPrice(max) + "₫");
            
            // Ẩn các sản phẩm không nằm trong khoảng giá
            $(".product-card").each(function() {
                var priceText = $(this).find(".current-price").text();
                var productPrice = parsePrice(priceText);
                
                if (productPrice >= min && productPrice <= max) {
                    $(this).closest(".col-md-4").show();
                } else {
                    $(this).closest(".col-md-4").hide();
                }
            });
            
            // Hiển thị thông báo nếu không có sản phẩm nào
            var visibleProducts = $(".product-card").closest(".col-md-4:visible").length;
            
            if (visibleProducts === 0) {
                // Nếu không có sản phẩm nào hiển thị, thêm thông báo
                if ($(".no-products-message").length === 0) {
                    $(".products-container").append('<div class="col-12 no-products-message"><p class="text-center my-5">Không có sản phẩm nào trong khoảng giá này.</p></div>');
                }
            } else {
                // Nếu có sản phẩm, xóa thông báo (nếu có)
                $(".no-products-message").remove();
            }
        }
    }
}

// Khởi tạo chức năng chọn màu sắc và kích thước
function initColorAndSizeSelection() {
    // Color selection - Cho phép chọn nhiều màu
    $(document).on("click", ".color-option", function(e) {
        // Sử dụng event delegation để đảm bảo sự kiện hoạt động
        e.preventDefault(); // Ngăn hành vi mặc định
        e.stopPropagation(); // Ngăn lan truyền sự kiện
        
        console.log("Color option clicked:", $(this).attr("title")); // Log để debug
        
        // Toggle class selected
        $(this).toggleClass("selected");
        
        // Hiển thị các màu đã chọn dưới dạng text
        updateSelectedColors();
        
        // Đảm bảo event chỉ xử lý một lần
        return false;
    });
    
    // Size selection - Vẫn chỉ chọn một kích thước
    $(document).on("click", ".size-option", function() {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
    });
    
    // Hiển thị danh sách màu đã chọn
    function updateSelectedColors() {
        var selectedColors = [];
        $(".color-option.selected").each(function() {
            selectedColors.push($(this).attr("title"));
        });
        
        // Hiển thị thông tin màu đã chọn (nếu có phần tử hiển thị)
        if ($("#selectedColorsText").length) {
            if (selectedColors.length > 0) {
                $("#selectedColorsText").text("Màu đã chọn: " + selectedColors.join(", "));
                $("#selectedColorsText").show();
            } else {
                $("#selectedColorsText").hide();
            }
        }
        
        console.log("Màu đã chọn:", selectedColors);
    }
}

// Khởi tạo điều khiển số lượng
function initQuantityControls() {
    // Giảm số lượng
    $(".quantity-decrease").on("click", function() {
        var input = $(this).siblings("input");
        var value = parseInt(input.val());
        if (value > 1) {
            input.val(value - 1);
        }
    });
    
    // Tăng số lượng
    $(".quantity-increase").on("click", function() {
        var input = $(this).siblings("input");
        var value = parseInt(input.val());
        var max = parseInt(input.attr("max") || 99);
        if (value < max) {
            input.val(value + 1);
        }
    });
}

// Khởi tạo chức năng xem nhanh
function initQuickView() {
    $(".quick-view").on("click", function() {
        var productId = $(this).data("id");
        var productCard = $(this).closest(".product-card");
        var imgSrc = productCard.find("img").attr("src");
        var title = productCard.find(".product-title").text();
        var currentPrice = productCard.find(".current-price").text();
        var originalPrice = productCard.find(".original-price").text();
        
        // Cập nhật nội dung modal
        $("#quickViewImage").attr("src", imgSrc);
        $("#quickViewTitle").text(title);
        $("#quickViewPrice").text(currentPrice);
        
        if (originalPrice) {
            $("#quickViewOriginalPrice").text(originalPrice).show();
        } else {
            $("#quickViewOriginalPrice").hide();
        }
        
        $("#quickViewAddToCart").data("id", productId);
        $("#quickViewDetails").attr("href", "product-detail.html?id=" + productId);
        
        // Mô tả mẫu - trong thực tế nên lấy từ API
        var descriptions = {
            'sm001': 'Áo sơ mi nam kẻ sọc kiểu dáng slim fit, chất liệu cotton thoáng mát. Phù hợp với nhiều phong cách khác nhau từ công sở đến dạo phố.',
            'sm002': 'Áo sơ mi nam Oxford chất liệu cao cấp, kiểu dáng regular fit thoải mái. Thiết kế cổ điển phù hợp với mọi dịp.',
            'sm003': 'Áo sơ mi nam linen cao cấp thoáng mát. Thiết kế đơn giản, tinh tế, phù hợp cho mùa hè và các chuyến đi biển.',
            'sm004': 'Áo sơ mi nam họa tiết độc đáo, chất liệu mềm mại. Form dáng hiện đại, trẻ trung cho các buổi gặp gỡ bạn bè.',
            'sm005': 'Áo sơ mi nam cotton co giãn, mềm mại và thoáng khí. Dễ dàng mix với nhiều trang phục khác nhau.',
            'sm006': 'Áo sơ mi nam denim phong cách casual, thoải mái và bền bỉ. Phù hợp cho các hoạt động ngoài trời.'
        };
        
        $("#quickViewDescription").text(descriptions[productId] || 'Thông tin sản phẩm đang được cập nhật.');
    });
    
    // Xử lý thêm vào giỏ hàng từ modal xem nhanh
    $("#quickViewAddToCart").on("click", function() {
        var productId = $(this).data("id");
        var quantity = parseInt($("#quickViewModal .quantity-selector input").val());
        
        // Lấy tất cả các màu đã chọn
        var colors = [];
        $("#quickViewModal .color-option.selected").each(function() {
            colors.push($(this).attr("title"));
        });
        
        var size = $("#quickViewModal .size-option.selected").text() || "";
        
        addToCart(productId, quantity, colors, size);
    });
}

// Khởi tạo chức năng lọc và sắp xếp
function initFilterAndSort() {
    // Xử lý sắp xếp
    $("#sort-select").on("change", function() {
        var sortValue = $(this).val();
        sortProducts(sortValue);
    });
    
    // Hàm sắp xếp sản phẩm
    function sortProducts(sortBy) {
        var products = $(".products-container .col-md-4").get();
        
        products.sort(function(a, b) {
            var priceA = parseInt($(a).find(".current-price").text().replace(/\D/g, ""));
            var priceB = parseInt($(b).find(".current-price").text().replace(/\D/g, ""));
            var nameA = $(a).find(".product-title").text();
            var nameB = $(b).find(".product-title").text();
            
            switch(sortBy) {
                case "price-asc":
                    return priceA - priceB;
                case "price-desc":
                    return priceB - priceA;
                case "name-asc":
                    return nameA.localeCompare(nameB);
                case "name-desc":
                    return nameB.localeCompare(nameA);
                case "newest":
                    // Giả định rằng sản phẩm mới nhất có badge "Mới"
                    var isNewA = $(a).find(".product-badge:contains('Mới')").length > 0 ? 1 : 0;
                    var isNewB = $(b).find(".product-badge:contains('Mới')").length > 0 ? 1 : 0;
                    return isNewB - isNewA;
                default:
                    // Mặc định sắp xếp theo thứ tự ban đầu
                    return $(a).index() - $(b).index();
            }
        });
        
        // Áp dụng thứ tự mới
        var productsContainer = $(".products-container");
        $.each(products, function(i, product) {
            productsContainer.append(product);
        });
    }
    
    // Xử lý nút lọc sản phẩm tổng hợp
    $("button.btn-primary.w-100").on("click", function() {
        // 1. Thu thập tất cả các bộ lọc đã chọn
        
        // Lọc theo giá
        var minPrice = $("#priceSlider").slider("values", 0);
        var maxPrice = $("#priceSlider").slider("values", 1);
        
        // Lọc theo màu sắc
        var selectedColors = [];
        $(".filter-group .color-option.selected").each(function() {
            selectedColors.push($(this).attr("title"));
        });
        
        // Lọc theo kích thước
        var selectedSizes = [];
        $(".filter-group .size-option.selected").each(function() {
            selectedSizes.push($(this).text());
        });
        
        // Lọc theo chất liệu
        var selectedMaterials = [];
        $(".filter-group .form-check-input:checked").each(function() {
            selectedMaterials.push($(this).next().text());
        });
        
        console.log("Áp dụng bộ lọc tổng hợp:");
        console.log("- Giá: " + formatPrice(minPrice) + "đ - " + formatPrice(maxPrice) + "đ");
        console.log("- Màu sắc: " + (selectedColors.length ? selectedColors.join(", ") : "Tất cả"));
        console.log("- Kích thước: " + (selectedSizes.length ? selectedSizes.join(", ") : "Tất cả"));
        console.log("- Chất liệu: " + (selectedMaterials.length ? selectedMaterials.join(", ") : "Tất cả"));
        
        // 2. Áp dụng bộ lọc đến tất cả sản phẩm
        filterProducts(minPrice, maxPrice, selectedColors, selectedSizes, selectedMaterials);
    });
    
    // Hàm áp dụng bộ lọc tổng hợp
    function filterProducts(minPrice, maxPrice, colors, sizes, materials) {
        // Định nghĩa hàm format giá
        function formatPrice(value) {
            return new Intl.NumberFormat('vi-VN').format(value);
        }
        
        // Định nghĩa hàm parse giá
        function parsePrice(value) {
            return parseInt(value.replace(/\D/g, '')) || 0;
        }
        
        // Ẩn/hiện các sản phẩm dựa trên bộ lọc
        $(".product-card").each(function() {
            var $product = $(this);
            var productPrice = parsePrice($product.find(".current-price").text());
            var productMatch = true;
            
            // Kiểm tra giá
            if (productPrice < minPrice || productPrice > maxPrice) {
                productMatch = false;
            }
            
            // Kiểm tra màu sắc (nếu có chọn)
            if (colors.length > 0) {
                var colorMatch = false;
                var productColors = [];
                
                // Thu thập màu của sản phẩm
                $product.find(".color-dot").each(function() {
                    var bgColor = $(this).css("background-color");
                    var colorName = mapColorToName(bgColor);
                    productColors.push(colorName);
                });
                
                // Kiểm tra xem có ít nhất một màu của sản phẩm nằm trong danh sách màu đã chọn
                for (var i = 0; i < colors.length; i++) {
                    if (productColors.includes(colors[i])) {
                        colorMatch = true;
                        break;
                    }
                }
                
                if (!colorMatch) {
                    productMatch = false;
                }
            }
            
            // Kiểm tra kích thước (giả sử tất cả sản phẩm đều có các kích thước trên trang chi tiết)
            // Trong thực tế, bạn cần lấy thông tin kích thước từ cơ sở dữ liệu
            if (sizes.length > 0) {
                // Giả định tất cả sản phẩm đều có các kích thước được chọn
                // Trong ứng dụng thực tế, bạn cần kiểm tra thông tin từ backend
            }
            
            // Kiểm tra chất liệu (giả sử thông tin chất liệu nằm trong mô tả sản phẩm)
            if (materials.length > 0) {
                var materialMatch = false;
                var productDescription = $product.find(".product-title").text().toLowerCase();
                
                for (var i = 0; i < materials.length; i++) {
                    var material = materials[i].toLowerCase();
                    if (productDescription.includes(material)) {
                        materialMatch = true;
                        break;
                    }
                }
                
                if (!materialMatch) {
                    productMatch = false;
                }
            }
            
            // Hiện hoặc ẩn sản phẩm dựa trên kết quả lọc
            if (productMatch) {
                $product.closest(".col-md-4").show();
            } else {
                $product.closest(".col-md-4").hide();
            }
        });
        
        // Hiển thị thông báo nếu không có sản phẩm nào
        var visibleProducts = $(".product-card").closest(".col-md-4:visible").length;
        
        if (visibleProducts === 0) {
            // Nếu không có sản phẩm nào hiển thị, thêm thông báo
            if ($(".no-products-message").length === 0) {
                $(".products-container").append('<div class="col-12 no-products-message"><p class="text-center my-5">Không tìm thấy sản phẩm phù hợp với bộ lọc.</p></div>');
            }
        } else {
            // Nếu có sản phẩm, xóa thông báo (nếu có)
            $(".no-products-message").remove();
        }
        
        // Hiển thị thông báo đã áp dụng bộ lọc
        showNotification("Đã áp dụng bộ lọc!");
    }
    
    // Hỗ trợ chuyển đổi màu CSS sang tên màu
    function mapColorToName(cssColor) {
        // Chuyển rgba sang hex hoặc xử lý trực tiếp
        var colorMap = {
            'rgb(255, 255, 255)': 'Trắng',
            '#ffffff': 'Trắng',
            'rgb(0, 0, 0)': 'Đen',
            '#000000': 'Đen',
            'rgb(45, 62, 80)': 'Xanh đậm',
            '#2d3e50': 'Xanh đậm',
            'rgb(52, 152, 219)': 'Xanh nhạt',
            '#3498db': 'Xanh nhạt',
            'rgb(231, 76, 60)': 'Đỏ',
            '#e74c3c': 'Đỏ',
            'rgb(241, 196, 15)': 'Vàng',
            '#f1c40f': 'Vàng',
            'rgb(46, 204, 113)': 'Xanh lá',
            '#2ecc71': 'Xanh lá',
            'rgb(155, 89, 182)': 'Tím',
            '#9b59b6': 'Tím'
        };
        
        return colorMap[cssColor] || 'Khác';
    }
}

// Hàm thêm vào giỏ hàng - cập nhật để hỗ trợ nhiều màu
function addToCart(productId, quantity, colors, size) {
    console.log(`Thêm sản phẩm vào giỏ hàng: ID=${productId}, số lượng=${quantity}, màu=${colors.join(", ")}, kích thước=${size}`);
    
    // Hiển thị thông báo thêm vào giỏ hàng thành công
    // Trong thực tế, bạn cần gửi request tới server để cập nhật giỏ hàng
    
    // Cập nhật số lượng sản phẩm trong giỏ hàng trên header
    updateCartCount(1);
    
    // Hiển thị thông báo
    showNotification("Đã thêm sản phẩm vào giỏ hàng thành công!");
    
    // Đóng modal nếu đang mở
    $("#quickViewModal").modal("hide");
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount(increment) {
    var cartBadge = $(".cart-badge");
    var currentCount = parseInt(cartBadge.text()) || 0;
    cartBadge.text(currentCount + increment);
}

// Hiển thị thông báo
function showNotification(message) {
    // Kiểm tra xem đã có toast container chưa
    if ($(".toast-container").length === 0) {
        $("body").append('<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
    }
    
    // Tạo toast
    var toast = $(`
        <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `);
    
    // Thêm toast vào container
    $(".toast-container").append(toast);
    
    // Khởi tạo và hiển thị toast
    var toastEl = new bootstrap.Toast(toast[0], {
        delay: 3000
    });
    toastEl.show();
    
    // Xóa toast khi đã ẩn
    toast.on('hidden.bs.toast', function() {
        toast.remove();
    });

}
