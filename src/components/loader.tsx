import { BounceLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="flex justify-center mt-16 w-full">
            <BounceLoader color="#0284c722" />
        </div>
    );
}
