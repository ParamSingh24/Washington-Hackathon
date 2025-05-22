
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monitoredLocations } from "@/lib/ai-utils";
import { Activity } from "lucide-react";

// In a real app, we'd use a real map library like Leaflet or Google Maps
const OutbreakMapPreview = () => {
  return (
    <Card className="neo-card overflow-hidden border-white/10">
      <CardHeader className="pb-2 border-b border-white/10 bg-gradient-to-r from-background/80 to-background/40">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Activity className="mr-2 h-5 w-5 text-guardian-primary" />
            Outbreak Monitoring
          </CardTitle>
          <span className="px-2 py-1 bg-guardian-primary/10 text-guardian-primary text-xs rounded-md">
            Live Data
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="map-container">
          {/* This is a placeholder for the actual map */}
          <div className="relative w-full h-full p-4">
            <div className="absolute inset-0 overflow-hidden">
              {/* Simple state outline */}
              <svg viewBox="0 0 500 400" className="w-full h-full opacity-20">
                <path 
                  d="M40,50 L100,20 L350,50 L450,150 L400,350 L250,320 L100,350 L50,250 z" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="2"
                  className="glow-effect"
                />
                <path 
                  d="M150,100 L200,80 L250,120 L280,200 L220,250 L180,220 z" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  className="opacity-40"
                />
                <path 
                  d="M300,150 L340,120 L380,190 L360,240 L320,230 z" 
                  fill="none" 
                  stroke="#8B5CF6" 
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  className="opacity-40"
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
                
                const size = location.reportCount / 10 + 10;
                
                return (
                  <div 
                    key={location.id}
                    className="absolute rounded-full glow-effect"
                    style={{ 
                      left: `${x}px`, 
                      top: `${y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: color === "bg-green-500" ? "#22C55E" : 
                                       color === "bg-yellow-500" ? "#EAB308" :
                                       color === "bg-orange-500" ? "#F97316" : "#EF4444"
                    }}
                    title={`${location.name}: ${location.reportCount} reports (${location.riskLevel} risk)`}
                  >
                    <div 
                      className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{
                        backgroundColor: color === "bg-green-500" ? "#22C55E" : 
                                         color === "bg-yellow-500" ? "#EAB308" :
                                         color === "bg-orange-500" ? "#F97316" : "#EF4444"
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-xl p-3 text-xs z-10">
              <div className="font-semibold mb-2 text-sm">Risk Level Dashboard</div>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Severe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-white/10 bg-gradient-to-r from-background/80 to-background/40">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <span className="text-red-400 font-semibold">1 severe alert</span> detected in Vancouver area.
            </p>
            <button className="text-xs text-guardian-primary hover:underline">View detailed map</button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutbreakMapPreview;
