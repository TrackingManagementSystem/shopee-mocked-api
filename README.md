# Fake Shopee API

A Node.js API that mimics Shopee's v2 API endpoints for testing and development purposes.

## Features

- **v2.order.get_order_detail**: Returns fake order details with realistic data structure
- **v2.logistics.get_shipping_parameter**: Returns fake shipping parameters with pickup/dropoff options
- Realistic fake data generation with some nullable fields
- CORS enabled for frontend integration
- Ready for Vercel deployment

## Endpoints

### 1. Get Order Detail
```
GET /api/v2/order/get_order_detail?order_sn_list=ORDER1,ORDER2
```

**Query Parameters:**
- `order_sn_list`: Comma-separated list of order serial numbers

**Response:** Returns fake order details matching Shopee's API structure

### 2. Get Shipping Parameter
```
GET /api/v2/logistics/get_shipping_parameter?order_sn=ORDER1
```

**Query Parameters:**
- `order_sn`: Order serial number

**Response:** Returns fake shipping parameters with pickup/dropoff information

## Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **Test the endpoints:**
```bash
# Test order detail endpoint
curl "http://localhost:3000/api/v2/order/get_order_detail?order_sn_list=TEST001,TEST002"

# Test shipping parameter endpoint
curl "http://localhost:3000/api/v2/logistics/get_shipping_parameter?order_sn=TEST001"
```

## Deployment to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Or deploy via GitHub:**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically deploy

## Data Structure

The API generates realistic fake data including:

- **Order Details**: Complete order information with buyer details, items, shipping, payment info
- **Shipping Parameters**: Pickup addresses, dropoff branches, time slots, logistics options
- **Nullable Fields**: Some fields are randomly set to null to simulate real-world scenarios
- **Regional Data**: Supports multiple Southeast Asian regions (VN, TH, MY, SG, PH, ID, TW)

## Project Structure

```
fake-shopee-api/
├── package.json          # Project dependencies and scripts
├── vercel.json           # Vercel deployment configuration
├── index.js              # Main Express server
├── generators/
│   ├── orderGenerator.js     # Fake order data generator
│   └── shippingGenerator.js  # Fake shipping data generator
└── README.md             # This file
```

## Notes

- No authentication required (for testing purposes)
- Data is randomly generated on each request
- Some fields are intentionally set to null occasionally to match real API behavior
- Response structure matches official Shopee API documentation

