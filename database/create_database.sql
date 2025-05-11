-- Tạo database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'clothing_store')
BEGIN
    CREATE DATABASE clothing_store;
END
GO

-- Sử dụng database
USE clothing_store;
GO

-- Tạo schema cho sản phẩm
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'product_schema')
BEGIN
    EXEC('CREATE SCHEMA product_schema');
END
GO

-- Tạo schema cho người dùng
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'user_schema')
BEGIN
    EXEC('CREATE SCHEMA user_schema');
END
GO

-- Tạo schema cho đơn hàng
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'order_schema')
BEGIN
    EXEC('CREATE SCHEMA order_schema');
END
GO

-- Tạo schema cho thanh toán
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'payment_schema')
BEGIN
    EXEC('CREATE SCHEMA payment_schema');
END
GO

-- Tạo schema cho khuyến mãi
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'promotion_schema')
BEGIN
    EXEC('CREATE SCHEMA promotion_schema');
END
GO

-- Tạo schema cho đánh giá
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'review_schema')
BEGIN
    EXEC('CREATE SCHEMA review_schema');
END
GO

-- Tạo schema cho thống kê
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'statistics_schema')
BEGIN
    EXEC('CREATE SCHEMA statistics_schema');
END
GO

-- Tạo login và user
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'clothing_store_user')
BEGIN
    CREATE LOGIN clothing_store_user WITH PASSWORD = 'YourStrongPassword123!';
END
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'clothing_store_user')
BEGIN
    CREATE USER clothing_store_user FOR LOGIN clothing_store_user;
END
GO

-- Cấp quyền cho user
EXEC sp_addrolemember 'db_owner', 'clothing_store_user';
GO

-- Tạo các role
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'product_manager')
BEGIN
    CREATE ROLE product_manager;
END
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'order_manager')
BEGIN
    CREATE ROLE order_manager;
END
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'customer_service')
BEGIN
    CREATE ROLE customer_service;
END
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'admin')
BEGIN
    CREATE ROLE admin;
END
GO

-- Cấp quyền cho các role
GRANT SELECT, INSERT, UPDATE ON SCHEMA::product_schema TO product_manager;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::order_schema TO order_manager;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::user_schema TO customer_service;
GRANT CONTROL ON DATABASE::clothing_store TO admin;
GO

-- Tạo các bảng cơ bản
-- Bảng categories
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'categories' AND schema_id = SCHEMA_ID('product_schema'))
BEGIN
    CREATE TABLE product_schema.categories (
        category_id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        description NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng products
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'products' AND schema_id = SCHEMA_ID('product_schema'))
BEGIN
    CREATE TABLE product_schema.products (
        product_id INT IDENTITY(1,1) PRIMARY KEY,
        category_id INT,
        name NVARCHAR(200) NOT NULL,
        description NVARCHAR(MAX),
        price DECIMAL(10,2) NOT NULL,
        sku NVARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng inventory
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'inventory' AND schema_id = SCHEMA_ID('product_schema'))
BEGIN
    CREATE TABLE product_schema.inventory (
        inventory_id INT IDENTITY(1,1) PRIMARY KEY,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng customers
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'customers' AND schema_id = SCHEMA_ID('user_schema'))
BEGIN
    CREATE TABLE user_schema.customers (
        customer_id INT IDENTITY(1,1) PRIMARY KEY,
        customer_name NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL,
        phone NVARCHAR(20),
        address NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng orders
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'orders' AND schema_id = SCHEMA_ID('order_schema'))
BEGIN
    CREATE TABLE order_schema.orders (
        order_id INT IDENTITY(1,1) PRIMARY KEY,
        customer_id INT NOT NULL,
        order_date DATETIME DEFAULT GETDATE(),
        shipping_address NVARCHAR(MAX),
        payment_method NVARCHAR(50),
        status NVARCHAR(20) DEFAULT 'PENDING',
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng order_details
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'order_details' AND schema_id = SCHEMA_ID('order_schema'))
BEGIN
    CREATE TABLE order_schema.order_details (
        order_detail_id INT IDENTITY(1,1) PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng payments
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'payments' AND schema_id = SCHEMA_ID('payment_schema'))
BEGIN
    CREATE TABLE payment_schema.payments (
        payment_id INT IDENTITY(1,1) PRIMARY KEY,
        order_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method NVARCHAR(50) NOT NULL,
        transaction_id NVARCHAR(100),
        status NVARCHAR(20) DEFAULT 'PENDING',
        payment_date DATETIME DEFAULT GETDATE(),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng payment_methods
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'payment_methods' AND schema_id = SCHEMA_ID('payment_schema'))
BEGIN
    CREATE TABLE payment_schema.payment_methods (
        method_id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(50) NOT NULL,
        description NVARCHAR(MAX),
        is_active BIT DEFAULT 1,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Bảng payment_history
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'payment_history' AND schema_id = SCHEMA_ID('payment_schema'))
BEGIN
    CREATE TABLE payment_schema.payment_history (
        history_id INT IDENTITY(1,1) PRIMARY KEY,
        payment_id INT NOT NULL,
        old_status NVARCHAR(20),
        new_status NVARCHAR(20),
        change_date DATETIME DEFAULT GETDATE(),
        notes NVARCHAR(MAX)
    );
END
GO

-- Bảng product_history
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'product_history' AND schema_id = SCHEMA_ID('product_schema'))
BEGIN
    CREATE TABLE product_schema.product_history (
        history_id INT IDENTITY(1,1) PRIMARY KEY,
        product_id INT NOT NULL,
        change_date DATETIME DEFAULT GETDATE(),
        old_price DECIMAL(10,2),
        new_price DECIMAL(10,2),
        old_name NVARCHAR(200),
        new_name NVARCHAR(200)
    );
END
GO

-- Bảng order_status_history
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'order_status_history' AND schema_id = SCHEMA_ID('order_schema'))
BEGIN
    CREATE TABLE order_schema.order_status_history (
        history_id INT IDENTITY(1,1) PRIMARY KEY,
        order_id INT NOT NULL,
        old_status NVARCHAR(20),
        new_status NVARCHAR(20),
        change_date DATETIME DEFAULT GETDATE()
    );
END
GO

-- Tạo các view
IF EXISTS (SELECT * FROM sys.views WHERE name = 'product_inventory')
    DROP VIEW product_schema.product_inventory;
GO

CREATE VIEW product_schema.product_inventory AS
SELECT p.product_id, p.name, p.price, i.quantity, c.name as category
FROM product_schema.products p
JOIN product_schema.inventory i ON p.product_id = i.product_id
JOIN product_schema.categories c ON p.category_id = c.category_id;
GO

IF EXISTS (SELECT * FROM sys.views WHERE name = 'order_summary')
    DROP VIEW order_schema.order_summary;
GO

CREATE VIEW order_schema.order_summary AS
SELECT o.order_id, o.order_date, c.customer_name, 
       SUM(od.quantity * od.price) as total_amount,
       o.status
FROM order_schema.orders o
JOIN user_schema.customers c ON o.customer_id = c.customer_id
JOIN order_schema.order_details od ON o.order_id = od.order_id
GROUP BY o.order_id, o.order_date, c.customer_name, o.status;
GO

-- Tạo các stored procedure
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'update_inventory')
    DROP PROCEDURE product_schema.update_inventory;
GO

CREATE PROCEDURE product_schema.update_inventory
    @p_product_id INT,
    @p_quantity INT
AS
BEGIN
    UPDATE product_schema.inventory 
    SET quantity = quantity + @p_quantity
    WHERE product_id = @p_product_id;
END
GO

IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'create_order')
    DROP PROCEDURE order_schema.create_order;
GO

CREATE PROCEDURE order_schema.create_order
    @p_customer_id INT,
    @p_shipping_address NVARCHAR(MAX),
    @p_payment_method NVARCHAR(50)
AS
BEGIN
    INSERT INTO order_schema.orders (
        customer_id, 
        order_date, 
        shipping_address, 
        payment_method, 
        status
    ) VALUES (
        @p_customer_id,
        GETDATE(),
        @p_shipping_address,
        @p_payment_method,
        'PENDING'
    );
END
GO

-- Tạo các trigger
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'after_product_update')
    DROP TRIGGER product_schema.after_product_update;
GO

CREATE TRIGGER product_schema.after_product_update
ON product_schema.products
AFTER UPDATE
AS
BEGIN
    INSERT INTO product_schema.product_history (
        product_id,
        change_date,
        old_price,
        new_price,
        old_name,
        new_name
    )
    SELECT 
        i.product_id,
        GETDATE(),
        d.price,
        i.price,
        d.name,
        i.name
    FROM inserted i
    JOIN deleted d ON i.product_id = d.product_id;
END
GO

IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'after_order_status_update')
    DROP TRIGGER order_schema.after_order_status_update;
GO

CREATE TRIGGER order_schema.after_order_status_update
ON order_schema.orders
AFTER UPDATE
AS
BEGIN
    IF UPDATE(status)
    BEGIN
        INSERT INTO order_schema.order_status_history (
            order_id,
            old_status,
            new_status,
            change_date
        )
        SELECT 
            i.order_id,
            d.status,
            i.status,
            GETDATE()
        FROM inserted i
        JOIN deleted d ON i.order_id = d.order_id
        WHERE i.status != d.status;
    END
END
GO

-- Tạo các index
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_product_name')
    CREATE INDEX idx_product_name ON product_schema.products(name);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_product_category')
    CREATE INDEX idx_product_category ON product_schema.products(category_id);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_order_date')
    CREATE INDEX idx_order_date ON order_schema.orders(order_date);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_customer_email')
    CREATE INDEX idx_customer_email ON user_schema.customers(email);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_payment_transaction')
    CREATE INDEX idx_payment_transaction ON payment_schema.payments(transaction_id);
GO

-- Tạo các foreign key constraints
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_product_category')
BEGIN
    ALTER TABLE product_schema.products
    ADD CONSTRAINT fk_product_category
    FOREIGN KEY (category_id) REFERENCES product_schema.categories(category_id);
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_order_product')
BEGIN
    ALTER TABLE order_schema.order_details
    ADD CONSTRAINT fk_order_product
    FOREIGN KEY (product_id) REFERENCES product_schema.products(product_id);
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_order_customer')
BEGIN
    ALTER TABLE order_schema.orders
    ADD CONSTRAINT fk_order_customer
    FOREIGN KEY (customer_id) REFERENCES user_schema.customers(customer_id);
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'fk_payment_order')
BEGIN
    ALTER TABLE payment_schema.payments
    ADD CONSTRAINT fk_payment_order
    FOREIGN KEY (order_id) REFERENCES order_schema.orders(order_id);
END
GO

-- Tạo các check constraints
IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'chk_product_price')
BEGIN
    ALTER TABLE product_schema.products
    ADD CONSTRAINT chk_product_price
    CHECK (price >= 0);
END
GO

IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'chk_order_status')
BEGIN
    ALTER TABLE order_schema.orders
    ADD CONSTRAINT chk_order_status
    CHECK (status IN ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'));
END
GO

IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'chk_payment_status')
BEGIN
    ALTER TABLE payment_schema.payments
    ADD CONSTRAINT chk_payment_status
    CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'));
END
GO

-- Tạo các unique constraints
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'unq_customer_email')
BEGIN
    ALTER TABLE user_schema.customers
    ADD CONSTRAINT unq_customer_email
    UNIQUE (email);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'unq_product_sku')
BEGIN
    ALTER TABLE product_schema.products
    ADD CONSTRAINT unq_product_sku
    UNIQUE (sku);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'unq_payment_transaction')
BEGIN
    ALTER TABLE payment_schema.payments
    ADD CONSTRAINT unq_payment_transaction
    UNIQUE (transaction_id);
END
GO 