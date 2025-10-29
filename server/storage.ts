import { type Product, type InsertProduct, type CartItem, type InsertCartItem } from "@shared/schema";

export interface IStorage {
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  
  // Cart operations
  getCartItems(): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private cartItemIdCounter: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.cartItemIdCounter = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const mockProducts: Product[] = [
      { id: 1, name: "Wireless Headphones", price: "89.99", image: "/api/products/1/image", category: "Electronics" },
      { id: 2, name: "Leather Backpack", price: "129.99", image: "/api/products/2/image", category: "Accessories" },
      { id: 3, name: "Steel Water Bottle", price: "34.99", image: "/api/products/3/image", category: "Lifestyle" },
      { id: 4, name: "Classic Watch", price: "299.99", image: "/api/products/4/image", category: "Accessories" },
      { id: 5, name: "Smartphone Pro", price: "899.99", image: "/api/products/5/image", category: "Electronics" },
      { id: 6, name: "Vintage Camera", price: "179.99", image: "/api/products/6/image", category: "Electronics" },
      { id: 7, name: "Premium Yoga Mat", price: "49.99", image: "/api/products/7/image", category: "Lifestyle" },
      { id: 8, name: "Modern Desk Lamp", price: "64.99", image: "/api/products/8/image", category: "Home" },
    ];

    mockProducts.forEach(product => this.products.set(product.id, product));
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.productId === insertItem.productId
    );

    if (existingItem) {
      const updated: CartItem = {
        ...existingItem,
        quantity: existingItem.quantity + (insertItem.quantity || 1),
      };
      this.cartItems.set(existingItem.id, updated);
      return updated;
    }

    const newItem: CartItem = {
      id: this.cartItemIdCounter++,
      productId: insertItem.productId,
      quantity: insertItem.quantity || 1,
      createdAt: new Date(),
    };

    this.cartItems.set(newItem.id, newItem);
    return newItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    const updated: CartItem = { ...item, quantity };
    this.cartItems.set(id, updated);
    return updated;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }
}

export const storage = new MemStorage();
