import { type User, type InsertUser, type ParkingSpot, type InsertParkingSpot, type Booking, type InsertBooking, type WalletTransaction, type InsertWalletTransaction, type UserWallet, type InsertUserWallet, type Vehicle, type InsertVehicle, type VendorProfile, type InsertVendorProfile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Vehicle operations
  getVehiclesByUserId(userId: string): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | undefined>;

  // Parking spot operations
  getAllParkingSpots(): Promise<ParkingSpot[]>;
  getParkingSpotsWithFilters(query?: string, city?: string): Promise<ParkingSpot[]>;
  getParkingSpot(id: string): Promise<ParkingSpot | undefined>;
  createParkingSpot(spot: InsertParkingSpot): Promise<ParkingSpot>;
  updateParkingSpot(id: string, updates: Partial<ParkingSpot>): Promise<ParkingSpot | undefined>;

  // Booking operations
  getBookingsByUserId(userId: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined>;

  // Wallet operations
  getUserWallet(userId: string): Promise<UserWallet | undefined>;
  createUserWallet(wallet: InsertUserWallet): Promise<UserWallet>;
  updateWalletBalance(userId: string, amount: number): Promise<UserWallet | undefined>;
  getWalletTransactionsByUserId(userId: string): Promise<WalletTransaction[]>;
  createWalletTransaction(transaction: InsertWalletTransaction): Promise<WalletTransaction>;

  // Vendor operations
  getVendorProfile(userId: string): Promise<VendorProfile | undefined>;
  createVendorProfile(profile: InsertVendorProfile): Promise<VendorProfile>;
  updateVendorProfile(userId: string, updates: Partial<VendorProfile>): Promise<VendorProfile | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vehicles: Map<string, Vehicle>;
  private parkingSpots: Map<string, ParkingSpot>;
  private bookings: Map<string, Booking>;
  private walletTransactions: Map<string, WalletTransaction>;
  private userWallets: Map<string, UserWallet>;
  private vendorProfiles: Map<string, VendorProfile>;

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.parkingSpots = new Map();
    this.bookings = new Map();
    this.walletTransactions = new Map();
    this.userWallets = new Map();
    this.vendorProfiles = new Map();
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Create sample parking spots
    const sampleSpots: ParkingSpot[] = [
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
        createdAt: new Date(),
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
        createdAt: new Date(),
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
        createdAt: new Date(),
      }
    ];

    sampleSpots.forEach(spot => {
      this.parkingSpots.set(spot.id, spot);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      fullName: insertUser.fullName || null,
      email: insertUser.email || null,
      phone: insertUser.phone || null,
      userType: insertUser.userType || "user"
    };
    this.users.set(id, user);
    
    // Create default wallet for new user
    await this.createUserWallet({ userId: id, balance: 0 });
    
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Vehicle operations
  async getVehiclesByUserId(userId: string): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values()).filter(vehicle => vehicle.userId === userId);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = randomUUID();
    const vehicle: Vehicle = { 
      ...insertVehicle, 
      id,
      vehicleNumber: insertVehicle.vehicleNumber || null,
      rcUploaded: insertVehicle.rcUploaded || null
    };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) return undefined;
    
    const updatedVehicle = { ...vehicle, ...updates };
    this.vehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }

  // Parking spot operations
  async getAllParkingSpots(): Promise<ParkingSpot[]> {
    return Array.from(this.parkingSpots.values()).filter(spot => spot.isActive);
  }

  async getParkingSpotsWithFilters(query?: string, city?: string): Promise<ParkingSpot[]> {
    let spots = Array.from(this.parkingSpots.values()).filter(spot => spot.isActive);
    
    if (query) {
      spots = spots.filter(spot => 
        spot.name.toLowerCase().includes(query.toLowerCase()) ||
        spot.address.toLowerCase().includes(query.toLowerCase()) ||
        spot.spotType.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (city) {
      spots = spots.filter(spot => spot.city.toLowerCase() === city.toLowerCase());
    }
    
    return spots;
  }

  async getParkingSpot(id: string): Promise<ParkingSpot | undefined> {
    return this.parkingSpots.get(id);
  }

  async createParkingSpot(insertSpot: InsertParkingSpot): Promise<ParkingSpot> {
    const id = randomUUID();
    const spot: ParkingSpot = { 
      ...insertSpot, 
      id, 
      createdAt: new Date(),
      latitude: insertSpot.latitude || null,
      longitude: insertSpot.longitude || null,
      rating: insertSpot.rating || "0.0",
      reviews: insertSpot.reviews || 0,
      viewers: insertSpot.viewers || 0,
      amenities: insertSpot.amenities || null,
      isActive: insertSpot.isActive !== undefined ? insertSpot.isActive : true
    };
    this.parkingSpots.set(id, spot);
    return spot;
  }

  async updateParkingSpot(id: string, updates: Partial<ParkingSpot>): Promise<ParkingSpot | undefined> {
    const spot = this.parkingSpots.get(id);
    if (!spot) return undefined;
    
    const updatedSpot = { ...spot, ...updates };
    this.parkingSpots.set(id, updatedSpot);
    return updatedSpot;
  }

  // Booking operations
  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(booking => booking.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      status: insertBooking.status || "confirmed",
      vehicleSpot: insertBooking.vehicleSpot || null,
      hostContact: insertBooking.hostContact || null
    };
    this.bookings.set(id, booking);
    
    // Create wallet transaction for booking payment
    await this.createWalletTransaction({
      userId: booking.userId,
      type: "debit",
      amount: booking.amount,
      description: `Parking booking - ${booking.id}`,
      status: "completed",
      relatedBookingId: booking.id,
      paymentMethod: null
    });
    
    // Update wallet balance
    await this.updateWalletBalance(booking.userId, -booking.amount);
    
    return booking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, ...updates };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Wallet operations
  async getUserWallet(userId: string): Promise<UserWallet | undefined> {
    return Array.from(this.userWallets.values()).find(wallet => wallet.userId === userId);
  }

  async createUserWallet(insertWallet: InsertUserWallet): Promise<UserWallet> {
    const id = randomUUID();
    const wallet: UserWallet = { 
      ...insertWallet, 
      id, 
      updatedAt: new Date(),
      balance: insertWallet.balance || 0
    };
    this.userWallets.set(id, wallet);
    return wallet;
  }

  async updateWalletBalance(userId: string, amount: number): Promise<UserWallet | undefined> {
    const wallet = Array.from(this.userWallets.values()).find(w => w.userId === userId);
    if (!wallet) return undefined;
    
    const updatedWallet = { ...wallet, balance: wallet.balance + amount, updatedAt: new Date() };
    this.userWallets.set(wallet.id, updatedWallet);
    return updatedWallet;
  }

  async getWalletTransactionsByUserId(userId: string): Promise<WalletTransaction[]> {
    return Array.from(this.walletTransactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createWalletTransaction(insertTransaction: InsertWalletTransaction): Promise<WalletTransaction> {
    const id = randomUUID();
    const transaction: WalletTransaction = { 
      ...insertTransaction, 
      id, 
      createdAt: new Date(),
      status: insertTransaction.status || "completed",
      relatedBookingId: insertTransaction.relatedBookingId || null,
      paymentMethod: insertTransaction.paymentMethod || null
    };
    this.walletTransactions.set(id, transaction);
    return transaction;
  }

  // Vendor operations
  async getVendorProfile(userId: string): Promise<VendorProfile | undefined> {
    return Array.from(this.vendorProfiles.values()).find(profile => profile.userId === userId);
  }

  async createVendorProfile(insertProfile: InsertVendorProfile): Promise<VendorProfile> {
    const id = randomUUID();
    const profile: VendorProfile = { 
      ...insertProfile, 
      id, 
      createdAt: new Date(),
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

  async updateVendorProfile(userId: string, updates: Partial<VendorProfile>): Promise<VendorProfile | undefined> {
    const profile = Array.from(this.vendorProfiles.values()).find(p => p.userId === userId);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...updates };
    this.vendorProfiles.set(profile.id, updatedProfile);
    return updatedProfile;
  }
}

export const storage = new MemStorage();
