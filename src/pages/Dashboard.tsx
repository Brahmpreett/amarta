import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const mockProjects = [
  { id: 1, name: "Warehouse Pick & Place", status: "Simulation", updated: "2 hours ago" },
  { id: 2, name: "Agricultural Drone Swarm", status: "Design", updated: "1 day ago" },
  { id: 3, name: "Delivery Bot v2", status: "Deployed", updated: "3 days ago" },
];

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Projects</h1>
        <p className="text-muted-foreground text-sm mb-8">Create and manage your robotics projects.</p>

        {/* Create new */}
        <div className="glass rounded-xl p-6 mb-8 glow-subtle">
          <h2 className="text-sm font-semibold mb-3">Create New Robot Project</h2>
          <div className="flex gap-3">
            <Input
              placeholder="Describe your robot in Hindi or English..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </div>

        {/* Project list */}
        <div className="space-y-3">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="glass rounded-lg p-4 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div>
                <h3 className="font-medium text-sm">{project.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {project.status} · Updated {project.updated}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
