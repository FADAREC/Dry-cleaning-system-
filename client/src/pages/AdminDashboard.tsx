import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Check, Truck, Shirt, XCircle } from "lucide-react";
import { type Booking } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending", icon: Package },
    { value: "confirmed", label: "Confirmed", icon: Check },
    { value: "picked_up", label: "Picked Up", icon: Truck },
    { value: "in_progress", label: "Cleaning", icon: Shirt },
    { value: "ready", label: "Ready", icon: Check },
    { value: "delivered", label: "Delivered", icon: Package },
    { value: "cancelled", label: "Cancelled", icon: XCircle },
];

export default function AdminDashboard() {
    const { toast } = useToast();
    const { data: bookings, isLoading } = useQuery<Booking[]>({
        queryKey: ["/api/bookings"],
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await apiRequest("PATCH", `/api/bookings/${id}/status`, { status });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
            toast({
                title: "Status Updated",
                description: "The order status has been updated successfully.",
            });
        },
        onError: () => {
            toast({
                title: "Update Failed",
                description: "Failed to update order status.",
                variant: "destructive",
            });
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="text-sm text-gray-500">
                        Total Orders: {bookings?.length || 0}
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {bookings?.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-primary/10 rounded-full mt-1">
                                            <Package className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">Order #{booking.id.slice(0, 8)}</p>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(booking.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                <span className="font-medium">{booking.customerName}</span> • {booking.serviceType}
                                            </p>
                                            <p className="text-sm text-gray-500">{booking.pickupAddress}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-48">
                                            <Select
                                                defaultValue={booking.status}
                                                onValueChange={(value) =>
                                                    updateStatusMutation.mutate({ id: booking.id, status: value })
                                                }
                                                disabled={updateStatusMutation.isPending}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {STATUS_OPTIONS.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            <div className="flex items-center gap-2">
                                                                <option.icon className="w-4 h-4" />
                                                                <span>{option.label}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {bookings?.length === 0 && (
                                <p className="text-center text-gray-500 py-8">No orders found</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
