"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChefHat, AlertTriangle, Printer, CheckCircle, Zap, Shield, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-slate-900">MenuLabel AI</span>
          </div>
          <nav className="flex gap-4">
            <a href="#features" className="inline-flex items-center justify-center rounded-lg border border-transparent text-sm font-medium px-2.5 py-2 h-8 gap-1.5 hover:bg-slate-100 text-slate-700">Features</a>
            <a href="#pricing" className="inline-flex items-center justify-center rounded-lg border border-transparent text-sm font-medium px-2.5 py-2 h-8 gap-1.5 hover:bg-slate-100 text-slate-700">Pricing</a>
            <Button variant="outline">Sign In</Button>
            <Link href="/recipe"><Button>Start Free</Button></Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-800 mb-4">FDA 21 CFR §101.9 Compliant</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Turn Recipe Ingredients into
            <br />
            <span className="text-green-600">FDA-Compliant Labels</span>
            <br />
            in 60 Seconds
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Paste your ingredient list, get nutrition facts, allergen flags, and printable FDA-compliant labels. No subscriptions, no complex software — just results.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/recipe"><Button size="lg" className="bg-green-600 hover:bg-green-700"><Zap className="mr-2 h-4 w-4" />Start Free — 3 Labels/mo</Button></Link>
            <a href="#pricing" className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium whitespace-nowrap transition-all h-9 gap-1.5 px-2.5">View Pricing<ArrowRight className="ml-2 h-4 w-4" /></a>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <ChefHat className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Nutrition Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                USDA-sourced data for calories, fat, carbs, protein, and sodium per serving. AI-enhanced accuracy for complex recipes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />
              <CardTitle>Allergen Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Detects all Big 9 allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, sesame) with red/green badges.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Printer className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Printable Labels</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Download FDA 21 CFR §101.9 formatted Nutrition Facts panels as PDF. Print and post in minutes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-600 mt-2">Three steps from ingredients to compliant labels</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-700">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Enter Ingredients</h3>
              <p className="text-slate-600 text-sm">Paste your ingredient list with quantities. One ingredient per line.</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-700">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
              <p className="text-slate-600 text-sm">We look up USDA nutrition data and detect allergens automatically.</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-700">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Download & Print</h3>
              <p className="text-slate-600 text-sm">Get your FDA-compliant label PDF and print it immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Allergen Info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                The Big 9 Allergens — Detected Automatically
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {["Milk", "Eggs", "Fish", "Shellfish", "Tree Nuts", "Peanuts", "Wheat", "Soybeans", "Sesame"].map((allergen) => (
                  <div key={allergen} className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-sm font-medium text-red-800">{allergen}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600 mt-4">
                FDA requires identification of these major allergens. MenuLabel AI flags them instantly from your ingredient list.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-16" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Simple, Honest Pricing</h2>
            <p className="text-slate-600 mt-2">No surprise fees. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Try it out risk-free</CardDescription>
                <div className="text-3xl font-bold mt-4">$0<span className="text-lg font-normal text-slate-500">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>3 labels per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Nutrition facts panel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Allergen detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>PDF download</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span className="h-5 w-5">✗</span>
                    <span>Watermark on labels</span>
                  </li>
                </ul>
                <Link href="/recipe"><Button variant="outline" className="w-full mt-6">Get Started</Button></Link>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="border-green-500 border-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Starter</CardTitle>
                    <CardDescription>For small restaurants</CardDescription>
                  </div>
                  <Badge className="bg-green-600">Popular</Badge>
                </div>
                <div className="text-3xl font-bold mt-4">$19<span className="text-lg font-normal text-slate-500">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>10 labels per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Full nutrition facts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Allergen flags</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>PDF download</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>No watermark</span>
                  </li>
                </ul>
                <a href="https://buy.stripe.com/menulabel-starter" target="_blank" className="inline-flex items-center justify-center rounded-lg border border-transparent bg-green-600 hover:bg-green-700 text-white text-sm font-medium whitespace-nowrap transition-all h-8 gap-1.5 px-2.5 mt-6 w-full text-center">Subscribe — Starter</a>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing menus</CardDescription>
                <div className="text-3xl font-bold mt-4">$49<span className="text-lg font-normal text-slate-500">/mo</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited labels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Full nutrition facts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Priority processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Bulk export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>No watermark</span>
                  </li>
                </ul>
                <a href="https://buy.stripe.com/menulabel-pro" target="_blank" className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium whitespace-nowrap transition-all h-8 gap-1.5 px-2.5 mt-6 w-full text-center">Subscribe — Pro</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Alert className="bg-blue-50 border-blue-200">
            <Shield className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-900">FDA Compliance Note</AlertTitle>
            <AlertDescription className="text-blue-800 text-sm">
              MenuLabel AI generates labels based on USDA FoodData Central and AI estimation. 
              While we strive for accuracy, labels should be verified by a qualified nutritionist 
              or food safety professional for official compliance. AI-estimated values are clearly marked.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <ChefHat className="h-6 w-6 text-green-500" />
              <span className="text-lg font-bold text-white">MenuLabel AI</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4" />
              <span>Your recipes are secure and never stored permanently</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
            © 2026 MenuLabel AI by Huadini. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
