import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Santos.travel Admin - Dashboard",
    description: "Santos.travel Admin Dashboard for managing travel packages, bookings, and analytics.",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            {children}
        </div>
    );
}
