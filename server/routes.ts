import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Product image mapping
const productImages = {
  1: "Wireless_bluetooth_headphones_product_847bfee7.png",
  2: "Leather_backpack_product_photo_8724bc8c.png",
  3: "Stainless_steel_water_bottle_1104f109.png",
  4: "Luxury_analog_wristwatch_product_57ebaec4.png",
  5: "Modern_smartphone_product_photo_af04ce61.png",
  6: "Vintage_polaroid_camera_product_b3f6249b.png",
  7: "Premium_yoga_mat_product_2b981a36.png",
  8: "Modern_desk_lamp_product_b17f255f.png",
};

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/products - Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/products/:id/image - Serve product images
  app.get("/api/products/:id/image", (req, res) => {
    const productId = parseInt(req.params.id);
    const imageName = productImages[productId as keyof typeof productImages];
    
    if (!imageName) {
      return res.status(404).json({ error: "Product image not found" });
    }

    const imagePath = path.join(__dirname, "..", "attached_assets", "generated_images", imageName);
    res.sendFile(imagePath);
  });

  // GET /api/cart - Get cart items with product details
  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems();
      
      // Enrich cart items with product details
      const enrichedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product,
          };
        })
      );

      res.json(enrichedItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  // POST /api/cart - Add item to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const validation = insertCartItemSchema.safeParse(req.body);
      
      if (!validation.success) {
        const error = fromZodError(validation.error);
        return res.status(400).json({ error: error.message });
      }

      // Verify product exists
      const product = await storage.getProduct(validation.data.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const cartItem = await storage.addToCart(validation.data);
      
      // Return enriched cart item
      const enrichedItem = {
        ...cartItem,
        product,
      };

      res.status(201).json(enrichedItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  // PATCH /api/cart/:id - Update cart item quantity
  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }

      const updated = await storage.updateCartItemQuantity(id, quantity);
      
      if (!updated) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      const product = await storage.getProduct(updated.productId);
      const enrichedItem = {
        ...updated,
        product,
      };

      res.json(enrichedItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  // DELETE /api/cart/:id - Remove item from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const removed = await storage.removeFromCart(id);

      if (!removed) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  // POST /api/checkout - Process checkout
  app.post("/api/checkout", async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const cartItems = await storage.getCartItems();

      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Calculate total and get product details
      const items = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product,
          };
        })
      );

      const total = items.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + price * item.quantity;
      }, 0);

      // Create receipt
      const receipt = {
        orderId: `ORD-${Date.now()}`,
        timestamp: new Date().toISOString(),
        total,
        items,
        customerName: name,
        customerEmail: email,
      };

      // Clear cart after successful checkout
      await storage.clearCart();

      res.status(201).json(receipt);
    } catch (error) {
      console.error("Error processing checkout:", error);
      res.status(500).json({ error: "Failed to process checkout" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
