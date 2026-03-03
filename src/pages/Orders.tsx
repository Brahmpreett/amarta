import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";

export default function Orders() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Orders</h1>
        <p className="text-muted-foreground text-sm mb-6">Track your hardware orders and shipments.</p>

        <div className="glass rounded-xl p-8 text-center">
          <p className="text-muted-foreground text-sm">No orders yet. Add components from the Hardware Marketplace to get started.</p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
