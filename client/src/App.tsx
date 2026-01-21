import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import TermsAndConditions from "./components/TermAndConditions.tsx";
import UserDashboard from "@/pages/UserDashboard";
import OrderTracking from "@/pages/OrderTracking";
import AdminDashboard from "@/pages/AdminDashboard";
import Invoice from "@/pages/Invoice";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/tracking/:id" component={OrderTracking} />
      <Route path="/terms" component={TermsAndConditions} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/invoice/:id" component={Invoice} />
      <Route component={NotFound} />
    </Switch>
  );
}

import FloatingWhatsApp from "@/components/FloatingWhatsApp";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <FloatingWhatsApp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
