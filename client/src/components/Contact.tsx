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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your preferred location and book your laundry service
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {locations.map((location, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-500 border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {location.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{location.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`tel:${location.phone}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {location.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://wa.me/${location.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    WhatsApp this branch
                  </a>
                </div>
                
                {index === 0 && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                    <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-400">
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">UNILAG Students: Express at 2x rate!</span>
                    </div>
                  </div>
                )}
                
                {index === 1 && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                    <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-400">
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">Island: Express at 4x rate</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* FORM CONTINUES IN NEXT FILE... */}
      </div>
    </section>
  );
}
