"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, AlertTriangle, CheckCircle, Download, Printer, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { calculateNutrition, detectAllergens, BIG_9_ALLERGENS } from "@/lib/nutrition";

interface RecipeData {
  ingredients: string;
  servings: number;
  timestamp: string;
}

function AllergenBadge({ name, present }: { name: string; present: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${present ? "bg-red-100 border border-red-200" : "bg-green-50 border border-green-200"}`}>
      {present ? (
        <AlertTriangle className="h-4 w-4 text-red-600" />
      ) : (
        <CheckCircle className="h-4 w-4 text-green-600" />
      )}
      <span className={`text-sm font-medium ${present ? "text-red-800" : "text-green-700"}`}>
        {name}
      </span>
      <Badge className={`ml-auto text-xs ${present ? "bg-red-600" : "bg-green-600"}`}>
        {present ? "Present" : "Absent"}
      </Badge>
    </div>
  );
}

export default function LabelPage() {
  const labelRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("menulabel_recipe");
    if (stored) {
      setData(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleDownloadPDF = async () => {
    if (!labelRef.current) return;

    // Dynamically import html2canvas and jspdf
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const element = labelRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ unit: "mm", format: [210, 297] });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const labelWidth = 80;
    const labelX = (pdfWidth - labelWidth) / 2;

    pdf.addImage(imgData, "PNG", labelX, 20, labelWidth, 0);
    pdf.save(`menulabel-${Date.now()}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Recipe Found</h2>
            <p className="text-slate-600 mb-4">Please enter a recipe first.</p>
            <Link href="/recipe"><Button className="bg-green-600">Enter Recipe</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { ingredients, servings } = data;
  const nutrition = calculateNutrition(ingredients, servings);
  const detectedAllergens = detectAllergens(ingredients);
  const allAllergens = BIG_9_ALLERGENS.map(a => ({
    name: a,
    present: detectedAllergens.includes(a),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat className="h-7 w-7 text-green-600" />
            <span className="text-lg font-bold text-slate-900">MenuLabel AI</span>
          </div>
          <Link href="/recipe"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />New Recipe</Button></Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Results */}
          <div className="space-y-6">
            {/* Nutrition Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Facts</CardTitle>
                <CardDescription>Per serving ({servings} total servings)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-200 font-semibold text-slate-900">
                    <span>Calories</span>
                    <span>{nutrition.calories} kcal</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Total Fat</span>
                    <span>{nutrition.totalFat}g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 pl-4 text-slate-600">
                    <span>Saturated Fat</span>
                    <span>{nutrition.saturatedFat}g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Cholesterol</span>
                    <span>{nutrition.cholesterol}mg</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Sodium</span>
                    <span>{nutrition.sodium}mg</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Total Carbohydrates</span>
                    <span>{nutrition.totalCarbs}g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 pl-4 text-slate-600">
                    <span>Dietary Fiber</span>
                    <span>{nutrition.dietaryFiber}g</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 pl-4 text-slate-600">
                    <span>Sugars</span>
                    <span>{nutrition.sugars}g</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Protein</span>
                    <span>{nutrition.protein}g</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  * AI-estimated values based on USDA data. Verify for official compliance.
                </p>
              </CardContent>
            </Card>

            {/* Allergen Flags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Allergen Detection
                </CardTitle>
                <CardDescription>The Big 9 — FDA requires labeling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allAllergens.map(({ name, present }) => (
                    <AllergenBadge key={name} name={name} present={present} />
                  ))}
                </div>
                {detectedAllergens.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-semibold text-red-800">
                      ⚠ Contains: {detectedAllergens.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Label Preview */}
          <div>
            <div className="sticky top-8">
              <h3 className="font-semibold text-slate-900 mb-3">FDA-Compliant Label Preview</h3>
              
              {/* FDA Nutrition Facts Label */}
              <div ref={labelRef} className="bg-white border-2 border-black p-4 max-w-xs w-full" style={{ fontFamily: "Arial, sans-serif" }}>
                <div style={{ borderBottom: "1px solid #000", paddingBottom: "2px", marginBottom: "4px" }}>
                  <div style={{ fontSize: "20px", fontWeight: "800", lineHeight: "1" }}>Nutrition Facts</div>
                </div>
                <div style={{ borderBottom: "8px solid #000", margin: "2px 0" }} />
                <div style={{ borderBottom: "4px solid #000", margin: "2px 0" }}>
                  <span style={{ fontSize: "10px" }}>{servings} servings per recipe</span>
                </div>
                <div style={{ borderBottom: "1px solid #000", paddingBottom: "4px", margin: "4px 0" }}>
                  <span style={{ fontSize: "10px", fontWeight: "bold" }}>Serving size</span>
                  <span style={{ fontSize: "10px", float: "right" }}>1 serving</span>
                </div>
                <div style={{ borderBottom: "8px solid #000", paddingBottom: "2px", margin: "0" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold" }}>Amount per serving</span>
                </div>

                {/* Calories */}
                <div style={{ borderBottom: "4px solid #000", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "4px 0 0 0", margin: "2px 0 0 0" }}>
                  <span style={{ fontSize: "11px", fontWeight: "bold" }}>Calories</span>
                  <span style={{ fontSize: "22px", fontWeight: "bold" }}>{Math.round(nutrition.calories)}</span>
                </div>

                <div style={{ borderBottom: "1px solid #000", margin: "4px 0 0 0" }} />

                {/* % Daily Value header */}
                <div style={{ textAlign: "right", fontSize: "9px", padding: "2px 0" }}>
                  % Daily Value*
                </div>

                {/* Nutrients */}
                {[
                  { label: "Total Fat", value: `${nutrition.totalFat}g`, dv: Math.round((nutrition.totalFat / 78) * 100) },
                  { label: "Saturated Fat", value: `${nutrition.saturatedFat}g`, dv: Math.round((nutrition.saturatedFat / 20) * 100), indent: true },
                  { label: "Cholesterol", value: `${nutrition.cholesterol}mg`, dv: Math.round((nutrition.cholesterol / 300) * 100) },
                  { label: "Sodium", value: `${nutrition.sodium}mg`, dv: Math.round((nutrition.sodium / 2300) * 100) },
                  { label: "Total Carbohydrate", value: `${nutrition.totalCarbs}g`, dv: Math.round((nutrition.totalCarbs / 275) * 100) },
                  { label: "Dietary Fiber", value: `${nutrition.dietaryFiber}g`, dv: Math.round((nutrition.dietaryFiber / 28) * 100), indent: true },
                  { label: "Total Sugars", value: `${nutrition.sugars}g`, indent: true },
                  { label: "Protein", value: `${nutrition.protein}g`, dv: Math.round((nutrition.protein / 50) * 100) },
                ].map(({ label, value, dv, indent }) => (
                  <div key={label} style={{ borderBottom: "1px solid #ccc", padding: indent ? "1px 0 1px 10px" : "2px 0", fontSize: "10px" }}>
                    <span>{label}</span>
                    <span style={{ float: "right" }}>{value}</span>
                    {dv !== undefined && (
                      <span style={{ float: "right", fontWeight: "bold", marginLeft: "4px" }}>{dv}%</span>
                    )}
                  </div>
                ))}

                <div style={{ borderTop: "8px solid #000", marginTop: "4px", paddingTop: "4px", fontSize: "8px", lineHeight: "1.2" }}>
                  * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                </div>
              </div>

              {/* Download Buttons */}
              <div className="mt-4 flex gap-3">
                <Button onClick={handleDownloadPDF} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients used */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Ingredients Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded overflow-auto whitespace-pre-wrap">{ingredients}</pre>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


