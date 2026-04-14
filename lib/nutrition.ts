// Big 9 Allergens detection
export const BIG_9_ALLERGENS = [
  "milk",
  "eggs",
  "fish",
  "shellfish",
  "tree nuts",
  "peanuts",
  "wheat",
  "soybeans",
  "sesame",
] as const;

export type Allergen = typeof BIG_9_ALLERGENS[number];

// Keyword mapping for allergen detection
const ALLERGEN_KEYWORDS: Record<Allergen, string[]> = {
  milk: ["milk", "cheese", "butter", "cream", "yogurt", "whey", "casein", "lactose", "ghee", "paneer", "custard", "ice cream", "lactalbumin"],
  eggs: ["egg", "eggs", "mayonnaise", "meringue", "aioli", "hollandaise", "eggnog", "albumin"],
  fish: ["fish", "salmon", "tuna", "cod", "tilapia", "bass", "trout", "anchovy", "anchovies", "sardine", "mackerel", "herring", "flounder", "halibut"],
  shellfish: ["shellfish", "shrimp", "crab", "lobster", "crawfish", "crayfish", "prawn", "scallop", "clam", "mussel", "oyster", "squid", "calamari", "octopus"],
  "tree nuts": ["almond", "almonds", "cashew", "cashews", "walnut", "walnuts", "pecan", "pecans", "pistachio", "pistachios", "hazelnut", "hazelnuts", "macadamia", "brazil nut", "chestnut", "pine nut"],
  peanuts: ["peanut", "peanuts", "groundnut", "arachis oil"],
  wheat: ["wheat", "flour", "bread", "pasta", "noodle", "spaghetti", "macaroni", "couscous", "semolina", "durum", "triticale", "spelt", "kamut", "farina", "bread crumb"],
  soybeans: ["soy", "soybean", "soya", "edamame", "tofu", "tempeh", "miso", "soy sauce", "tamari"],
  sesame: ["sesame", "tahini", "halvah", "sesame oil", "sesame seed"],
};

export function detectAllergens(ingredientList: string): Allergen[] {
  const lower = ingredientList.toLowerCase();
  const found: Allergen[] = [];

  for (const [allergen, keywords] of Object.entries(ALLERGEN_KEYWORDS)) {
    for (const keyword of keywords) {
      // Use word boundary matching to avoid false positives
      const regex = new RegExp(`\\b${keyword.replace(/\s+/g, "\\s+")}\\b`, "i");
      if (regex.test(lower)) {
        found.push(allergen as Allergen);
        break;
      }
    }
  }

  return [...new Set(found)]; // dedupe
}

// Simple nutrition estimation (mock USDA-like data for common ingredients)
interface NutritionData {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbs: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
}

const KNOWN_INGREDIENTS: Record<string, { per100g: NutritionData; defaultGrams: number }> = {
  "chicken breast": { per100g: { calories: 165, totalFat: 3.6, saturatedFat: 1, cholesterol: 85, sodium: 74, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 31 }, defaultGrams: 150 },
  "chicken": { per100g: { calories: 165, totalFat: 3.6, saturatedFat: 1, cholesterol: 85, sodium: 74, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 31 }, defaultGrams: 150 },
  "rice": { per100g: { calories: 130, totalFat: 0.3, saturatedFat: 0.1, cholesterol: 0, sodium: 1, totalCarbs: 28, dietaryFiber: 0.4, sugars: 0, protein: 2.7 }, defaultGrams: 180 },
  "white rice": { per100g: { calories: 130, totalFat: 0.3, saturatedFat: 0.1, cholesterol: 0, sodium: 1, totalCarbs: 28, dietaryFiber: 0.4, sugars: 0, protein: 2.7 }, defaultGrams: 180 },
  "pasta": { per100g: { calories: 131, totalFat: 1.1, saturatedFat: 0.2, cholesterol: 0, sodium: 1, totalCarbs: 25, dietaryFiber: 1.8, sugars: 0.6, protein: 5 }, defaultGrams: 200 },
  "flour": { per100g: { calories: 364, totalFat: 1, saturatedFat: 0.2, cholesterol: 0, sodium: 2, totalCarbs: 76, dietaryFiber: 2.7, sugars: 0.3, protein: 10 }, defaultGrams: 125 },
  "olive oil": { per100g: { calories: 884, totalFat: 100, saturatedFat: 14, cholesterol: 0, sodium: 2, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 0 }, defaultGrams: 15 },
  "butter": { per100g: { calories: 717, totalFat: 81, saturatedFat: 51, cholesterol: 215, sodium: 11, totalCarbs: 0.1, dietaryFiber: 0, sugars: 0.1, protein: 0.9 }, defaultGrams: 14 },
  "sugar": { per100g: { calories: 387, totalFat: 0, saturatedFat: 0, cholesterol: 0, sodium: 1, totalCarbs: 100, dietaryFiber: 0, sugars: 100, protein: 0 }, defaultGrams: 20 },
  "eggs": { per100g: { calories: 155, totalFat: 11, saturatedFat: 3.3, cholesterol: 373, sodium: 124, totalCarbs: 1.1, dietaryFiber: 0, sugars: 1.1, protein: 13 }, defaultGrams: 100 },
  "egg": { per100g: { calories: 155, totalFat: 11, saturatedFat: 3.3, cholesterol: 373, sodium: 124, totalCarbs: 1.1, dietaryFiber: 0, sugars: 1.1, protein: 13 }, defaultGrams: 50 },
  "milk": { per100g: { calories: 42, totalFat: 1, saturatedFat: 0.6, cholesterol: 3, sodium: 44, totalCarbs: 5, dietaryFiber: 0, sugars: 5, protein: 3.4 }, defaultGrams: 240 },
  "salt": { per100g: { calories: 0, totalFat: 0, saturatedFat: 0, cholesterol: 0, sodium: 38760, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 0 }, defaultGrams: 5 },
  "tomato": { per100g: { calories: 18, totalFat: 0.2, saturatedFat: 0, cholesterol: 0, sodium: 5, totalCarbs: 3.9, dietaryFiber: 1.2, sugars: 2.6, protein: 0.9 }, defaultGrams: 150 },
  "tomatoes": { per100g: { calories: 18, totalFat: 0.2, saturatedFat: 0, cholesterol: 0, sodium: 5, totalCarbs: 3.9, dietaryFiber: 1.2, sugars: 2.6, protein: 0.9 }, defaultGrams: 150 },
  "onion": { per100g: { calories: 40, totalFat: 0.1, saturatedFat: 0, cholesterol: 0, sodium: 4, totalCarbs: 9.3, dietaryFiber: 1.7, sugars: 4.2, protein: 1.1 }, defaultGrams: 120 },
  "garlic": { per100g: { calories: 149, totalFat: 0.7, saturatedFat: 0.1, cholesterol: 0, sodium: 17, totalCarbs: 33, dietaryFiber: 2.1, sugars: 1, protein: 6.4 }, defaultGrams: 10 },
  "beef": { per100g: { calories: 250, totalFat: 15, saturatedFat: 6, cholesterol: 80, sodium: 66, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 26 }, defaultGrams: 200 },
  "pork": { per100g: { calories: 242, totalFat: 14, saturatedFat: 5, cholesterol: 80, sodium: 62, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 27 }, defaultGrams: 200 },
  "salmon": { per100g: { calories: 208, totalFat: 13, saturatedFat: 3, cholesterol: 55, sodium: 59, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 20 }, defaultGrams: 180 },
  "shrimp": { per100g: { calories: 99, totalFat: 0.3, saturatedFat: 0.1, cholesterol: 189, sodium: 111, totalCarbs: 0.2, dietaryFiber: 0, sugars: 0, protein: 24 }, defaultGrams: 100 },
  "soy sauce": { per100g: { calories: 53, totalFat: 0.1, saturatedFat: 0, cholesterol: 0, sodium: 5493, totalCarbs: 4.9, dietaryFiber: 0.8, sugars: 0.4, protein: 8.1 }, defaultGrams: 15 },
  "bread": { per100g: { calories: 265, totalFat: 3.2, saturatedFat: 0.7, cholesterol: 0, sodium: 491, totalCarbs: 49, dietaryFiber: 2.7, sugars: 5, protein: 9 }, defaultGrams: 60 },
  "potato": { per100g: { calories: 77, totalFat: 0.1, saturatedFat: 0, cholesterol: 0, sodium: 6, totalCarbs: 17, dietaryFiber: 2.2, sugars: 0.8, protein: 2 }, defaultGrams: 200 },
  "carrot": { per100g: { calories: 41, totalFat: 0.2, saturatedFat: 0, cholesterol: 0, sodium: 69, totalCarbs: 10, dietaryFiber: 2.8, sugars: 4.7, protein: 0.9 }, defaultGrams: 100 },
  "broccoli": { per100g: { calories: 34, totalFat: 0.4, saturatedFat: 0, cholesterol: 0, sodium: 33, totalCarbs: 7, dietaryFiber: 2.6, sugars: 1.7, protein: 2.8 }, defaultGrams: 100 },
  "cheese": { per100g: { calories: 402, totalFat: 33, saturatedFat: 19, cholesterol: 105, sodium: 621, totalCarbs: 1.3, dietaryFiber: 0, sugars: 0.5, protein: 25 }, defaultGrams: 30 },
  "cream": { per100g: { calories: 340, totalFat: 36, saturatedFat: 20, cholesterol: 137, sodium: 41, totalCarbs: 3, dietaryFiber: 0, sugars: 3, protein: 2 }, defaultGrams: 30 },
  "yogurt": { per100g: { calories: 61, totalFat: 3.3, saturatedFat: 1.9, cholesterol: 13, sodium: 46, totalCarbs: 4.7, dietaryFiber: 0, sugars: 4.7, protein: 3.5 }, defaultGrams: 170 },
  "honey": { per100g: { calories: 304, totalFat: 0, saturatedFat: 0, cholesterol: 0, sodium: 4, totalCarbs: 82, dietaryFiber: 0.2, sugars: 82, protein: 0.3 }, defaultGrams: 21 },
  "lemon": { per100g: { calories: 29, totalFat: 0.3, saturatedFat: 0, cholesterol: 0, sodium: 2, totalCarbs: 9, dietaryFiber: 2.8, sugars: 2.5, protein: 1.1 }, defaultGrams: 50 },
  "lime": { per100g: { calories: 30, totalFat: 0.2, saturatedFat: 0, cholesterol: 0, sodium: 2, totalCarbs: 11, dietaryFiber: 2.8, sugars: 1.7, protein: 0.7 }, defaultGrams: 50 },
  "soy": { per100g: { calories: 173, totalFat: 9, saturatedFat: 1.3, cholesterol: 0, sodium: 1, totalCarbs: 10, dietaryFiber: 5, sugars: 1, protein: 17 }, defaultGrams: 100 },
  "tofu": { per100g: { calories: 76, totalFat: 4.8, saturatedFat: 0.7, cholesterol: 0, sodium: 7, totalCarbs: 1.9, dietaryFiber: 0.3, sugars: 0.6, protein: 8 }, defaultGrams: 125 },
  "peanut": { per100g: { calories: 567, totalFat: 49, saturatedFat: 10, cholesterol: 0, sodium: 18, totalCarbs: 16, dietaryFiber: 8.5, sugars: 4, protein: 26 }, defaultGrams: 30 },
  "almond": { per100g: { calories: 579, totalFat: 50, saturatedFat: 3.8, cholesterol: 0, sodium: 1, totalCarbs: 22, dietaryFiber: 12, sugars: 4.4, protein: 21 }, defaultGrams: 28 },
  "walnut": { per100g: { calories: 654, totalFat: 65, saturatedFat: 6.1, cholesterol: 0, sodium: 2, totalCarbs: 14, dietaryFiber: 6.7, sugars: 2.6, protein: 15 }, defaultGrams: 28 },
  "cashew": { per100g: { calories: 553, totalFat: 44, saturatedFat: 7.8, cholesterol: 0, sodium: 12, totalCarbs: 30, dietaryFiber: 3.3, sugars: 5.9, protein: 18 }, defaultGrams: 28 },
  "corn": { per100g: { calories: 86, totalFat: 1.4, saturatedFat: 0.2, cholesterol: 0, sodium: 15, totalCarbs: 19, dietaryFiber: 2.7, sugars: 6.3, protein: 3.3 }, defaultGrams: 150 },
  "beans": { per100g: { calories: 127, totalFat: 0.5, saturatedFat: 0.1, cholesterol: 0, sodium: 373, totalCarbs: 23, dietaryFiber: 6.3, sugars: 0.3, protein: 8.7 }, defaultGrams: 180 },
  "black beans": { per100g: { calories: 132, totalFat: 0.5, saturatedFat: 0.1, cholesterol: 0, sodium: 1, totalCarbs: 24, dietaryFiber: 8.7, sugars: 0.3, protein: 9 }, defaultGrams: 180 },
};

// Parse ingredient line like "2 cups flour" or "1 tsp salt"
function parseIngredientLine(line: string): { name: string; grams: number } | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  // Try to extract quantity and unit
  const match = trimmed.match(/^([\d./]+)\s*(cups?|cup|tbsp|tsp|oz|lb|lbs|g|kg|ml|l|pieces?|pieces?|cloves?|large|medium|small)?\s*(?:of\s+)?(.+)/i);
  
  let grams = 100; // default
  let name = trimmed;

  if (match) {
    const [, qtyStr, unit, ingredientName] = match;
    const qty = parseFloat(qtyStr) || 1;
    name = ingredientName || match[3] || name;

    // Estimate grams from unit
    const unitLower = (unit || "cup").toLowerCase();
    if (unitLower.startsWith("cup") || unitLower === "c") grams = qty * 240;
    else if (unitLower === "tbsp" || unitLower === "tablespoon") grams = qty * 15;
    else if (unitLower === "tsp" || unitLower === "teaspoon") grams = qty * 5;
    else if (unitLower === "oz" || unitLower === "ounce") grams = qty * 28;
    else if (unitLower === "lb" || unitLower === "lbs" || unitLower === "pound") grams = qty * 454;
    else if (unitLower === "g" || unitLower === "gram") grams = qty;
    else if (unitLower === "kg") grams = qty * 1000;
    else if (unitLower === "ml") grams = qty; // approx for water
    else if (unitLower === "l" || unitLower === "liter") grams = qty * 1000;
    else if (unitLower === "clove" || unitLower === "cloves") grams = qty * 4;
    else if (unitLower === "piece" || unitLower === "pieces") grams = qty * 100;
    else if (["large", "medium", "small"].includes(unitLower)) grams = qty * (unitLower === "large" ? 150 : unitLower === "medium" ? 100 : 70);
  }

  return { name: name.toLowerCase().trim(), grams };
}

export function calculateNutrition(ingredientList: string, servings: number = 1): NutritionData {
  const lines = ingredientList.split("\n").filter(l => l.trim());
  const totals: NutritionData = {
    calories: 0, totalFat: 0, saturatedFat: 0, cholesterol: 0,
    sodium: 0, totalCarbs: 0, dietaryFiber: 0, sugars: 0, protein: 0,
  };

  for (const line of lines) {
    const parsed = parseIngredientLine(line);
    if (!parsed) continue;

    const { name, grams } = parsed;

    // Find matching ingredient
    let data: NutritionData | null = null;
    for (const [key, value] of Object.entries(KNOWN_INGREDIENTS)) {
      if (name.includes(key) || key.includes(name)) {
        data = value.per100g;
        break;
      }
    }

    if (data) {
      const factor = grams / 100;
      totals.calories += data.calories * factor;
      totals.totalFat += data.totalFat * factor;
      totals.saturatedFat += data.saturatedFat * factor;
      totals.cholesterol += data.cholesterol * factor;
      totals.sodium += data.sodium * factor;
      totals.totalCarbs += data.totalCarbs * factor;
      totals.dietaryFiber += data.dietaryFiber * factor;
      totals.sugars += data.sugars * factor;
      totals.protein += data.protein * factor;
    } else {
      // Default estimate: 100g = ~100 calories mixed
      totals.calories += 100 * (grams / 100);
      totals.totalCarbs += 15 * (grams / 100);
      totals.protein += 3 * (grams / 100);
    }
  }

  // Per serving
  if (servings > 0) {
    const s = 1 / servings;
    for (const key of Object.keys(totals) as (keyof NutritionData)[]) {
      totals[key] = parseFloat((totals[key] * s).toFixed(1));
    }
  }

  return totals;
}
