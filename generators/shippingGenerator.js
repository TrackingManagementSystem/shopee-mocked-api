function generateShippingParameter(orderSn) {
  const hasPickup = Math.random() < 0.6;
  const hasDropoff = Math.random() < 0.7;
  const hasNonIntegrated = Math.random() < 0.4;

  const infoNeeded = {
    dropoff: [],
    pickup: [],
    non_integrated: []
  };

  if (hasPickup) infoNeeded.pickup.push("address_id", "pickup_time_id");
  if (hasDropoff) infoNeeded.dropoff.push("branch_id");
  if (hasNonIntegrated) infoNeeded.non_integrated.push("tracking_no");
  if (Math.random() < 0.3) infoNeeded.pickup.push("sender_real_name");

  return {
    order_sn: orderSn,
    info_needed: infoNeeded,
    dropoff: hasDropoff ? generateDropoffInfo() : null,
    pickup: hasPickup ? generatePickupInfo() : null,
    non_integrated: hasNonIntegrated ? generateNonIntegratedInfo() : null
  };
}

function generateDropoffInfo() {
  const shouldBeNull = () => Math.random() < 0.2;
  const branchCount = Math.floor(Math.random() * 5) + 1;
  const branches = [];
  
  for (let i = 0; i < branchCount; i++) {
    branches.push({
      branch_id: Math.floor(Math.random() * 10000) + 1000,
      region: ["VN", "TH", "MY", "SG", "PH", "ID"][Math.floor(Math.random() * 6)],
      state: generateState(),
      city: generateCity(),
      address: generateAddress(),
      zipcode: generateZipcode(),
      district: shouldBeNull() ? null : generateDistrict(),
      town: shouldBeNull() ? null : generateTown()
    });
  }
  
  const slugs = Math.random() < 0.4 ? generateSlugs() : null;
  
  return {
    branch_list: branches,
    slug: slugs
  };
}

function generatePickupInfo() {
  const shouldBeNull = () => Math.random() < 0.2;
  const addressCount = Math.floor(Math.random() * 3) + 1;
  const addresses = [];
  const flags = ["default_address", "pickup_address", "return_address", "current_address"];

  for (let i = 0; i < addressCount; i++) {
    const addressId = Math.floor(Math.random() * 10000) + 1000;

    // escolher de 1 até todas as flags
    const shuffled = flags.sort(() => 0.5 - Math.random());
    const selectedFlags = shuffled.slice(0, Math.floor(Math.random() * flags.length) + 1);

    addresses.push({
      address_id: addressId,
      region: ["VN", "TH", "MY", "SG", "PH", "ID"][Math.floor(Math.random() * 6)],
      state: generateState(),
      city: generateCity(),
      district: shouldBeNull() ? null : generateDistrict(),
      town: shouldBeNull() ? null : generateTown(),
      address: generateAddress(),
      zipcode: generateZipcode(),
      address_flag: selectedFlags, // agora é array
      pickup_time_list: generatePickupTimeList(addressId)
    });
  }

  return {
    address_list: addresses
  };
}

function generatePickupTimeList(addressId) {
  const timeSlotCount = Math.floor(Math.random() * 8) + 2;
  const timeSlots = [];
  const baseTime = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
  
  for (let i = 0; i < timeSlotCount; i++) {
    const timeSlot = {
      date: baseTime + (i * 86400), // Each day
      time_text: shouldBeNull() ? null : generateTimeText(),
      pickup_time_id: `${addressId}_${i + 1}`,
      is_recommended: i === 0 ? "recommended" : null
    };
    timeSlots.push(timeSlot);
  }
  
  return timeSlots;
}

function generateNonIntegratedInfo() {
  return {
    tracking_no: Math.random() < 0.5 ? `TRK${Math.floor(Math.random() * 1000000000000)}` : null
  };
}

function generateSlugs() {
  const slugCount = Math.floor(Math.random() * 3) + 1;
  const slugs = [];
  const partners = ["partner-a", "partner-b", "partner-c", "express-delivery", "standard-logistics"];
  
  for (let i = 0; i < slugCount; i++) {
    slugs.push(partners[Math.floor(Math.random() * partners.length)]);
  }
  
  return slugs;
}

function generateState() {
  const states = [
    "Ho Chi Minh", "Hanoi", "Da Nang", // Vietnam
    "Bangkok", "Chiang Mai", "Phuket", // Thailand
    "Selangor", "Kuala Lumpur", "Penang", // Malaysia
    "Singapore", // Singapore
    "Metro Manila", "Cebu", "Davao", // Philippines
    "Jakarta", "Surabaya", "Bandung" // Indonesia
  ];
  return states[Math.floor(Math.random() * states.length)];
}

function generateCity() {
  const cities = [
    "District 1", "District 7", "Binh Thanh", // Vietnam
    "Chatuchak", "Sukhumvit", "Silom", // Thailand
    "Petaling Jaya", "Shah Alam", "Subang Jaya", // Malaysia
    "Central", "Orchard", "Marina Bay", // Singapore
    "Makati", "Quezon City", "Taguig", // Philippines
    "Central Jakarta", "South Jakarta", "West Jakarta" // Indonesia
  ];
  return cities[Math.floor(Math.random() * cities.length)];
}

function generateDistrict() {
  const districts = [
    "Central District", "Business District", "Residential District",
    "Commercial Area", "Industrial Zone", "Shopping District"
  ];
  return districts[Math.floor(Math.random() * districts.length)];
}

function generateTown() {
  const towns = [
    "Downtown", "Uptown", "Midtown", "Old Town", "New Town",
    "Riverside", "Hillside", "Lakeside", "Parkside"
  ];
  return towns[Math.floor(Math.random() * towns.length)];
}

function generateAddress() {
  const streetNumbers = Math.floor(Math.random() * 999) + 1;
  const streetNames = [
    "Main Street", "First Avenue", "Second Street", "Park Road",
    "Business Boulevard", "Commerce Drive", "Industrial Way",
    "Shopping Center", "Market Street", "Central Plaza"
  ];
  return `${streetNumbers} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`;
}

function generateZipcode() {
  return String(Math.floor(Math.random() * 90000) + 10000);
}

function generateTimeText() {
  const hours = Math.floor(Math.random() * 12) + 8; // 8 AM to 7 PM
  const periods = ["AM", "PM"];
  const period = hours > 12 ? "PM" : "AM";
  const displayHour = hours > 12 ? hours - 12 : hours;
  
  return `${displayHour}:00 ${period} - ${displayHour + 1}:00 ${period}`;
}

function shouldBeNull() {
  return Math.random() < 0.3;
}

module.exports = { generateShippingParameter };

