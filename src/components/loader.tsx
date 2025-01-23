import { CircleLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="flex justify-center mt-16 w-full">
            <CircleLoader color="hsl(221.2 83.2% 53.3%)" />
        </div>
    );
}
