import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 simulations/month", "Basic ROS generation", "Community support"],
    current: true,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: ["Unlimited simulations", "Advanced deployment tools", "Hardware marketplace", "Priority support"],
    current: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantees", "On-premise option"],
    current: false,
  },
];

export default function Billing() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Billing</h1>
        <p className="text-muted-foreground text-sm mb-8">Manage your subscription and usage.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass rounded-xl p-6 flex flex-col ${plan.current ? "border-primary/50 glow-primary" : ""}`}
            >
              <h3 className="font-semibold">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6" variant={plan.current ? "outline" : "default"} disabled={plan.current}>
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
