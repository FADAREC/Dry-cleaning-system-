import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check, Truck, Package, Shirt } from "lucide-react";
import { type Booking } from "@shared/schema";
import ShareButtons from "@/components/ShareButtons";

const STEPS = [
    { id: "pending", label: "Order Placed", icon: Package },
    { id: "confirmed", label: "Confirmed", icon: Check },
    { id: "picked_up", label: "Picked Up", icon: Truck },
    { id: "in_progress", label: "Cleaning", icon: Shirt },
    { id: "ready", label: "Ready", icon: Check },
    { id: "delivered", label: "Delivered", icon: Package },
];

export default function OrderTracking() {
    const [, params] = useRoute("/tracking/:id");
    const id = params?.id;

    const { data: booking, isLoading } = useQuery<Booking>({
        queryKey: [`/api/bookings/${id}`],
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="max-w-md mx-4">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                            <p className="text-gray-600 mb-6">
                                We couldn't find an order with this ID. Please check your confirmation email or contact us.
                            </p>
                            <a 
                                href="/" 
                                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                            >
                                ← Back to Home
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentStepIndex = STEPS.findIndex(s => s.id === booking.status);
    const trackingUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                
                {/* Header with Share */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Track Order #{booking.id.slice(0, 8)}
                    </h1>
                    <ShareButtons 
                        url={trackingUrl}
                        title={`Caperberry Laundry Order #${booking.id.slice(0, 8)}`}
                        description="Track your laundry order status in real-time"
                    />
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Order Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            {/* Progress Bar Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

                            <div className="space-y-8 relative">
                                {STEPS.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.id} className="flex items-center space-x-4">
                                            <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-500
                        ${isCompleted ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <p className={`font-semibold text-lg ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {step.label}
                                                </p>
                                                {isCurrent && (
                                                    <p className="text-sm text-primary font-medium">Current Status</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Customer Name</p>
                                <p className="font-medium">{booking.customerName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{booking.customerPhone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Service Type</p>
                                <p className="font-medium capitalize">{booking.serviceType.replace('-', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="font-medium">
                                    {booking.finalPrice ? `₦${booking.finalPrice.toLocaleString()}` : 'Calculating...'}
                                </p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-sm text-gray-500">Pickup Address</p>
                                <p className="font-medium">{booking.pickupAddress}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Scheduled Pickup</p>
                                <p className="font-medium">
                                    {booking.preferredPickupTime ? new Date(booking.preferredPickupTime).toLocaleDateString('en-NG', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'Not scheduled'}
                                </p>
                            </div>
                            {booking.notes && (
                                <div className="sm:col-span-2">
                                    <p className="text-sm text-gray-500">Special Instructions</p>
                                    <p className="font-medium text-gray-700">{booking.notes}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Back to Home */}
                <div className="mt-8 text-center">
                    <a 
                        href="/" 
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
