import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { businessConfig } from "../../../config/business";
import { MapPin, Phone, Mail, Clock, MessageCircle, Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";

export default function Contact() {
  const { services, locations, hours, email } = businessConfig;
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    location: "",
    pickupDate: "",
    pickupTime: "",
    message: "",
    termsAccepted: false,
  });
  
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/bookings", {
        ...data,
        userId,
        customerName: data.name,
        customerPhone: data.phone,
        customerEmail: data.email,
        serviceType: data.service,
        pickupAddress: data.address,
        preferredPickupDate: data.pickupDate,
        preferredPickupTime: data.pickupTime,
        notes: data.message,
        termsAccepted: data.termsAccepted,
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.booking.userId) {
        localStorage.setItem("userId", data.booking.userId);
        setUserId(data.booking.userId);
      }
      toast({
        title: "Booking Confirmed!",
        description: `Order #${data.orderNumber} created. Redirecting to tracking...`,
      });
      setTimeout(() => {
        setLocation(`/tracking/${data.booking.id}`);
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(formData);
  };
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const selectedLocation = locations.find(loc => loc.name === formData.location);
  const isExpressService = formData.service === "express";
  
  return (
    <section className="py-20 md:py-28 bg-muted/30" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
       <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Schedule a Pickup</h2>
         
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <Card className="lg:col-span-2 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl">Book Your Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-900">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      placeholder="John Doe"
                      className="h-12 border-gray-300 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-900">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      placeholder="+234 XXX XXX XXXX"
                      className="h-12 border-gray-300 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-900">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-900">Preferred Branch *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleChange("location", value)}
                    required
                  >
                    <SelectTrigger id="location" className="h-12">
                      <SelectValue placeholder="Select your nearest branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.name} value={location.name}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedLocation && (
                    <p className="text-xs text-muted-foreground">
                      📍 {selectedLocation.address}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-900">Pickup Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                    placeholder="Street address, Apartment, City"
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm font-medium text-gray-900">Service Needed *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleChange("service", value)}
                    required
                  >
                    <SelectTrigger id="service" className="h-12">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                          {service.price && ` - ${service.price}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {isExpressService && formData.location && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        <strong>Express Service (24hrs):</strong>{" "}
                        {formData.location.includes("Yaba") 
                          ? "2x standard rate (UNILAG students)" 
                          : "4x standard rate (Island clients)"}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-900">Preferred Pickup Date *</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => handleChange("pickupDate", e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="h-12 border-gray-300 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-900">Preferred Time *</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => handleChange("pickupTime", e.target.value)}
                      required
                      className="h-12 border-gray-300 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-900">Special Instructions (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={3}
                    placeholder="Any special requests, gate codes, landmarks..."
                    className="border-gray-300 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleChange("termsAccepted", checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-tight cursor-pointer"
                  >
                    I accept the{" "}
                    <a href="#" className="text-primary hover:underline">
                      terms and conditions
                    </a>
                    , including 100% prepayment policy and damage/loss policies.
                  </label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-500 shadow-md hover:shadow-xl"
                  size="lg"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  You'll receive a confirmation and tracking link after booking
                </p>
              </form>
            </CardContent>
          </Card>
          
          {/* Right Side — Quick Info */}
          <div className="space-y-6">
            
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-medium">{schedule.days}</span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-sm">Email Us</div>
                    <a 
                      href={`mailto:${email}`} 
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>
    </section>
  );
}
