const express = require('express');
const cors = require('cors');
const { generateOrderDetail } = require('./generators/orderGenerator');
const { generateShippingParameter } = require('./generators/shippingGenerator');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Fake Shopee API is running',
    endpoints: [
      '/api/v2/order/get_order_detail',
      '/api/v2/logistics/get_shipping_parameter'
    ]
  });
});

// Fake v2.order.get_order_detail endpoint
app.get('/api/v2/order/get_order_detail', (req, res) => {
  try {
    const orderSnList = req.query.order_sn_list || '201214JAJXU6G7,201214JASXYXY6';
    const orderSns = orderSnList.split(',');
    
    const response = {
      request_id: generateRequestId(),
      error: "",
      message: "",
      response: {
        order_list: orderSns.map(orderSn => generateOrderDetail(orderSn.trim()))
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      request_id: generateRequestId(),
      error: "internal_error",
      message: "Internal server error",
      response: null
    });
  }
});

// Fake v2.logistics.get_shipping_parameter endpoint
app.get('/api/v2/logistics/get_shipping_parameter', (req, res) => {
  try {
    const orderSn = req.query.order_sn || '201214JAJXU6G7';
    
    const response = {
      request_id: generateRequestId(),
      error: "",
      message: "",
      response: generateShippingParameter(orderSn)
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      request_id: generateRequestId(),
      error: "internal_error",
      message: "Internal server error",
      response: null
    });
  }
});

// Helper function to generate request ID
function generateRequestId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Fake Shopee API server running on port ${port}`);
});

module.exports = app;

