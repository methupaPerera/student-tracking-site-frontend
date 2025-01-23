import { BlurFade } from "@/components/ui/blur-fade";
import type { Children } from "@/types";

export default function UsersTemplate({ children }: Children) {
    return <BlurFade>{children}</BlurFade>;
}
