
import React from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { monitoredLocations, AIInsight, aiInsights } from "@/lib/ai-utils";
import { Badge } from "@/components/ui/badge";

const MapPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-guardian-secondary">Outbreak Monitoring Map</h1>
          <p className="text-muted-foreground">
            Real-time visualization of potential outbreak clusters across Washington
          </p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="map-container bg-slate-100" style={{height: "500px"}}>
              {/* This is a placeholder for the actual map */}
              <div className="relative w-full h-full bg-blue-50 p-4">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Simple state outline */}
                  <svg viewBox="0 0 500 400" className="w-full h-full opacity-50">
                    <path 
                      d="M40,50 L100,20 L350,50 L450,150 L400,350 L250,320 L100,350 L50,250 z" 
                      fill="none" 
                      stroke="#1E88E5" 
                      strokeWidth="2"
                    />
                  </svg>
                  
                  {/* Plot the outbreak locations */}
                  {monitoredLocations.map((location) => {
                    // Transform the lat/lng to fake coordinates for our simple map
                    const x = ((location.lng + 125) * 5) % 450 + 25;
                    const y = ((location.lat - 45) * 15) % 300 + 50;
                    
                    let color = "bg-green-500";
                    if (location.riskLevel === "moderate") color = "bg-yellow-500";
                    if (location.riskLevel === "high") color = "bg-orange-500";
                    if (location.riskLevel === "severe") color = "bg-red-500";
                    
                    const size = location.reportCount / 10 + 16;
                    
                    return (
                      <div 
                        key={location.id}
                        className={`absolute rounded-full ${color} animate-pulse-slow`}
                        style={{ 
                          left: `${x}px`, 
                          top: `${y}px`,
                          width: `${size}px`,
                          height: `${size}px`,
                          transform: "translate(-50%, -50%)"
                        }}
                        title={`${location.name}: ${location.reportCount} reports (${location.riskLevel} risk)`}
                      >
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded text-xs shadow whitespace-nowrap">
                          {location.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-sm text-xs">
                  <div className="font-semibold text-sm mb-1">Risk Level Legend</div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span>Low</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                      <span>Moderate</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                      <span>Severe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {monitoredLocations.map(location => (
                <Card key={location.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{location.name}</h3>
                      <Badge 
                        variant={
                          location.riskLevel === 'severe' ? 'destructive' : 
                          location.riskLevel === 'high' ? 'default' : 
                          location.riskLevel === 'moderate' ? 'secondary' :
                          'outline'
                        }
                      >
                        {location.riskLevel} risk
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      <span className="font-medium">{location.reportCount}</span> symptom reports in the last 7 days
                    </p>
                    <div className="mt-3 h-2 bg-gray-100 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${
                          location.riskLevel === 'severe' ? 'bg-red-500' : 
                          location.riskLevel === 'high' ? 'bg-orange-500' : 
                          location.riskLevel === 'moderate' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (location.reportCount / 120) * 100)}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">AI Detected Patterns</h2>
            <div className="space-y-4">
              {aiInsights.map(insight => (
                <Card key={insight.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{insight.title}</h3>
                      <Badge 
                        variant={
                          insight.severity === 'alert' ? 'destructive' : 
                          insight.severity === 'warning' ? 'default' : 
                          'outline'
                        }
                      >
                        {insight.severity}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {insight.relatedSymptoms.map(symptom => (
                        <Badge key={symptom} variant="outline" className="bg-guardian-light">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-8">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; 2025 Washington Guardian. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MapPage;
