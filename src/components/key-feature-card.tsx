"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ChevronRight } from "lucide-react";

const FeatureHighlightCard = () => {
    return (
        <Card className="my-6 bg-primary/5 ">
            <CardContent className="p-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-blue-700">
                        Key Features
                    </h3>
                </div>

                <div className="space-y-3 pl-1 mt-3">
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 rounded-md cursor-pointer transition-colors">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        <span>Real-time Attendance Tracking</span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-gray-700 rounded-md cursor-pointer transition-colors">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        <span>Academic Performance Analytics</span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-gray-700 rounded-md cursor-pointer transition-colors">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        <span>Automated Grade Calculation</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeatureHighlightCard;
