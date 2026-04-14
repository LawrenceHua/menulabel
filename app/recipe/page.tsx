"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

export default function RecipePage() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState("");
  const [servings, setServings] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SAMPLE_RECIPE = `2 cups all-purpose flour
1 tsp salt
2 tbsp sugar
3 large eggs
1 cup milk
4 tbsp butter, melted
1 tsp vanilla extract`;

  const handleAnalyze = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setAnalyzing(true);
    setError(null);

    // Simulate a brief API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Store in localStorage for the label page
    const data = {
      ingredients: ingredients,
      servings: servings,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("menulabel_recipe", JSON.stringify(data));

    setAnalyzing(false);
    router.push("/label");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <ChefHat className="h-7 w-7 text-green-600" />
          <span className="text-lg font-bold text-slate-900">MenuLabel AI</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Instructions */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Enter Your Recipe Ingredients
          </h1>
          <p className="text-slate-600 text-sm">
            List each ingredient on a new line with quantity and unit. 
            Example: <span className="font-mono bg-slate-100 px-1 rounded">2 cups flour</span> or <span className="font-mono bg-slate-100 px-1 rounded">1 tsp salt</span>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-green-600" />
              Recipe Ingredients
            </CardTitle>
            <CardDescription>
              One ingredient per line. Include quantity and unit when possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ingredient List
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder={SAMPLE_RECIPE}
                rows={12}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Servings
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={servings}
                onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-32 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Nutrition facts will be calculated per serving
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="flex-1 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Analyze Recipe
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIngredients(SAMPLE_RECIPE)}
              >
                Load Sample
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">Supported Units</h3>
              <p className="text-xs text-blue-700 font-mono">
                cups, tbsp, tsp, oz, lb, g, kg, ml, L, cloves, pieces, large/medium/small
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-green-900 text-sm mb-2">Big 9 Allergens Detected</h3>
              <p className="text-xs text-green-700">
                Milk, Eggs, Fish, Shellfish, Tree Nuts, Peanuts, Wheat, Soybeans, Sesame
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
