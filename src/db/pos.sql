-- TABLE
CREATE TABLE CashInOutPaymentCategories (
    uuid TEXT NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL DEFAULT  0 CHECK (isActive IN (0, 1)),
    name TEXT NOT NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE CashInOutTransaction (
    uuid TEXT NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL DEFAULT  0 CHECK (isActive IN (0, 1)),
    shiftUUID TEXT NOT NULL,
    cashIn DATE NULL,
    cashOut DATE NULL,
    cashInOutCategoryUUID TEXT NOT NULL,
    paymentTypeUUID TEXT NOT NULL,
    description TEXT NULL,
    paymentDate DATE NOT NULL,
    objectId TEXT NOT NULL,
    objectType TEXT NOT NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false)),
    CONSTRAINT fk_shiftUUID
    FOREIGN KEY (shiftUUID)  
    REFERENCES Shifts(uuid),
    CONSTRAINT fk_cashInOutCategoryUUID
    FOREIGN KEY (cashInOutCategoryUUID)  
    REFERENCES CashInOutCategory(uuid),
    CONSTRAINT fk_paymentTypeUUID
    FOREIGN KEY (paymentTypeUUID)  
    REFERENCES PaymentType(uuid)
);
CREATE TABLE Category (
    uuid TEXT NOT NULL PRIMARY KEY,
	isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
	name TEXT NOT NULL,
	color TEXT NOT NULL,
	createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE CustomerLedgers (
    uuid TEXT NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    customerUUID TEXT NOT NULL,
    orderUUID TEXT NOT NULL,
    paymentUUID TEXT NOT NULL,
    credit DECIMAL(10,2) NULL,
    debit DECIMAL(10,2) NULL,
    comment TEXT NULL,
    paymentDate DATE NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false)),
    CONSTRAINT fk_customerUUID 
    FOREIGN KEY (customerUUID)  
    REFERENCES Customers(uuid),
    CONSTRAINT fk_orderUUID 
    FOREIGN KEY (orderUUID)  
    REFERENCES Orders(uuid),
    CONSTRAINT fk_paymentUUID 
    FOREIGN KEY (paymentUUID)  
    REFERENCES Payments(uuid)
);
CREATE TABLE Customers (
    uuid TEXT NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    displayName TEXT NOT NULL,
    code TEXT NOT NULL,
    email TEXT NULL,
    mobileNumberCountryCode TEXT NOT NULL DEFAULT '+91',
    mobileNumber INTEGER NOT NULL,
    address TEXT NOT NULL,
    gender TEXT NOT NULL,
    dob DATE NOT NULL,
    creditLimit DECIMAL(10,2) NULL,
    creditLimitEnabled INTEGER NOT NULL DEFAULT 0 CHECK(creditLimitEnabled IN (0,1)),
    vatNumber TEXT NOT NULL,
    note TEXT NULL,
    lastVisitedDate DATE NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE demo (ID integer primary key, Name varchar(20), Hint text );
CREATE TABLE DiningOptions (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NULL,
    isDefault INTEGER NOT NULL DEFAULT 0 CHECK (isDefault IN (0, 1))
);
CREATE TABLE Discount (
    uuid TEXT NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    name TEXT NOT NULL,
    type INTEGER NOT NULL DEFAULT 0 CHECK (type IN (0, 1)),
    percentage DECIMAL(10,2) NULL,
    amount DECIMAL(10,2) NOT NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE Modifier (
    uuid TEXT NOT NULL PRIMARY KEY,
	isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    name TEXT NOT nULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE ModifierItem (
    uuid TEXT NOT NULL PRIMARY KEY,
	isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    modifierUUID TEXT NOT NULL,
    position TEXT NOT NULL,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_new_modifierUUID 
    FOREIGN KEY (modifierUUID)  
    REFERENCES Modifier(uuid)
);
CREATE TABLE OtherChargesOnBill (
    uuid TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    type INTEGER NOT NULL DEFAULT 0 CHECK (type IN (0, 1)),
    percentage DECIMAL(10,2) NULL,
    amount DECIMAL(10,2) NOT NULL,
    defaultAddToBill INTEGER NOT NULL DEFAULT 1 CHECK (defaultAddToBill IN (0, 1)),
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE PaymentTypes (
    id INTEGER NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    name TEXT NOT NULL,
    isDefault INTEGER NOT NULL DEFAULT 0 CHECK (isDefault IN (0, 1))
);
CREATE TABLE Product (
    uuid TEXT NOT NULL PRIMARY KEY,
	isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    categoryUUId TEXT NOT NULL,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
    sortByWeight INTEGER NOT NULL CHECK(sortByWeight IN (0,1)),
    unitId TEXT NOT NULL,
    trackStock INTEGER NOT NULL CHECK(sortByWeight IN (0,1)),
    isTaxFree INTEGER NOT NULL CHECK(sortByWeight IN (0,1)),
    discountUUID TEXT NOT NULL,
    barCode TEXT NOT NULL UNIQUE,
    skuCode TEXT NOT NULL UNIQUE,
    salePrice DECIMAL(10,2) NOT NULL,
    buyingPrice DECIMAL(10,2) NOT NULL,
    stockInHand INTEGER NOT NULL,
    lowStockReminder INTEGER NOT NULL DEFAULT 0 CHECK(sortByWeight IN (0,1)),
    autoUpdateStockOnSale INTEGER NOT NULL DEFAULT 0 CHECK(autoUpdateStockOnSale IN (0,1)),
    preventSaleWhenOutOfStock INTEGER NOT NULL DEFAULT 0 CHECK(preventSaleWhenOutOfStock IN (0,1)),
    photoDisplayType INTEGER NOT NULL DEFAULT 0 CHECK(photoDisplayType IN (0,1)),
    photoExtension TEXT NOT NULL,
    color INTEGER NOT NULL DEFAULT 1 CHECK(color IN(1,2,3,4,5,6,7,8,9)),
    photoShape INTEGER NOT NULL DEFAULT 1 CHECK(photoShape IN(1,2,3,4)),
	createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false)),
    CONSTRAINT fk_categoryUUId  
    FOREIGN KEY (categoryUUId)  
    REFERENCES Category(uuid), 
    CONSTRAINT fk_discountUUID  
    FOREIGN KEY (discountUUID)  
    REFERENCES Discount(uuid), 
    CONSTRAINT fk_unitId  
    FOREIGN KEY (unitId)  
    REFERENCES Unit(uuid)
);
CREATE TABLE ProductInModifier (
    productUUID TEXT NOT NULL,
    modifierUUID TEXT NOT NULL,
    CONSTRAINT fk_productUUID 
    FOREIGN KEY (productUUID)  
    REFERENCES Product(uuid), 
    CONSTRAINT fk_modifierUUID 
    FOREIGN KEY (modifierUUID)  
    REFERENCES Modifier(uuid)
);
CREATE TABLE ProductTax (
    productUUID TEXT NOT NULL,
    taxUUID TEXT NOT NULL,
    CONSTRAINT fk_productUUID 
    FOREIGN KEY (productUUID)  
    REFERENCES Product(uuid), 
    CONSTRAINT fk_taxUUID  
    FOREIGN KEY (taxUUID)  
    REFERENCES Tax(uuid)
);
CREATE TABLE SaleOrderItem (
    uuid TEXT NOT NULL PRIMARY KEY,
    saleOrderUUID TEXT NOT NULL,
    productUUID TEXT NOT NULL,
    itemName TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    refundedQuantity INTEGER NOT NULL DEFAULT 0,
    buyingPrice DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    modifiedPrice DECIMAL(10,2) NOT NULL,
    totalBuyingPrice DECIMAL(10,2) NOT NULL,
    totalModifiedPrice DECIMAL(10,2) NOT NULL,
    itemGrossPrice DECIMAL(10,2) NOT NULL,
    grossPrice DECIMAL(10,2) NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL,
    totalDiscount DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    totalTaxIncludedInPriceValue DECIMAL(10,2) NOT NULL,
    totalTaxExcludedInPriceValue DECIMAL(10,2) NOT NULL,
    totalTaxableValue DECIMAL(10,2) NOT NULL,
    totalTaxIPercentage DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    netPrice DECIMAL(10,2) NOT NULL,
    comment TEXT NULL,
    refundSalesOrderItemUUID TEXT NOT NULL,
    CONSTRAINT fk_saleOrderUUID
    FOREIGN KEY (saleOrderUUID)  
    REFERENCES SaleOrders(uuid),
    CONSTRAINT fk_productUUID
    FOREIGN KEY (productUUID)  
    REFERENCES Product(uuid),
    CONSTRAINT fk_refundSalesOrderItemUUID
    FOREIGN KEY (refundSalesOrderItemUUID)  
    REFERENCES RefundSalesOrderItem(uuid)
);
CREATE TABLE SaleOrderItemDiscounts (
    discountUUID TEXT NOT NULL,
    saleOrderItemUUID TEXT NOT NULL,
    discountPercentage DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    discountValue DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    percentage DECIMAL(10,2)  NULL DEFAULT 0.0,
    CONSTRAINT fk_discountUUID
    FOREIGN KEY (discountUUID)  
    REFERENCES Discounts(uuid),
    CONSTRAINT fk_saleOrderItemUUID
    FOREIGN KEY (saleOrderItemUUID)  
    REFERENCES SaleOrderItems(uuid)
);
CREATE TABLE SaleOrderItemTaxes (
    taxUUID TEXT NOT NULL,
    saleOrderItemUUID TEXT NOT NULL,
    approachType INTEGER NOT NULL DEFAULT 1 CHECK(approachType IN(1,2)),
    percentage DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    amount DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_taxUUID
    FOREIGN KEY (taxUUID)  
    REFERENCES Tax(uuid),
    CONSTRAINT fk_saleOrderItemUUID
    FOREIGN KEY (saleOrderItemUUID)  
    REFERENCES SaleOrderItems(uuid)
);
CREATE TABLE SaleOrderModifierItems (
    saleOrderItemUUID TEXT NOT NULL,
    modifierItemUUID TEXT NOT NULL,
    itemName TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    CONSTRAINT fk_saleOrderItemUUID
    FOREIGN KEY (saleOrderItemUUID)  
    REFERENCES SaleOrderItems(uuid),
    CONSTRAINT fk_modifierItemUUID
    FOREIGN KEY (modifierItemUUID)  
    REFERENCES ModifierItems(uuid)
);
CREATE TABLE SaleOrderOtherCharges (
    saleOrderUUID TEXT NOT NULL UNIQUE,
    otherChargesOnBillUUID TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    percentage DECIMAL(10,2) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_saleOrderUUID
    FOREIGN KEY (saleOrderUUID)  
    REFERENCES SaleOrder(uuid),
    CONSTRAINT fk_otherChargesOnBillUUID
    FOREIGN KEY (otherChargesOnBillUUID)  
    REFERENCES OtherChargesOnBill(uuid)
);
CREATE TABLE SaleOrderPayment (
    saleOrderUUID TEXT NOT NULL UNIQUE,
    paymentTypeUUID TEXT NOT NULL UNIQUE,
    paymentAmount DECIMAL(10,2) NOT NULL,
    paymentTotal DECIMAL(10,2) NOT NULL,
    paymentCharge DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_saleOrderUUID
    FOREIGN KEY (saleOrderUUID)  
    REFERENCES SaleOrder(uuid),
    CONSTRAINT fk_paymentTypeUUID
    FOREIGN KEY (paymentTypeUUID)  
    REFERENCES PaymentType(uuid)
);
CREATE TABLE SaleOrders (
    uuid TEXT NOT NULL PRIMARY KEY,
    customerUUID TEXT NOT NULL,
    receiptNumber TEXT NOT NULL UNIQUE,
    siftUUID TEXT NOT NULL,
    ticketUUID TEXT NOT NULL,
    title TEXT NOT NULL,
    noOfGuest INTEGER NOT NULL DEFAULT 0 ,
    diningOptionId INTEGER NULL,
    totalTax DECIMAL(10,2) NOT NULL DEFAULT 0,
    totalDiscount DECIMAL(10,2) NOT NULL DEFAULT 0,
    totalOtherCharges DECIMAL(10,2) NOT NULL DEFAULT 0,
    grossPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
    netPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
    channelType TEXT NOT NULL DEFAULT 'Desktop' CHECK(channelType IN ('Mobile App','Online','Order','Desktop','Tablet')),
    billType INTEGER NOT NULL CHECK(channelType IN (1,2,3)),
    status INTEGER NOT NULL DEFAULT 0 CHECK (status IN (1,2,3)),
    refundSalesOrderUUID TEXT NOT NULL,
    orderDate DATE NOT NULL,
    cancelDate DATE NOT NULL,
    note TEXT NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false)),
    percentage DECIMAL(10,2) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_customerUUID
    FOREIGN KEY (customerUUID)  
    REFERENCES Customers(uuid),
    CONSTRAINT fk_siftUUID
    FOREIGN KEY (siftUUID)  
    REFERENCES Shifts(uuid),
    CONSTRAINT fk_ticketUUID
    FOREIGN KEY (ticketUUID)  
    REFERENCES Tickets(uuid)
);
CREATE TABLE SaleOrderTickets (
    saleOrderUUID TEXT NOT NULL UNIQUE,
    ticketUUID TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    noOfGuest INTEGER DEFAULT 1 NOT NULL,
    CONSTRAINT fk_saleOrderUUID
    FOREIGN KEY (saleOrderUUID)  
    REFERENCES SaleOrder(uuid),
    CONSTRAINT fk_ticketUUID
    FOREIGN KEY (ticketUUID)  
    REFERENCES Tickets(uuid)
);
CREATE TABLE Settings (
    key TEXT NOT NULL,
    value TEXT NOT NULL
);
CREATE TABLE Shifts (
    uuid TEXT NOT NULL PRIMARY KEY,
    openingDateTime DATE NOT NULL,
    closingDateTime DATE NOT NULL,
    openingBalance DECIMAL(10,2) NOT NULL DEFAULT 0,
    closingBalance DECIMAL(10,2) NOT NULL DEFAULT 0,
    reason TEXT NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE Tax (
    uuid TEXT NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    name TEXT NOT NULL,
    approachType INTEGER NOT NULL DEFAULT 0 CHECK (approachType IN (0, 1)),
    percentage DECIMAL(10,2) NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false))
);
CREATE TABLE Ticket (
    uuid TEXT NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL DEFAULT  0 CHECK (isActive IN (0, 1)),
    ticketGroupUUID TEXT NOT NULL,
    name TEXT NULL,
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL,
    isSync BOOLEAN NOT NULL CHECK (isSync IN (true, false)),
    CONSTRAINT fk_ticketGroupUUID
    FOREIGN KEY (ticketGroupUUID)  
    REFERENCES TicketGroup(uuid)
);
CREATE TABLE Units (
    id INTEGER NOT NULL PRIMARY KEY,
    isActive INTEGER NOT NULL CHECK (isActive IN (0, 1)),
    name TEXT NOT NULL,
    isDefault INTEGER NOT NULL DEFAULT 0 CHECK (isDefault IN (0, 1)),
    createdDate DATE NOT NULL,
	modifiedDate DATE NOT NULL
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
