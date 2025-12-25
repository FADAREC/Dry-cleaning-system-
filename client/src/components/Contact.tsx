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
    location: "", // Selected branch
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
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Schedule a Pickup</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred location and book your laundry service
          </p>
        </div>

        {/* Two Locations Display */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {locations.map((location, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
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

                {/* Express pricing info */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Booking Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Book Your Service</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                {/* Preferred Branch */}
                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Branch *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleChange("location", value)}
                    required
                  >
                    <SelectTrigger id="location">
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

                {/* Pickup Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                    placeholder="Street address, Apartment, City"
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label htmlFor="service">Service Needed *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleChange("service", value)}
                    required
                  >
                    <SelectTrigger id="service">
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
                  
                  {/* Express Service Warning */}
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

                {/* Pickup Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Preferred Pickup Date *</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => handleChange("pickupDate", e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Preferred Time *</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => handleChange("pickupTime", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Special Instructions (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={3}
                    placeholder="Any special requests, gate codes, landmarks..."
                  />
                </div>

                {/* Terms Checkbox */}
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

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
            
            {/* Operating Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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

            {/* Email Contact */}
            <Card>
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

            {/* Payment Info */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-sm">Payment Policy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  100% prepayment required at drop-off or before pickup
                </p>
                <div className="text-xs space-y-1">
                  <p><strong>Bank:</strong> Moniepoint</p>
                  <p><strong>Account:</strong> 5799599578</p>
                  <p><strong>Name:</strong> Caperberry Fabric Care</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
    }      });

      setLocation(`/tracking/${data.booking.id}`);
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsApp = () => {
    if (whatsapp) {
      const message = encodeURIComponent("Hi! I'd like to schedule a laundry pickup.");
      window.open(
        `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${message}`,
        "_blank"
      );
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Schedule a Pickup</h2>
          <p className="text-lg text-muted-foreground">
            Fill out the form below or contact us directly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Booking Form</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                    placeholder="Street address, Apartment, City"
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label htmlFor="service">Service Needed *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleChange("service", value)}
                    required
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>

                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pickup Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date *</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => handleChange("pickupDate", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Pickup Time *</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => handleChange("pickupTime", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Special Instructions (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={4}
                    placeholder="Any specific requests or notes..."
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Side — WhatsApp + Contact Info */}
          <div className="space-y-6">
            {whatsapp && (
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quick Response</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Get instant replies on WhatsApp
                  </p>

                  <Button variant="secondary" className="w-full" onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Phone</div>
                    <a href={`tel:${primaryPhone}`} className="text-sm text-muted-foreground hover:text-primary">
                      {primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Email</div>
                    <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-primary">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                {locations[0] && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Location</div>
                      <div className="text-sm text-muted-foreground">
                        {locations[0].address}
                        <br />
                        {locations[0].city}, {locations[0].state}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Business Hours</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {hours.map((schedule, index) => (
                        <div key={index}>
                          {schedule.days}: {schedule.hours}
                        </div>
                      ))}
                    </div>
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
