import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardSettings() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm mb-8">Manage your account preferences.</p>

        <div className="glass rounded-xl p-6 max-w-lg space-y-4">
          <div className="space-y-2">
            <Label>Display Name</Label>
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="you@company.com" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
