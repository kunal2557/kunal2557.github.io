// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  vehicles;
  parkingSpots;
  bookings;
  walletTransactions;
  userWallets;
  vendorProfiles;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.vehicles = /* @__PURE__ */ new Map();
    this.parkingSpots = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.walletTransactions = /* @__PURE__ */ new Map();
    this.userWallets = /* @__PURE__ */ new Map();
    this.vendorProfiles = /* @__PURE__ */ new Map();
    this.initializeSampleData();
  }
  async initializeSampleData() {
    const sampleSpots = [
      {
        id: "spot-1",
        vendorId: "vendor-1",
        name: "Premium Spot - CP",
        address: "Connaught Place, New Delhi",
        city: "Delhi",
        latitude: "28.6315",
        longitude: "77.2167",
        spotType: "premium",
        pricePerHour: 45,
        totalSpots: 20,
        availableSpots: 5,
        rating: "4.8",
        reviews: 124,
        viewers: 3,
        amenities: ["CCTV", "Security", "Covered"],
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: "spot-2",
        vendorId: "vendor-2",
        name: "Saver Parking",
        address: "Sector 18, Noida",
        city: "Noida",
        latitude: "28.5709",
        longitude: "77.3261",
        spotType: "saver",
        pricePerHour: 25,
        totalSpots: 15,
        availableSpots: 2,
        rating: "4.2",
        reviews: 67,
        viewers: 8,
        amenities: ["Open Air", "Security"],
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: "spot-3",
        vendorId: "vendor-3",
        name: "Mall Parking - DLF",
        address: "DLF Phase 1, Gurgaon",
        city: "Gurgaon",
        latitude: "28.4595",
        longitude: "77.0266",
        spotType: "suggested",
        pricePerHour: 35,
        totalSpots: 30,
        availableSpots: 12,
        rating: "4.6",
        reviews: 89,
        viewers: 2,
        amenities: ["Mall Access", "Food Court", "CCTV"],
        isActive: true,
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    sampleSpots.forEach((spot) => {
      this.parkingSpots.set(spot.id, spot);
    });
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      fullName: insertUser.fullName || null,
      email: insertUser.email || null,
      phone: insertUser.phone || null,
      userType: insertUser.userType || "user"
    };
    this.users.set(id, user);
    await this.createUserWallet({ userId: id, balance: 0 });
    return user;
  }
  async updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) return void 0;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  // Vehicle operations
  async getVehiclesByUserId(userId) {
    return Array.from(this.vehicles.values()).filter((vehicle) => vehicle.userId === userId);
  }
  async createVehicle(insertVehicle) {
    const id = randomUUID();
    const vehicle = {
      ...insertVehicle,
      id,
      vehicleNumber: insertVehicle.vehicleNumber || null,
      rcUploaded: insertVehicle.rcUploaded || null
    };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }
  async updateVehicle(id, updates) {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) return void 0;
    const updatedVehicle = { ...vehicle, ...updates };
    this.vehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }
  // Parking spot operations
  async getAllParkingSpots() {
    return Array.from(this.parkingSpots.values()).filter((spot) => spot.isActive);
  }
  async getParkingSpotsWithFilters(query, city) {
    let spots = Array.from(this.parkingSpots.values()).filter((spot) => spot.isActive);
    if (query) {
      spots = spots.filter(
        (spot) => spot.name.toLowerCase().includes(query.toLowerCase()) || spot.address.toLowerCase().includes(query.toLowerCase()) || spot.spotType.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (city) {
      spots = spots.filter((spot) => spot.city.toLowerCase() === city.toLowerCase());
    }
    return spots;
  }
  async getParkingSpot(id) {
    return this.parkingSpots.get(id);
  }
  async createParkingSpot(insertSpot) {
    const id = randomUUID();
    const spot = {
      ...insertSpot,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      latitude: insertSpot.latitude || null,
      longitude: insertSpot.longitude || null,
      rating: insertSpot.rating || "0.0",
      reviews: insertSpot.reviews || 0,
      viewers: insertSpot.viewers || 0,
      amenities: insertSpot.amenities || null,
      isActive: insertSpot.isActive !== void 0 ? insertSpot.isActive : true
    };
    this.parkingSpots.set(id, spot);
    return spot;
  }
  async updateParkingSpot(id, updates) {
    const spot = this.parkingSpots.get(id);
    if (!spot) return void 0;
    const updatedSpot = { ...spot, ...updates };
    this.parkingSpots.set(id, updatedSpot);
    return updatedSpot;
  }
  // Booking operations
  async getBookingsByUserId(userId) {
    return Array.from(this.bookings.values()).filter((booking) => booking.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async createBooking(insertBooking) {
    const id = randomUUID();
    const booking = {
      ...insertBooking,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      status: insertBooking.status || "confirmed",
      vehicleSpot: insertBooking.vehicleSpot || null,
      hostContact: insertBooking.hostContact || null
    };
    this.bookings.set(id, booking);
    await this.createWalletTransaction({
      userId: booking.userId,
      type: "debit",
      amount: booking.amount,
      description: `Parking booking - ${booking.id}`,
      status: "completed",
      relatedBookingId: booking.id,
      paymentMethod: null
    });
    await this.updateWalletBalance(booking.userId, -booking.amount);
    return booking;
  }
  async updateBooking(id, updates) {
    const booking = this.bookings.get(id);
    if (!booking) return void 0;
    const updatedBooking = { ...booking, ...updates };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  // Wallet operations
  async getUserWallet(userId) {
    return Array.from(this.userWallets.values()).find((wallet) => wallet.userId === userId);
  }
  async createUserWallet(insertWallet) {
    const id = randomUUID();
    const wallet = {
      ...insertWallet,
      id,
      updatedAt: /* @__PURE__ */ new Date(),
      balance: insertWallet.balance || 0
    };
    this.userWallets.set(id, wallet);
    return wallet;
  }
  async updateWalletBalance(userId, amount) {
    const wallet = Array.from(this.userWallets.values()).find((w) => w.userId === userId);
    if (!wallet) return void 0;
    const updatedWallet = { ...wallet, balance: wallet.balance + amount, updatedAt: /* @__PURE__ */ new Date() };
    this.userWallets.set(wallet.id, updatedWallet);
    return updatedWallet;
  }
  async getWalletTransactionsByUserId(userId) {
    return Array.from(this.walletTransactions.values()).filter((transaction) => transaction.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createWalletTransaction(insertTransaction) {
    const id = randomUUID();
    const transaction = {
      ...insertTransaction,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      status: insertTransaction.status || "completed",
      relatedBookingId: insertTransaction.relatedBookingId || null,
      paymentMethod: insertTransaction.paymentMethod || null
    };
    this.walletTransactions.set(id, transaction);
    return transaction;
  }
  // Vendor operations
  async getVendorProfile(userId) {
    return Array.from(this.vendorProfiles.values()).find((profile) => profile.userId === userId);
  }
  async createVendorProfile(insertProfile) {
    const id = randomUUID();
    const profile = {
      ...insertProfile,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      businessName: insertProfile.businessName || null,
      panNumber: insertProfile.panNumber || null,
      gstNumber: insertProfile.gstNumber || null,
      bankAccountNumber: insertProfile.bankAccountNumber || null,
      ifscCode: insertProfile.ifscCode || null,
      documentsUploaded: insertProfile.documentsUploaded || null,
      isVerified: insertProfile.isVerified || null
    };
    this.vendorProfiles.set(id, profile);
    return profile;
  }
  async updateVendorProfile(userId, updates) {
    const profile = Array.from(this.vendorProfiles.values()).find((p) => p.userId === userId);
    if (!profile) return void 0;
    const updatedProfile = { ...profile, ...updates };
    this.vendorProfiles.set(profile.id, updatedProfile);
    return updatedProfile;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  phone: text("phone"),
  userType: text("user_type", { enum: ["user", "vendor"] }).notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow()
});
var vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  vehicleType: text("vehicle_type", { enum: ["Car", "Two-Wheeler", "SUV", "Truck"] }).notNull(),
  vehicleNumber: text("vehicle_number"),
  rcUploaded: boolean("rc_uploaded").default(false)
});
var parkingSpots = pgTable("parking_spots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vendorId: varchar("vendor_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  spotType: text("spot_type", { enum: ["premium", "saver", "suggested"] }).notNull(),
  pricePerHour: integer("price_per_hour").notNull(),
  totalSpots: integer("total_spots").notNull(),
  availableSpots: integer("available_spots").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviews: integer("reviews").default(0),
  viewers: integer("viewers").default(0),
  amenities: text("amenities").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  spotId: varchar("spot_id").notNull().references(() => parkingSpots.id),
  vehicleId: varchar("vehicle_id").notNull().references(() => vehicles.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  duration: integer("duration").notNull(),
  // in hours
  amount: integer("amount").notNull(),
  status: text("status", { enum: ["confirmed", "active", "completed", "cancelled"] }).notNull().default("confirmed"),
  vehicleSpot: text("vehicle_spot"),
  hostContact: text("host_contact"),
  createdAt: timestamp("created_at").defaultNow()
});
var walletTransactions = pgTable("wallet_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: text("type", { enum: ["credit", "debit"] }).notNull(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  status: text("status", { enum: ["pending", "completed", "failed"] }).notNull().default("completed"),
  relatedBookingId: varchar("related_booking_id").references(() => bookings.id),
  paymentMethod: text("payment_method"),
  createdAt: timestamp("created_at").defaultNow()
});
var userWallets = pgTable("user_wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  balance: integer("balance").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow()
});
var vendorProfiles = pgTable("vendor_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  businessType: text("business_type").notNull(),
  businessName: text("business_name"),
  panNumber: text("pan_number"),
  gstNumber: text("gst_number"),
  bankAccountNumber: text("bank_account_number"),
  ifscCode: text("ifsc_code"),
  documentsUploaded: boolean("documents_uploaded").default(false),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true
});
var insertParkingSpotSchema = createInsertSchema(parkingSpots).omit({
  id: true,
  createdAt: true
});
var insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true
});
var insertWalletTransactionSchema = createInsertSchema(walletTransactions).omit({
  id: true,
  createdAt: true
});
var insertUserWalletSchema = createInsertSchema(userWallets).omit({
  id: true,
  updatedAt: true
});
var insertVendorProfileSchema = createInsertSchema(vendorProfiles).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  const handleError = (res, error, message = "Internal server error") => {
    console.error(error);
    return res.status(500).json({ error: message });
  };
  const handleValidationError = (res, error) => {
    const validationError = fromZodError(error);
    return res.status(400).json({ error: validationError.message });
  };
  app2.get("/api/spots", async (req, res) => {
    try {
      const { query, city } = req.query;
      const spots = await storage.getParkingSpotsWithFilters(
        query,
        city
      );
      res.json(spots);
    } catch (error) {
      handleError(res, error, "Failed to fetch parking spots");
    }
  });
  app2.get("/api/spots/:id", async (req, res) => {
    try {
      const spot = await storage.getParkingSpot(req.params.id);
      if (!spot) {
        return res.status(404).json({ error: "Parking spot not found" });
      }
      res.json(spot);
    } catch (error) {
      handleError(res, error, "Failed to fetch parking spot");
    }
  });
  app2.post("/api/spots", async (req, res) => {
    try {
      const validatedData = insertParkingSpotSchema.parse(req.body);
      const spot = await storage.createParkingSpot(validatedData);
      res.status(201).json(spot);
    } catch (error) {
      if (error.name === "ZodError") {
        return handleValidationError(res, error);
      }
      handleError(res, error, "Failed to create parking spot");
    }
  });
  app2.patch("/api/spots/:id", async (req, res) => {
    try {
      const updates = req.body;
      if (updates.availableSpots !== void 0 && (updates.availableSpots < 0 || !Number.isInteger(updates.availableSpots))) {
        return res.status(400).json({ error: "Available spots must be a non-negative integer" });
      }
      if (updates.totalSpots !== void 0 && (updates.totalSpots <= 0 || !Number.isInteger(updates.totalSpots))) {
        return res.status(400).json({ error: "Total spots must be a positive integer" });
      }
      if (updates.pricePerHour !== void 0 && (updates.pricePerHour <= 0 || !Number.isInteger(updates.pricePerHour))) {
        return res.status(400).json({ error: "Price per hour must be a positive integer" });
      }
      const updatedSpot = await storage.updateParkingSpot(req.params.id, updates);
      if (!updatedSpot) {
        return res.status(404).json({ error: "Parking spot not found" });
      }
      res.json(updatedSpot);
    } catch (error) {
      handleError(res, error, "Failed to update parking spot");
    }
  });
  app2.get("/api/bookings/user/:userId", async (req, res) => {
    try {
      const bookings2 = await storage.getBookingsByUserId(req.params.userId);
      res.json(bookings2);
    } catch (error) {
      handleError(res, error, "Failed to fetch bookings");
    }
  });
  app2.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      handleError(res, error, "Failed to fetch booking");
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const spot = await storage.getParkingSpot(validatedData.spotId);
      if (!spot || spot.availableSpots <= 0) {
        return res.status(400).json({ error: "Parking spot not available" });
      }
      const baseAmount = spot.pricePerHour * validatedData.duration;
      const platformFee = 10;
      const gst = Math.round((baseAmount + platformFee) * 0.18);
      const calculatedAmount = baseAmount + platformFee + gst;
      if (validatedData.amount !== calculatedAmount) {
        return res.status(400).json({
          error: "Invalid booking amount",
          expected: calculatedAmount,
          provided: validatedData.amount
        });
      }
      let wallet;
      if (validatedData.paymentMethod === "wallet") {
        wallet = await storage.getUserWallet(validatedData.userId);
        if (!wallet || wallet.balance < calculatedAmount) {
          return res.status(400).json({ error: "Insufficient wallet balance" });
        }
      }
      let userVehicles = await storage.getVehiclesByUserId(validatedData.userId);
      let vehicleId;
      if (userVehicles.length === 0) {
        const defaultVehicle = await storage.createVehicle({
          userId: validatedData.userId,
          vehicleType: "Car",
          vehicleNumber: "DEMO-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          rcUploaded: false
        });
        vehicleId = defaultVehicle.id;
      } else {
        vehicleId = userVehicles[0].id;
      }
      const booking = await storage.createBooking({
        ...validatedData,
        vehicleId,
        // Use the vehicleId we found/created
        amount: calculatedAmount,
        // Use server-calculated amount, not client-provided
        startTime: new Date(validatedData.startTime),
        // Convert string to Date
        endTime: new Date(validatedData.endTime)
        // Convert string to Date
      });
      await storage.updateParkingSpot(validatedData.spotId, {
        availableSpots: spot.availableSpots - 1
      });
      if (validatedData.paymentMethod === "wallet" && wallet) {
        await storage.createWalletTransaction({
          userId: validatedData.userId,
          type: "debit",
          amount: calculatedAmount,
          description: `Parking booking at ${spot.name}`,
          status: "completed",
          relatedBookingId: booking.id,
          paymentMethod: "wallet"
        });
        await storage.updateWalletBalance(validatedData.userId, wallet.balance - calculatedAmount);
      }
      res.status(201).json(booking);
    } catch (error) {
      if (error.name === "ZodError") {
        return handleValidationError(res, error);
      }
      handleError(res, error, "Failed to create booking");
    }
  });
  app2.patch("/api/bookings/:id", async (req, res) => {
    try {
      const updates = req.body;
      if (updates.status && !["confirmed", "active", "completed", "cancelled"].includes(updates.status)) {
        return res.status(400).json({ error: "Invalid booking status" });
      }
      const updatedBooking = await storage.updateBooking(req.params.id, updates);
      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(updatedBooking);
    } catch (error) {
      handleError(res, error, "Failed to update booking");
    }
  });
  app2.get("/api/wallet/:userId", async (req, res) => {
    try {
      const wallet = await storage.getUserWallet(req.params.userId);
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }
      res.json(wallet);
    } catch (error) {
      handleError(res, error, "Failed to fetch wallet");
    }
  });
  app2.get("/api/wallet/:userId/transactions", async (req, res) => {
    try {
      const transactions = await storage.getWalletTransactionsByUserId(req.params.userId);
      res.json(transactions);
    } catch (error) {
      handleError(res, error, "Failed to fetch transactions");
    }
  });
  app2.post("/api/wallet/:userId/add-money", async (req, res) => {
    try {
      const { amount, paymentMethod } = req.body;
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      const transaction = await storage.createWalletTransaction({
        userId: req.params.userId,
        type: "credit",
        amount,
        description: "Wallet top-up",
        status: "completed",
        paymentMethod: paymentMethod || "UPI"
      });
      const updatedWallet = await storage.updateWalletBalance(req.params.userId, amount);
      res.json({ transaction, wallet: updatedWallet });
    } catch (error) {
      handleError(res, error, "Failed to add money to wallet");
    }
  });
  app2.get("/api/users/:userId/vehicles", async (req, res) => {
    try {
      const vehicles2 = await storage.getVehiclesByUserId(req.params.userId);
      res.json(vehicles2);
    } catch (error) {
      handleError(res, error, "Failed to fetch vehicles");
    }
  });
  app2.post("/api/users/:userId/vehicles", async (req, res) => {
    try {
      const vehicleData = { ...req.body, userId: req.params.userId };
      const validatedData = insertVehicleSchema.parse(vehicleData);
      const vehicle = await storage.createVehicle(validatedData);
      res.status(201).json(vehicle);
    } catch (error) {
      if (error.name === "ZodError") {
        return handleValidationError(res, error);
      }
      handleError(res, error, "Failed to add vehicle");
    }
  });
  app2.patch("/api/vehicles/:id", async (req, res) => {
    try {
      const updates = req.body;
      const updatedVehicle = await storage.updateVehicle(req.params.id, updates);
      if (!updatedVehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.json(updatedVehicle);
    } catch (error) {
      handleError(res, error, "Failed to update vehicle");
    }
  });
  app2.get("/api/vendors/:userId/profile", async (req, res) => {
    try {
      const profile = await storage.getVendorProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Vendor profile not found" });
      }
      res.json(profile);
    } catch (error) {
      handleError(res, error, "Failed to fetch vendor profile");
    }
  });
  app2.post("/api/vendors/:userId/profile", async (req, res) => {
    try {
      const profileData = { ...req.body, userId: req.params.userId };
      const validatedData = insertVendorProfileSchema.parse(profileData);
      const profile = await storage.createVendorProfile(validatedData);
      await storage.updateUser(req.params.userId, { userType: "vendor" });
      res.status(201).json(profile);
    } catch (error) {
      if (error.name === "ZodError") {
        return handleValidationError(res, error);
      }
      handleError(res, error, "Failed to create vendor profile");
    }
  });
  app2.patch("/api/vendors/:userId/profile", async (req, res) => {
    try {
      const updates = req.body;
      const updatedProfile = await storage.updateVendorProfile(req.params.userId, updates);
      if (!updatedProfile) {
        return res.status(404).json({ error: "Vendor profile not found" });
      }
      res.json(updatedProfile);
    } catch (error) {
      handleError(res, error, "Failed to update vendor profile");
    }
  });
  app2.post("/api/users/register", async (req, res) => {
    try {
      const { name, email, phone, vehicleType, vehicleNumber, isVerified } = req.body;
      const username = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const userData = {
        username,
        password: "demo123",
        // Demo password
        fullName: name,
        email: email || `${username}@smartpark.com`,
        phone: phone || `+91${Math.floor(Math.random() * 9e9) + 1e9}`,
        userType: "user"
      };
      const user = await storage.createUser(userData);
      if (vehicleType) {
        await storage.createVehicle({
          userId: user.id,
          vehicleType,
          vehicleNumber: vehicleNumber || `DEMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          rcUploaded: isVerified || false
        });
      }
      await storage.createWalletTransaction({
        userId: user.id,
        type: "credit",
        amount: 100,
        // Welcome bonus
        description: "Welcome bonus",
        status: "completed",
        paymentMethod: "system"
      });
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      handleError(res, error, "Failed to register user");
    }
  });
  app2.post("/api/vendors/register", async (req, res) => {
    try {
      const { name, email, phone, businessType, propertyType, carSlots, bikeSlots, carHourlyRate, bikeHourlyRate, accountNumber, ifscCode, upiId } = req.body;
      const username = `vendor_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const userData = {
        username,
        password: "demo123",
        // Demo password
        fullName: name,
        email: email || `${username}@smartpark.com`,
        phone: phone || `+91${Math.floor(Math.random() * 9e9) + 1e9}`,
        userType: "vendor"
      };
      const user = await storage.createUser(userData);
      await storage.createVendorProfile({
        userId: user.id,
        businessType: businessType || "Individual",
        businessName: `${name}'s Parking`,
        gstNumber: null,
        panNumber: null,
        bankAccountNumber: accountNumber || "DEMO123456789",
        ifscCode: ifscCode || "DEMO0001234"
      });
      if (carSlots > 0 || bikeSlots > 0) {
        await storage.createParkingSpot({
          vendorId: user.id,
          name: `${name}'s Parking Space`,
          address: "Demo Location, City",
          city: "Mumbai",
          latitude: "19.0760",
          longitude: "72.8777",
          totalSpots: (carSlots || 0) + (bikeSlots || 0),
          availableSpots: (carSlots || 0) + (bikeSlots || 0),
          pricePerHour: carHourlyRate || 20,
          amenities: ["CCTV", "Security"],
          images: [],
          isActive: true,
          rating: 4.5,
          reviewCount: 10
        });
      }
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      handleError(res, error, "Failed to register vendor");
    }
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      const user = await storage.createUser(validatedData);
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      if (error.name === "ZodError") {
        return handleValidationError(res, error);
      }
      handleError(res, error, "Failed to create user");
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      handleError(res, error, "Failed to fetch user");
    }
  });
  app2.patch("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const allowedFields = ["fullName", "email", "phone"];
      const safeUpdates = Object.keys(updates).filter((key) => allowedFields.includes(key)).reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});
      const updatedUser = await storage.updateUser(req.params.id, safeUpdates);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      handleError(res, error, "Failed to update user");
    }
  });
  app2.get("/api/stats/:userId", async (req, res) => {
    try {
      const [bookings2, wallet, vehicles2] = await Promise.all([
        storage.getBookingsByUserId(req.params.userId),
        storage.getUserWallet(req.params.userId),
        storage.getVehiclesByUserId(req.params.userId)
      ]);
      const stats = {
        totalBookings: bookings2.length,
        activeBookings: bookings2.filter((b) => b.status === "active").length,
        walletBalance: wallet?.balance || 0,
        totalVehicles: vehicles2.length
      };
      res.json(stats);
    } catch (error) {
      handleError(res, error, "Failed to fetch stats");
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "8080", 10);
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
