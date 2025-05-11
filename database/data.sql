-- Thêm dữ liệu mẫu cho Categories
INSERT INTO categories (name, description, parent_id, image_url) VALUES
('Áo Nam', 'Các loại áo dành cho nam', NULL, '/images/categories/ao-nam.jpg'),
('Áo Nữ', 'Các loại áo dành cho nữ', NULL, '/images/categories/ao-nu.jpg'),
('Quần Nam', 'Các loại quần dành cho nam', NULL, '/images/categories/quan-nam.jpg'),
('Quần Nữ', 'Các loại quần dành cho nữ', NULL, '/images/categories/quan-nu.jpg'),
('Phụ kiện', 'Các loại phụ kiện thời trang', NULL, '/images/categories/phu-kien.jpg'),
('Áo Polo', 'Áo polo nam nữ', 1, '/images/categories/ao-polo.jpg'),
('Áo Thun', 'Áo thun nam nữ', 1, '/images/categories/ao-thun.jpg'),
('Quần Jeans', 'Quần jeans nam nữ', 3, '/images/categories/quan-jeans.jpg'),
('Quần Short', 'Quần short nam nữ', 3, '/images/categories/quan-short.jpg');

-- Thêm dữ liệu mẫu cho Brands
INSERT INTO brands (name, description, logo_url) VALUES
('Nike', 'Thương hiệu thể thao hàng đầu', '/images/brands/nike.png'),
('Adidas', 'Thương hiệu thể thao nổi tiếng', '/images/brands/adidas.png'),
('Zara', 'Thương hiệu thời trang nhanh', '/images/brands/zara.png'),
('H&M', 'Thương hiệu thời trang giá rẻ', '/images/brands/hm.png'),
('Uniqlo', 'Thương hiệu thời trang Nhật Bản', '/images/brands/uniqlo.png');

-- Thêm dữ liệu mẫu cho Users
INSERT INTO users (username, password, email, full_name, phone, address, role) VALUES
('admin', '$2a$10$rDkPvvAFV6GgJjXpYWxqUOQZx5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'admin@example.com', 'Admin User', '0123456789', '123 Admin Street', 'ADMIN'),
('user1', '$2a$10$rDkPvvAFV6GgJjXpYWxqUOQZx5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'user1@example.com', 'Normal User', '0987654321', '456 User Street', 'USER'),
('user2', '$2a$10$rDkPvvAFV6GgJjXpYWxqUOQZx5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5', 'user2@example.com', 'Test User', '0123456788', '789 Test Street', 'USER');

-- Thêm dữ liệu mẫu cho UserProfiles
INSERT INTO user_profiles (user_id, avatar_url, date_of_birth, gender, preferred_size, preferred_color) VALUES
(1, '/images/avatars/admin.jpg', '1990-01-01', 'Male', 'L', 'Black,Blue'),
(2, '/images/avatars/user1.jpg', '1995-05-15', 'Female', 'M', 'Pink,White'),
(3, '/images/avatars/user2.jpg', '1992-08-20', 'Male', 'XL', 'Black,Red');

-- Thêm dữ liệu mẫu cho Products
INSERT INTO products (name, description, price, category_id, brand_id, stock_quantity, image_url) VALUES
('Áo Polo Nike', 'Áo polo Nike chất liệu cotton', 599000, 6, 1, 100, '/images/products/polo-nike.jpg'),
('Áo Thun Adidas', 'Áo thun Adidas form rộng', 399000, 7, 2, 150, '/images/products/thun-adidas.jpg'),
('Quần Jeans Zara', 'Quần jeans Zara slim fit', 799000, 8, 3, 80, '/images/products/jeans-zara.jpg'),
('Quần Short H&M', 'Quần short H&M thể thao', 299000, 9, 4, 120, '/images/products/short-hm.jpg'),
('Áo Polo Uniqlo', 'Áo polo Uniqlo basic', 299000, 6, 5, 200, '/images/products/polo-uniqlo.jpg');

-- Thêm dữ liệu mẫu cho ProductVariants
INSERT INTO product_variants (product_id, size, color, sku, stock_quantity, price_adjustment) VALUES
(1, 'M', 'Đen', 'NIK-POLO-M-BLK', 30, 0),
(1, 'L', 'Đen', 'NIK-POLO-L-BLK', 40, 0),
(1, 'XL', 'Đen', 'NIK-POLO-XL-BLK', 30, 0),
(2, 'S', 'Trắng', 'ADI-THUN-S-WHT', 50, 0),
(2, 'M', 'Trắng', 'ADI-THUN-M-WHT', 50, 0),
(2, 'L', 'Trắng', 'ADI-THUN-L-WHT', 50, 0);

-- Thêm dữ liệu mẫu cho ProductImages
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(1, '/images/products/polo-nike-1.jpg', true),
(1, '/images/products/polo-nike-2.jpg', false),
(1, '/images/products/polo-nike-3.jpg', false),
(2, '/images/products/thun-adidas-1.jpg', true),
(2, '/images/products/thun-adidas-2.jpg', false);

-- Thêm dữ liệu mẫu cho Promotions
INSERT INTO promotions (name, description, discount_type, discount_value, start_date, end_date) VALUES
('Khuyến mãi mùa hè', 'Giảm giá mùa hè', 'PERCENTAGE', 20, '2024-06-01 00:00:00', '2024-08-31 23:59:59'),
('Khuyến mãi tháng 5', 'Giảm giá tháng 5', 'FIXED_AMOUNT', 100000, '2024-05-01 00:00:00', '2024-05-31 23:59:59');

-- Thêm dữ liệu mẫu cho PromotionProducts
INSERT INTO promotion_products (promotion_id, product_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);

-- Thêm dữ liệu mẫu cho Orders
INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method, promotion_id, discount_amount, shipping_fee) VALUES
(2, 898000, 'COMPLETED', '456 User Street, District 1, HCM', 'COD', 1, 179600, 30000),
(2, 499000, 'PENDING', '456 User Street, District 1, HCM', 'BANK_TRANSFER', NULL, 0, 30000),
(3, 1298000, 'PROCESSING', '789 Test Street, District 2, HCM', 'CREDIT_CARD', 2, 100000, 30000);

-- Thêm dữ liệu mẫu cho OrderDetails
INSERT INTO order_details (order_id, product_id, variant_id, quantity, price) VALUES
(1, 1, 1, 2, 299000),
(1, 3, NULL, 1, 499000),
(2, 3, NULL, 1, 499000),
(3, 1, 2, 1, 299000),
(3, 2, 4, 2, 399000);

-- Thêm dữ liệu mẫu cho Cart
INSERT INTO cart (user_id, product_id, variant_id, quantity) VALUES
(2, 2, 4, 1),
(2, 4, NULL, 2),
(3, 1, 3, 1);

-- Thêm dữ liệu mẫu cho Reviews
INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
(2, 1, 5, 'Sản phẩm chất lượng tốt, đúng như mô tả'),
(2, 3, 4, 'Quần đẹp nhưng hơi chật một chút'),
(3, 2, 5, 'Áo thun rất thoáng mát, chất liệu tốt');

-- Thêm dữ liệu mẫu cho Wishlist
INSERT INTO wishlist (user_id, product_id) VALUES
(2, 1),
(2, 3),
(3, 2),
(3, 4);

-- Thêm dữ liệu mẫu cho ShippingMethods
INSERT INTO shipping_methods (name, description, base_fee, estimated_days) VALUES
('Giao hàng tiêu chuẩn', 'Giao hàng trong 3-5 ngày', 30000, 4),
('Giao hàng nhanh', 'Giao hàng trong 1-2 ngày', 50000, 2),
('Giao hàng siêu tốc', 'Giao hàng trong ngày', 100000, 1);

-- Thêm dữ liệu mẫu cho OrderShipping
INSERT INTO order_shipping (order_id, shipping_method_id, tracking_number, status, estimated_delivery_date) VALUES
(1, 1, 'GH123456789', 'DELIVERED', '2024-05-15 00:00:00'),
(2, 2, 'GH987654321', 'SHIPPING', '2024-05-20 00:00:00'),
(3, 3, 'GH456789123', 'PENDING', '2024-05-18 00:00:00');

-- Thêm dữ liệu mẫu cho PaymentTransactions
INSERT INTO payment_transactions (order_id, amount, payment_method, transaction_id, status) VALUES
(1, 898000, 'COD', 'COD123456', 'COMPLETED'),
(2, 499000, 'BANK_TRANSFER', 'BT987654', 'PENDING'),
(3, 1298000, 'CREDIT_CARD', 'CC456789', 'PROCESSING');

-- Thêm dữ liệu mẫu cho Notifications
INSERT INTO notifications (user_id, title, content, type, is_read) VALUES
(2, 'Đơn hàng đã được giao', 'Đơn hàng #1 của bạn đã được giao thành công', 'ORDER_STATUS', false),
(2, 'Khuyến mãi mới', 'Giảm giá 20% cho tất cả sản phẩm mùa hè', 'PROMOTION', false),
(3, 'Đơn hàng đang xử lý', 'Đơn hàng #3 của bạn đang được xử lý', 'ORDER_STATUS', false);

-- Thêm dữ liệu mẫu cho UserAddresses
INSERT INTO user_addresses (user_id, address_line1, address_line2, city, state, postal_code, country, is_default) VALUES
(2, '456 User Street', 'Floor 2', 'Ho Chi Minh City', 'District 1', '70000', 'Vietnam', true),
(2, '789 User Street', 'Floor 3', 'Ho Chi Minh City', 'District 2', '70000', 'Vietnam', false),
(3, '123 Test Street', 'Floor 1', 'Ho Chi Minh City', 'District 3', '70000', 'Vietnam', true); 