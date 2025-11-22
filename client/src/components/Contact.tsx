import { useState, useEffect } from "react";
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
import { MapPin, Phone, Mail, Clock, MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export default function Contact() {
  const { services, locations, hours, primaryPhone, email, whatsapp } = businessConfig;
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    pickupDate: "",
    pickupTime: "",
    message: ""
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/bookings", {
        ...data,
        userId: userId, // Link to user if logged in
        customerName: data.name,
        customerPhone: data.phone,
        customerEmail: data.email,
        serviceType: data.service,
        pickupAddress: data.address,
        preferredPickupDate: data.pickupDate,
        preferredPickupTime: data.pickupTime,
        notes: data.message,
      });
      return res.json();
    },
    onSuccess: (data) => {
      // Save the real user ID returned by the server
      if (data.booking.userId) {
        localStorage.setItem("userId", data.booking.userId);
        setUserId(data.booking.userId);
      }

      toast({
        title: "Booking Confirmed!",
        description: "Redirecting to order tracking...",
      });
      setLocation(`/tracking/${data.booking.id}`);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Don't generate fake IDs. Let the backend handle user creation.
    mutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsApp = () => {
    if (whatsapp) {
      const message = encodeURIComponent("Hi! I'd like to schedule a laundry pickup.");
      window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-title">
            Schedule a Pickup
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-contact-description">
            Fill out the form below or contact us directly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Booking Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    required
                    placeholder="Street address, Apartment, City"
                    data-testid="input-address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Needed *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange('service', value)} required>
                      <SelectTrigger id="service" data-testid="select-service">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Preferred Pickup Date *</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => handleChange('pickupDate', e.target.value)}
                        required
                        data-testid="input-pickup-date"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupTime">Preferred Time *</Label>
                      <Input
                        id="pickupTime"
                        type="time"
                        value={formData.pickupTime}
                        onChange={(e) => handleChange('pickupTime', e.target.value)}
                        required
                        data-testid="input-pickup-time"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Special Instructions (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={4}
                      placeholder="Any specific requests or notes..."
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    data-testid="button-submit-booking"
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

          {/* Contact Information */}
          <div className="space-y-6">
            {/* WhatsApp Quick Action */}
            {whatsapp && (
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Quick Response</h3>
                    <p className="text-sm opacity-90 mb-4">Get instant replies on WhatsApp</p>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleWhatsApp}
                      data-testid="button-whatsapp-contact"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">Phone</div>
                    <a href={`tel:${primaryPhone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-phone">
                      {primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">Email</div>
                    <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                {locations[0] && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">Location</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-location">
                        {locations[0].address}<br />
                        {locations[0].city}, {locations[0].state}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">Business Hours</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {hours.map((schedule: { days: string; hours: string }, index: number) => (
                        <div key={index} data-testid={`text-hours-${index}`}>
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
