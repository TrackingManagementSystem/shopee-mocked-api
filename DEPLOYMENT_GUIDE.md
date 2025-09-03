# Fake Shopee API - Deployment Guide

## Project Overview

Your fake Shopee API is complete and ready for deployment! The API successfully mimics two Shopee endpoints:

1. **v2.order.get_order_detail** - Returns realistic fake order data
2. **v2.logistics.get_shipping_parameter** - Returns fake shipping parameters

## Project Structure

```
fake-shopee-api/
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel deployment config
├── index.js                  # Main Express server
├── generators/
│   ├── orderGenerator.js     # Fake order data generator
│   └── shippingGenerator.js  # Fake shipping data generator
└── README.md                 # Project documentation
```

## Local Testing Results ✅

The API has been successfully tested locally:

- **Root endpoint**: `GET /` - Returns API status and available endpoints
- **Order endpoint**: `GET /api/v2/order/get_order_detail?order_sn_list=TEST001,TEST002`
- **Shipping endpoint**: `GET /api/v2/logistics/get_shipping_parameter?order_sn=TEST001`

All endpoints return realistic fake data with proper JSON structure matching Shopee's API documentation.

## GitHub Setup Instructions

1. **Create a new GitHub repository** (e.g., `fake-shopee-api`)

2. **Upload all project files** to your repository:
   - Extract the project files from the provided archive
   - Initialize git and push to your new repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Shopee Mocked API"
   git branch -M main
   git remote add origin https://github.com/TrackingManagementSystem/shopee-mocked-api.git
   git push -u origin main
   ```

## Vercel Deployment Instructions

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in and click "New Project"
   - Import your GitHub repository

2. **Configure Deployment**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (not needed for Node.js API)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

3. **Environment Variables**: None required (the API works without authentication)

4. **Deploy**: Click "Deploy" - Vercel will automatically detect the Node.js project and deploy it

## API Endpoints (After Deployment)

Your deployed API will have these endpoints:

```
GET https://your-project.vercel.app/
GET https://your-project.vercel.app/api/v2/order/get_order_detail?order_sn_list=ORDER1,ORDER2
GET https://your-project.vercel.app/api/v2/logistics/get_shipping_parameter?order_sn=ORDER1
```

## Features Implemented ✅

- **Realistic Data Generation**: Complex nested JSON structures matching Shopee API
- **Nullable Fields**: Some fields randomly set to null (30% chance) as requested
- **No Validation**: API accepts any input without validation as requested
- **CORS Enabled**: Ready for frontend integration
- **Regional Support**: Multiple Southeast Asian regions (VN, TH, MY, SG, PH, ID, TW)
- **Vercel Ready**: Configured with proper `vercel.json` for seamless deployment

## Testing Your Deployed API

After deployment, test with:

```bash
# Test order endpoint
curl "https://your-project.vercel.app/api/v2/order/get_order_detail?order_sn_list=TEST001,TEST002"

# Test shipping endpoint  
curl "https://your-project.vercel.app/api/v2/logistics/get_shipping_parameter?order_sn=TEST001"
```

## Notes

- The API generates different fake data on each request
- No authentication required (perfect for testing)
- Response structures match official Shopee API documentation
- Ready for immediate use in your development/testing workflows

Your fake Shopee API is production-ready and will be live on Vercel within minutes of deployment! 🚀

