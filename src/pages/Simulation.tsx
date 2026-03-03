import { Suspense } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import RobotScene from "@/components/RobotScene";

export default function Simulation() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">3D Simulation</h1>
        <p className="text-muted-foreground text-sm mb-6">Test your robotics configurations in a virtual environment.</p>

        <div className="glass rounded-xl overflow-hidden glow-subtle" style={{ height: "500px" }}>
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading simulation...</div>}>
            <RobotScene />
          </Suspense>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {["Position", "Velocity", "Torque"].map((param) => (
            <div key={param} className="glass rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">{param}</p>
              <p className="text-lg font-semibold tabular-nums">0.00</p>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
