import type { Children } from "@/types";
import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SessionProvider from "@/context/Session";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "LearnSphere - The next generation student tracking system.",
    description:
        "LearnSphere is an innovative and comprehensive student tracking system designed to provide a holistic view of each student’s academic and extracurricular journey. This user-friendly platform empowers school administrators, teachers, students, and parents by seamlessly integrating personal records, academic performance, extracurricular participation, and achievements into a single, intuitive interface. With features like real-time attendance tracking, performance analytics, and a showcase for student milestones, LearnSphere fosters a supportive environment for student growth and success. Built with security and privacy at its core, this system is tailored to enhance the educational experience, making school management more efficient and engaging for everyone involved.",
};

export default function RootLayout({ children }: Readonly<Children>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased`}>
                <SessionProvider>
                    {children}
                    <Toaster position="bottom-right" />
                </SessionProvider>
            </body>
        </html>
    );
}
