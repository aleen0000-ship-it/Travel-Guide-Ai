import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { 
  CreateTripPlanSchema
} from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

// Get all destinations
app.get("/api/destinations", async (c) => {
  const db = c.env.DB;
  const destinations = await db.prepare("SELECT * FROM destinations ORDER BY name").all();
  return c.json(destinations.results);
});

// Get hotels for a destination
app.get("/api/destinations/:id/hotels", async (c) => {
  const db = c.env.DB;
  const destinationId = parseInt(c.req.param("id"));
  const budget = c.req.query("budget");
  
  let query = "SELECT * FROM hotels WHERE destination_id = ?";
  const params = [destinationId];
  
  if (budget) {
    query += " AND price_per_night <= ?";
    params.push(parseFloat(budget));
  }
  
  query += " ORDER BY rating DESC, price_per_night ASC";
  
  const hotels = await db.prepare(query).bind(...params).all();
  return c.json(hotels.results);
});

// Get attractions for a destination
app.get("/api/destinations/:id/attractions", async (c) => {
  const db = c.env.DB;
  const destinationId = parseInt(c.req.param("id"));
  const attractions = await db.prepare(
    "SELECT * FROM attractions WHERE destination_id = ? ORDER BY rating DESC"
  ).bind(destinationId).all();
  return c.json(attractions.results);
});

// Get transportation for a destination
app.get("/api/destinations/:id/transportation", async (c) => {
  const db = c.env.DB;
  const destinationId = parseInt(c.req.param("id"));
  const transportation = await db.prepare(
    "SELECT * FROM transportation WHERE destination_id = ? ORDER BY type, price ASC"
  ).bind(destinationId).all();
  return c.json(transportation.results);
});

// Get phrases for a destination
app.get("/api/destinations/:id/phrases", async (c) => {
  const db = c.env.DB;
  const destinationId = parseInt(c.req.param("id"));
  const phrases = await db.prepare(
    "SELECT * FROM phrases WHERE destination_id = ? ORDER BY category, english_text"
  ).bind(destinationId).all();
  return c.json(phrases.results);
});

// Create trip plan
app.post("/api/trip-plans", zValidator("json", CreateTripPlanSchema), async (c) => {
  const db = c.env.DB;
  const { destination_id, budget, duration_days } = c.req.valid("json");
  
  // Get destination info
  const destination = await db.prepare("SELECT * FROM destinations WHERE id = ?").bind(destination_id).first();
  if (!destination) {
    return c.json({ error: "Destination not found" }, 404);
  }
  
  // Get recommended hotels within budget
  const hotels = await db.prepare(
    "SELECT * FROM hotels WHERE destination_id = ? AND price_per_night <= ? ORDER BY rating DESC LIMIT 3"
  ).bind(destination_id, budget / duration_days * 0.4).all(); // 40% of daily budget for accommodation
  
  // Get top attractions
  const attractions = await db.prepare(
    "SELECT * FROM attractions WHERE destination_id = ? ORDER BY rating DESC LIMIT 5"
  ).bind(destination_id).all();
  
  // Generate simple itinerary
  const itinerary = generateItinerary(duration_days, attractions.results, hotels.results);
  
  // Calculate estimated cost
  const avgHotelCost = hotels.results.length > 0 ? 
    hotels.results.reduce((sum: number, h: any) => sum + h.price_per_night, 0) / hotels.results.length : 
    budget / duration_days * 0.4;
  const totalEstimatedCost = avgHotelCost * duration_days + (budget / duration_days * 0.6) * duration_days;
  
  // Insert trip plan
  const result = await db.prepare(
    "INSERT INTO trip_plans (destination_id, budget, duration_days, total_estimated_cost, itinerary) VALUES (?, ?, ?, ?, ?)"
  ).bind(destination_id, budget, duration_days, totalEstimatedCost, JSON.stringify(itinerary)).run();
  
  const tripPlan = await db.prepare("SELECT * FROM trip_plans WHERE id = ?").bind(result.meta.last_row_id).first();
  
  return c.json(tripPlan);
});

// Currency conversion endpoint (using a simple mock for now)
app.get("/api/currency/:from/:to/:amount", async (c) => {
  const from = c.req.param("from");
  const to = c.req.param("to");
  const amount = parseFloat(c.req.param("amount"));
  
  // Mock exchange rates - in a real app, you'd use a currency API
  const exchangeRates: Record<string, Record<string, number>> = {
    "USD": { "EUR": 0.85, "GBP": 0.73, "JPY": 110, "USD": 1 },
    "EUR": { "USD": 1.18, "GBP": 0.86, "JPY": 129, "EUR": 1 },
    "GBP": { "USD": 1.37, "EUR": 1.16, "JPY": 150, "GBP": 1 },
    "JPY": { "USD": 0.009, "EUR": 0.0078, "GBP": 0.0067, "JPY": 1 }
  };
  
  const rate = exchangeRates[from]?.[to] || 1;
  const convertedAmount = amount * rate;
  
  return c.json({
    from,
    to,
    original_amount: amount,
    converted_amount: convertedAmount,
    exchange_rate: rate
  });
});

function generateItinerary(days: number, attractions: any[], hotels: any[]) {
  const itinerary = [];
  const attractionsPerDay = Math.ceil(attractions.length / days);
  
  for (let day = 1; day <= days; day++) {
    const dayAttractions = attractions.slice((day - 1) * attractionsPerDay, day * attractionsPerDay);
    itinerary.push({
      day,
      activities: [
        "Morning: Breakfast at hotel",
        ...dayAttractions.map((a: any) => `Visit ${a.name} - ${a.description || 'Explore this attraction'}`),
        "Evening: Local dining experience"
      ],
      accommodation: hotels[0]?.name || "Budget accommodation"
    });
  }
  
  return itinerary;
}

export default app;
