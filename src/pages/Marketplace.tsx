import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";

const components = [
  { id: 1, name: "NEMA 23 Stepper Motor", specs: "1.8° step, 2.8A, 1.26Nm", price: 45 },
  { id: 2, name: "Raspberry Pi 5 (8GB)", specs: "Quad-core Cortex-A76, 8GB RAM", price: 80 },
  { id: 3, name: "RPLIDAR A1M8", specs: "360° scan, 12m range, 8000 samples/s", price: 99 },
  { id: 4, name: "Intel RealSense D435i", specs: "Depth + IMU, USB-C, 1280x720", price: 299 },
  { id: 5, name: "Dynamixel XL430-W250", specs: "Smart servo, 1.4Nm, TTL", price: 65 },
  { id: 6, name: "Arduino Mega 2560", specs: "ATmega2560, 54 digital I/O", price: 38 },
];

export default function Marketplace() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Hardware Marketplace</h1>
        <p className="text-muted-foreground text-sm mb-6">AI-recommended components for your build.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((c) => (
            <div key={c.id} className="glass rounded-xl p-5 flex flex-col justify-between hover:border-primary/30 transition-colors">
              <div>
                <div className="w-full h-24 rounded-lg bg-secondary/50 mb-4 flex items-center justify-center text-muted-foreground text-xs">
                  Component Image
                </div>
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.specs}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-lg">${c.price}</span>
                <Button size="sm" variant="outline">Add to Build</Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
