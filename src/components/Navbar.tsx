import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
          Amarta
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
          <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Developers</Link>
          <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Enterprise</Link>
          <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/30 px-6 py-4 space-y-3">
          <Link to="#" className="block text-sm text-muted-foreground">Platform</Link>
          <Link to="#" className="block text-sm text-muted-foreground">Developers</Link>
          <Link to="#" className="block text-sm text-muted-foreground">Enterprise</Link>
          <Link to="/login" className="block text-sm text-muted-foreground">Sign In</Link>
          <Button size="sm" className="w-full" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
