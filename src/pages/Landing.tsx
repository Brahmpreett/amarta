import { Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Box, ShoppingCart, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RobotScene from "@/components/RobotScene";

const features = [
  {
    icon: Brain,
    title: "Natural Language to ROS",
    description: "Describe your robot in plain language. Our AI converts it into production-ready ROS nodes and task graphs.",
  },
  {
    icon: Box,
    title: "Virtual Simulation",
    description: "Test your robotics configurations in a photorealistic 3D environment before committing to hardware.",
  },
  {
    icon: ShoppingCart,
    title: "Hardware Marketplace",
    description: "AI-recommended components matched to your design. Compare specs, prices, and compatibility instantly.",
  },
  {
    icon: Rocket,
    title: "One-click Deployment",
    description: "From simulation to physical deployment with automated firmware generation and OTA updates.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Now in Public Beta
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                From Thought<br />
                <span className="text-gradient">to Robotics.</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Natural language to deployable robotics infrastructure. Design, simulate, and ship autonomous systems at unprecedented speed.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/signup">
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="#features">Explore Platform</Link>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
                <div>
                  <span className="block text-2xl font-bold text-foreground">10k+</span>
                  Robots Deployed
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <span className="block text-2xl font-bold text-foreground">50ms</span>
                  Avg. Response
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <span className="block text-2xl font-bold text-foreground">99.9%</span>
                  Uptime
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[400px] md:h-[500px] lg:h-[550px]"
            >
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading 3D scene...</div>}>
                <RobotScene />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to build<br />
              <span className="text-gradient">autonomous systems</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              An end-to-end platform that takes you from concept to deployment, powered by AI and built for scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass rounded-xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to build the future?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of engineers and companies building the next generation of autonomous systems.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
