function generateOrderDetail(orderSn) {
  const now = Math.floor(Date.now() / 1000);
  const regions = ['VN', 'TH', 'MY', 'SG', 'PH', 'ID', 'TW'];
  const currencies = ['VND', 'THB', 'MYR', 'SGD', 'PHP', 'IDR', 'TWD'];
  const orderStatuses = ['UNPAID', 'TO_SHIP', 'SHIPPED', 'TO_CONFIRM_RECEIVE', 'COMPLETED', 'CANCELLED', 'IN_CANCEL'];
  const paymentMethods = ['Bank Transfer', 'Credit Card', 'COD', 'ShopeePay', 'GrabPay'];
  const shippingCarriers = ['Standard Delivery', 'Express Delivery', 'Economy Delivery', 'J&T Express', 'Ninja Van'];
  
  const region = regions[Math.floor(Math.random() * regions.length)];
  const currency = currencies[regions.indexOf(region)];
  const orderStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
  
  // Sometimes return null for nullable fields
  const shouldBeNull = () => Math.random() < 0.3;
  
  return {
    order_sn: orderSn,
    region: region,
    currency: currency,
    cod: Math.random() < 0.2,
    total_amount: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
    pending_terms: shouldBeNull() ? null : ["SYSTEM_PENDING"],
    order_status: orderStatus,
    shipping_carrier: shouldBeNull() ? null : shippingCarriers[Math.floor(Math.random() * shippingCarriers.length)],
    payment_method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    estimated_shipping_fee: parseFloat((Math.random() * 20 + 2).toFixed(2)),
    message_to_seller: shouldBeNull() ? null : "Please pack carefully",
    create_time: now - Math.floor(Math.random() * 86400 * 7), // Within last 7 days
    update_time: now - Math.floor(Math.random() * 86400),
    days_to_ship: Math.floor(Math.random() * 5) + 1,
    ship_by_date: now + Math.floor(Math.random() * 86400 * 3),
    buyer_user_id: shouldBeNull() ? null : Math.floor(Math.random() * 10000000),
    buyer_username: shouldBeNull() ? "****" : generateRandomName(),
    recipient_address: generateRecipientAddress(region),
    actual_shipping_fee: shouldBeNull() ? null : parseFloat((Math.random() * 15 + 1).toFixed(2)),
    goods_to_declare: Math.random() < 0.1,
    note: shouldBeNull() ? null : "Handle with care",
    note_update_time: shouldBeNull() ? null : now - Math.floor(Math.random() * 86400),
    item_list: generateItemList(),
    pay_time: orderStatus === 'UNPAID' ? null : now - Math.floor(Math.random() * 86400 * 5),
    dropshipper: shouldBeNull() ? null : generateRandomName(),
    dropshipper_phone: shouldBeNull() ? null : generatePhoneNumber(),
    split_up: Math.random() < 0.1,
    buyer_cancel_reason: orderStatus === 'CANCELLED' ? "Changed mind" : null,
    cancel_by: orderStatus === 'CANCELLED' ? (Math.random() < 0.5 ? "BUYER" : "SELLER") : null,
    cancel_reason: orderStatus === 'CANCELLED' ? "Order cancelled" : null,
    actual_shipping_fee_confirmed: Math.random() < 0.8,
    buyer_cpf_id: shouldBeNull() ? null : generateCPF(),
    fulfillment_flag: shouldBeNull() ? null : "NORMAL",
    pickup_done_time: shouldBeNull() ? null : now - Math.floor(Math.random() * 86400 * 2),
    package_list: shouldBeNull() ? null : generatePackageList(),
    invoice_data: shouldBeNull() ? null : generateInvoiceData(),
    order_chargeable_weight_gram: Math.floor(Math.random() * 5000) + 100,
    return_request_due_date: shouldBeNull() ? null : now + Math.floor(Math.random() * 86400 * 30),
    edt: shouldBeNull() ? null : now + Math.floor(Math.random() * 86400 * 10),
    payment_info: shouldBeNull() ? null : generatePaymentInfo()
  };
}

function generateRecipientAddress(region) {
  const addresses = {
    'VN': { state: 'Ho Chi Minh', city: 'District 1', zipcode: '70000' },
    'TH': { state: 'Bangkok', city: 'Chatuchak', zipcode: '10900' },
    'MY': { state: 'Selangor', city: 'Petaling Jaya', zipcode: '47800' },
    'SG': { state: 'Singapore', city: 'Central', zipcode: '238873' },
    'PH': { state: 'Metro Manila', city: 'Makati', zipcode: '1200' },
    'ID': { state: 'Jakarta', city: 'Central Jakarta', zipcode: '10110' },
    'TW': { state: 'Taipei', city: 'Xinyi', zipcode: '110' }
  };
  
  const addr = addresses[region] || addresses['VN'];
  const shouldBeNull = () => Math.random() < 0.2;
  
  return {
    name: generateRandomName(),
    phone: generatePhoneNumber(),
    town: shouldBeNull() ? null : "Downtown",
    district: shouldBeNull() ? null : "Central District",
    city: addr.city,
    state: addr.state,
    region: region,
    zipcode: addr.zipcode,
    full_address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${addr.city}, ${addr.state}, ${addr.zipcode}`
  };
}

function generateItemList() {
  const itemCount = Math.floor(Math.random() * 3) + 1;
  const items = [];
  
  for (let i = 0; i < itemCount; i++) {
    const originalPrice = parseFloat((Math.random() * 200 + 10).toFixed(2));
    const discountedPrice = parseFloat((originalPrice * (0.7 + Math.random() * 0.3)).toFixed(2));
    
    items.push({
      item_id: Math.floor(Math.random() * 1000000000000000),
      item_name: generateItemName(),
      model_id: Math.floor(Math.random() * 1000000000000000),
      model_name: generateModelName(),
      model_quantity_purchased: Math.floor(Math.random() * 5) + 1,
      model_original_price: originalPrice,
      model_discounted_price: discountedPrice,
      wholesale_price: Math.random() < 0.3 ? parseFloat((discountedPrice * 0.8).toFixed(2)) : null,
      add_on_deal_id: Math.random() < 0.2 ? Math.floor(Math.random() * 1000000000000000) : 0,
      add_on_deal_main_item: Math.random() < 0.1,
      bundle_deal_id: Math.random() < 0.2 ? Math.floor(Math.random() * 1000000000000000) : 0,
      product_id: Math.floor(Math.random() * 1000000000000000),
      promotion_type: Math.random() < 0.3 ? ["BUNDLE_DEAL", "ADD_ON_DEAL", "WHOLESALE"][Math.floor(Math.random() * 3)] : "NONE",
      promotion_id: Math.random() < 0.3 ? Math.floor(Math.random() * 1000000000000000) : 0
    });
  }
  
  return items;
}

function generatePackageList() {
  return [{
    package_number: `PKG${Math.floor(Math.random() * 1000000000)}`,
    logistics_status: ["PICKUP_DONE", "PICKUP_RETRY", "DELIVERED", "PENDING"][Math.floor(Math.random() * 4)],
    shipping_carrier: "J&T Express",
    tracking_number: `JT${Math.floor(Math.random() * 1000000000000)}`,
    item_list: [{
      item_id: Math.floor(Math.random() * 1000000000000000),
      model_id: Math.floor(Math.random() * 1000000000000000),
      model_quantity_purchased: 1
    }],
    package_length: parseFloat((Math.random() * 50 + 10).toFixed(1)),
    package_width: parseFloat((Math.random() * 50 + 10).toFixed(1)),
    package_height: parseFloat((Math.random() * 30 + 5).toFixed(1)),
    package_weight: parseFloat((Math.random() * 5000 + 100).toFixed(0)),
    logistics_channel_id: Math.floor(Math.random() * 1000000000000000),
    logistics_channel_name: "Standard Delivery",
    shipping_fee: parseFloat((Math.random() * 20 + 2).toFixed(2)),
    actual_shipping_fee: parseFloat((Math.random() * 20 + 2).toFixed(2)),
    actual_shipping_fee_confirmed: true,
    warehouse_id: Math.random() < 0.3 ? null : `WH${Math.floor(Math.random() * 1000)}`,
    warehouse_code: Math.random() < 0.3 ? null : `WHC${Math.floor(Math.random() * 1000)}`,
    warehouse_name: Math.random() < 0.3 ? null : "Main Warehouse",
    warehouse_address: Math.random() < 0.3 ? null : "123 Warehouse St, Industrial Area",
    warehouse_phone: Math.random() < 0.3 ? null : generatePhoneNumber(),
    warehouse_region: Math.random() < 0.3 ? null : "VN",
    warehouse_city: Math.random() < 0.3 ? null : "Ho Chi Minh",
    warehouse_district: Math.random() < 0.3 ? null : "District 7",
    warehouse_town: Math.random() < 0.3 ? null : "Industrial Town",
    warehouse_zipcode: Math.random() < 0.3 ? null : "70000"
  }];
}

function generateInvoiceData() {
  return {
    invoice_number: `INV${Math.floor(Math.random() * 1000000000)}`,
    invoice_date: new Date().toISOString().split('T')[0],
    invoice_total_amount: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
    invoice_buyer_name: generateRandomName(),
    invoice_buyer_address: "123 Buyer Street, City",
    invoice_buyer_tax_number: Math.random() < 0.5 ? null : `TAX${Math.floor(Math.random() * 1000000000)}`,
    invoice_seller_name: "Shopee Seller Co.",
    invoice_seller_address: "456 Seller Avenue, Business District",
    invoice_seller_tax_number: `STAX${Math.floor(Math.random() * 1000000000)}`
  };
}

function generatePaymentInfo() {
  return {
    installment_plan_number: Math.random() < 0.7 ? null : Math.floor(Math.random() * 12) + 1,
    installment_plan_bank: Math.random() < 0.7 ? null : ["Bank A", "Bank B", "Bank C"][Math.floor(Math.random() * 3)],
    installment_plan_interest_rate: Math.random() < 0.7 ? null : parseFloat((Math.random() * 5).toFixed(2)),
    installment_plan_fee: Math.random() < 0.7 ? null : parseFloat((Math.random() * 50).toFixed(2)),
    installment_plan_total_amount: Math.random() < 0.7 ? null : parseFloat((Math.random() * 1000 + 100).toFixed(2)),
    credit_card_number: Math.random() < 0.8 ? null : `****-****-****-${Math.floor(Math.random() * 9000) + 1000}`,
    virtual_account_number: Math.random() < 0.8 ? null : `VA${Math.floor(Math.random() * 1000000000000)}`,
    pending_reason: Math.random() < 0.9 ? null : "Waiting for bank confirmation"
  };
}

function generateRandomName() {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Tom', 'Emma', 'Alex', 'Maria'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Taylor', 'Anderson', 'Thomas', 'Jackson'];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function generatePhoneNumber() {
  return `+${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 1000000000)}`;
}

function generateCPF() {
  return `${Math.floor(Math.random() * 900000000) + 100000000}-${Math.floor(Math.random() * 90) + 10}`;
}

function generateItemName() {
  const adjectives = ['Premium', 'Deluxe', 'Classic', 'Modern', 'Vintage', 'Professional'];
  const items = ['Smartphone', 'Laptop', 'Headphones', 'Watch', 'Bag', 'Shoes', 'Shirt', 'Dress'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${items[Math.floor(Math.random() * items.length)]}`;
}

function generateModelName() {
  const colors = ['Black', 'White', 'Blue', 'Red', 'Silver', 'Gold'];
  const sizes = ['S', 'M', 'L', 'XL', '32GB', '64GB', '128GB'];
  return `${colors[Math.floor(Math.random() * colors.length)]} - ${sizes[Math.floor(Math.random() * sizes.length)]}`;
}

module.exports = { generateOrderDetail };

