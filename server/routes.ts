import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertParkingSpotSchema, 
  insertBookingSchema, 
  insertWalletTransactionSchema,
  insertVehicleSchema,
  insertVendorProfileSchema,
  insertUserSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Helper function for error handling
  const handleError = (res: any, error: any, message = "Internal server error") => {
    console.error(error);
    return res.status(500).json({ error: message });
  };

  // Helper function for validation errors
  const handleValidationError = (res: any, error: any) => {
    const validationError = fromZodError(error);
    return res.status(400).json({ error: validationError.message });
  };

  // ========================================
  // PARKING SPOTS ROUTES
  // ========================================
  
  // Get all parking spots with optional filters
  app.get("/api/spots", async (req, res) => {
    try {
      const { query, city } = req.query;
      const spots = await storage.getParkingSpotsWithFilters(
        query as string, 
        city as string
      );
      res.json(spots);
    } catch (error) {
      handleError(res, error, "Failed to fetch parking spots");
    }
  });

  // Get single parking spot
  app.get("/api/spots/:id", async (req, res) => {
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

  // Create new parking spot (vendor only)
  app.post("/api/spots", async (req, res) => {
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

  // Update parking spot
  app.patch("/api/spots/:id", async (req, res) => {
    try {
      const updates = req.body;
      
      // Basic validation for critical fields
      if (updates.availableSpots !== undefined && (updates.availableSpots < 0 || !Number.isInteger(updates.availableSpots))) {
        return res.status(400).json({ error: "Available spots must be a non-negative integer" });
      }
      if (updates.totalSpots !== undefined && (updates.totalSpots <= 0 || !Number.isInteger(updates.totalSpots))) {
        return res.status(400).json({ error: "Total spots must be a positive integer" });
      }
      if (updates.pricePerHour !== undefined && (updates.pricePerHour <= 0 || !Number.isInteger(updates.pricePerHour))) {
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

  // ========================================
  // BOOKINGS ROUTES
  // ========================================

  // Get user's bookings
  app.get("/api/bookings/user/:userId", async (req, res) => {
    try {
      const bookings = await storage.getBookingsByUserId(req.params.userId);
      res.json(bookings);
    } catch (error) {
      handleError(res, error, "Failed to fetch bookings");
    }
  });

  // Get single booking
  app.get("/api/bookings/:id", async (req, res) => {
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

  // Create new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Check spot availability and get spot details
      const spot = await storage.getParkingSpot(validatedData.spotId);
      if (!spot || spot.availableSpots <= 0) {
        return res.status(400).json({ error: "Parking spot not available" });
      }

      // Calculate server-side booking amount with fees (security: don't trust client)
      const baseAmount = spot.pricePerHour * validatedData.duration;
      const platformFee = 10;
      const gst = Math.round((baseAmount + platformFee) * 0.18);
      const calculatedAmount = baseAmount + platformFee + gst;
      
      // Validate that client-provided amount matches server calculation
      if (validatedData.amount !== calculatedAmount) {
        return res.status(400).json({ 
          error: "Invalid booking amount", 
          expected: calculatedAmount,
          provided: validatedData.amount 
        });
      }

      // Only check wallet balance if payment method is wallet
      let wallet;
      if (validatedData.paymentMethod === 'wallet') {
        wallet = await storage.getUserWallet(validatedData.userId);
        if (!wallet || wallet.balance < calculatedAmount) {
          return res.status(400).json({ error: "Insufficient wallet balance" });
        }
      }

      // Get or create a default vehicle for the user (demo purposes)
      let userVehicles = await storage.getVehiclesByUserId(validatedData.userId);
      let vehicleId: string;
      
      if (userVehicles.length === 0) {
        // Create a default vehicle for demo purposes
        const defaultVehicle = await storage.createVehicle({
          userId: validatedData.userId,
          vehicleType: 'Car',
          vehicleNumber: 'DEMO-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          rcUploaded: false
        });
        vehicleId = defaultVehicle.id;
      } else {
        vehicleId = userVehicles[0].id;
      }

      // Create booking atomically with payment deduction
      const booking = await storage.createBooking({
        ...validatedData,
        vehicleId, // Use the vehicleId we found/created
        amount: calculatedAmount, // Use server-calculated amount, not client-provided
        startTime: new Date(validatedData.startTime), // Convert string to Date
        endTime: new Date(validatedData.endTime) // Convert string to Date
      });
      
      // Update spot availability
      await storage.updateParkingSpot(validatedData.spotId, {
        availableSpots: spot.availableSpots - 1
      });

      // Only debit wallet and create transaction if payment method is wallet
      if (validatedData.paymentMethod === 'wallet' && wallet) {
        // Debit wallet and create transaction record
        await storage.createWalletTransaction({
          userId: validatedData.userId,
          type: 'debit',
          amount: calculatedAmount,
          description: `Parking booking at ${spot.name}`,
          status: 'completed',
          relatedBookingId: booking.id,
          paymentMethod: 'wallet'
        });

        // Update wallet balance
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

  // Update booking status
  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const updates = req.body;
      
      // Validate status transitions
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

  // ========================================
  // WALLET ROUTES
  // ========================================

  // Get user wallet
  app.get("/api/wallet/:userId", async (req, res) => {
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

  // Get wallet transactions
  app.get("/api/wallet/:userId/transactions", async (req, res) => {
    try {
      const transactions = await storage.getWalletTransactionsByUserId(req.params.userId);
      res.json(transactions);
    } catch (error) {
      handleError(res, error, "Failed to fetch transactions");
    }
  });

  // Add money to wallet
  app.post("/api/wallet/:userId/add-money", async (req, res) => {
    try {
      const { amount, paymentMethod } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      // Create credit transaction
      const transaction = await storage.createWalletTransaction({
        userId: req.params.userId,
        type: "credit",
        amount,
        description: "Wallet top-up",
        status: "completed",
        paymentMethod: paymentMethod || "UPI"
      });

      // Update wallet balance
      const updatedWallet = await storage.updateWalletBalance(req.params.userId, amount);

      res.json({ transaction, wallet: updatedWallet });
    } catch (error) {
      handleError(res, error, "Failed to add money to wallet");
    }
  });

  // ========================================
  // USER & VEHICLE ROUTES
  // ========================================

  // Get user vehicles
  app.get("/api/users/:userId/vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getVehiclesByUserId(req.params.userId);
      res.json(vehicles);
    } catch (error) {
      handleError(res, error, "Failed to fetch vehicles");
    }
  });

  // Add user vehicle
  app.post("/api/users/:userId/vehicles", async (req, res) => {
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

  // Update vehicle
  app.patch("/api/vehicles/:id", async (req, res) => {
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

  // ========================================
  // VENDOR ROUTES
  // ========================================

  // Get vendor profile
  app.get("/api/vendors/:userId/profile", async (req, res) => {
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

  // Create vendor profile
  app.post("/api/vendors/:userId/profile", async (req, res) => {
    try {
      const profileData = { ...req.body, userId: req.params.userId };
      const validatedData = insertVendorProfileSchema.parse(profileData);
      const profile = await storage.createVendorProfile(validatedData);
      
      // Update user type to vendor
      await storage.updateUser(req.params.userId, { userType: "vendor" });
      
      res.status(201).json(profile);
    } catch (error) {
      if (error.name === "ZodError") {
        return handleValidationError(res, error);
      }
      handleError(res, error, "Failed to create vendor profile");
    }
  });

  // Update vendor profile
  app.patch("/api/vendors/:userId/profile", async (req, res) => {
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

  // ========================================
  // USER AUTHENTICATION ROUTES
  // ========================================

  // User registration endpoint
  app.post("/api/users/register", async (req, res) => {
    try {
      const { name, email, phone, vehicleType, vehicleNumber, isVerified } = req.body;
      
      // Create user with generated username
      const username = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const userData = {
        username,
        password: "demo123", // Demo password
        fullName: name,
        email: email || `${username}@smartpark.com`,
        phone: phone || `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        userType: "user" as const
      };

      const user = await storage.createUser(userData);
      
      // Create vehicle if provided
      if (vehicleType) {
        await storage.createVehicle({
          userId: user.id,
          vehicleType,
          vehicleNumber: vehicleNumber || `DEMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          rcUploaded: isVerified || false
        });
      }

      // Create wallet for user
      await storage.createWalletTransaction({
        userId: user.id,
        type: "credit",
        amount: 100, // Welcome bonus
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

  // Vendor registration endpoint
  app.post("/api/vendors/register", async (req, res) => {
    try {
      const { name, email, phone, businessType, propertyType, carSlots, bikeSlots, carHourlyRate, bikeHourlyRate, accountNumber, ifscCode, upiId } = req.body;
      
      // Create user with generated username
      const username = `vendor_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const userData = {
        username,
        password: "demo123", // Demo password
        fullName: name,
        email: email || `${username}@smartpark.com`,
        phone: phone || `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        userType: "vendor" as const
      };

      const user = await storage.createUser(userData);
      
      // Create vendor profile
      await storage.createVendorProfile({
        userId: user.id,
        businessType: businessType || "Individual",
        businessName: `${name}'s Parking`,
        gstNumber: null,
        panNumber: null,
        bankAccountNumber: accountNumber || "DEMO123456789",
        ifscCode: ifscCode || "DEMO0001234"
      });

      // Create a demo parking spot for the vendor
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

  // Create user (registration)
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }

      const user = await storage.createUser(validatedData);
      
      // Remove password from response
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      if (error.name === "ZodError") {
        return handleValidationError(res, error);
      }
      handleError(res, error, "Failed to create user");
    }
  });

  // Get user profile
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Remove password from response
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      handleError(res, error, "Failed to fetch user");
    }
  });

  // Update user profile
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      // Security: only allow safe field updates
      const allowedFields = ['fullName', 'email', 'phone'];
      const safeUpdates = Object.keys(updates)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {} as any);
      
      const updatedUser = await storage.updateUser(req.params.id, safeUpdates);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Remove password from response
      const { password, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      handleError(res, error, "Failed to update user");
    }
  });

  // ========================================
  // ANALYTICS & STATS ROUTES
  // ========================================

  // Get dashboard stats
  app.get("/api/stats/:userId", async (req, res) => {
    try {
      const [bookings, wallet, vehicles] = await Promise.all([
        storage.getBookingsByUserId(req.params.userId),
        storage.getUserWallet(req.params.userId),
        storage.getVehiclesByUserId(req.params.userId)
      ]);

      const stats = {
        totalBookings: bookings.length,
        activeBookings: bookings.filter(b => b.status === 'active').length,
        walletBalance: wallet?.balance || 0,
        totalVehicles: vehicles.length
      };

      res.json(stats);
    } catch (error) {
      handleError(res, error, "Failed to fetch stats");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
