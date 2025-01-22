import * as React from "react";

import { cn } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        const [inputType, setType] = React.useState<"password" | "text">(
            "password"
        );

        return (
            <>
                <div className="relative">
                    <input
                        type={type === "password" ? inputType : type}
                        className={cn(
                            "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />

                    {/* Added the visibility button for the password fields. */}

                    <div className="text-muted-foreground absolute right-3 top-0 mt-2.5 cursor-pointer">
                        {type === "password" ? (
                            inputType === "password" ? (
                                <FaEye
                                    size={20}
                                    onClick={() => setType("text")}
                                />
                            ) : (
                                <FaEyeSlash
                                    size={20}
                                    onClick={() => setType("password")}
                                />
                            )
                        ) : null}
                    </div>
                </div>
            </>
        );
    }
);
Input.displayName = "Input";

export { Input };
