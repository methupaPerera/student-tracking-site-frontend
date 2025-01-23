import type { Children } from "@/types";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Template({ children }: Children) {
    return <BlurFade>{children}</BlurFade>;
}
