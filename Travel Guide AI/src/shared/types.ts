import z from "zod";

export const DestinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  description: z.string().nullable(),
  currency_code: z.string().nullable(),
  timezone: z.string().nullable(),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const HotelSchema = z.object({
  id: z.number(),
  destination_id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price_per_night: z.number(),
  rating: z.number().nullable(),
  amenities: z.string().nullable(),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const AttractionSchema = z.object({
  id: z.number(),
  destination_id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  price: z.number().nullable(),
  rating: z.number().nullable(),
  opening_hours: z.string().nullable(),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const TransportationSchema = z.object({
  id: z.number(),
  destination_id: z.number(),
  type: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().nullable(),
  duration: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const PhraseSchema = z.object({
  id: z.number(),
  destination_id: z.number(),
  category: z.string(),
  english_text: z.string(),
  local_text: z.string(),
  pronunciation: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const TripPlanSchema = z.object({
  id: z.number(),
  destination_id: z.number(),
  budget: z.number(),
  duration_days: z.number(),
  total_estimated_cost: z.number().nullable(),
  itinerary: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Destination = z.infer<typeof DestinationSchema>;
export type Hotel = z.infer<typeof HotelSchema>;
export type Attraction = z.infer<typeof AttractionSchema>;
export type Transportation = z.infer<typeof TransportationSchema>;
export type Phrase = z.infer<typeof PhraseSchema>;
export type TripPlan = z.infer<typeof TripPlanSchema>;

export const CreateTripPlanSchema = z.object({
  destination_id: z.number(),
  budget: z.number().min(1),
  duration_days: z.number().min(1).max(30),
});

export type CreateTripPlan = z.infer<typeof CreateTripPlanSchema>;
