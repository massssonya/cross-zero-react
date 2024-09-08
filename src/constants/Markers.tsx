import { Circle, X } from "lucide-react";
import { ReactNode } from "react";

interface IMarkers {
	cross: ReactNode;
	zero: ReactNode;
}

export const markers: IMarkers = {
	cross: <X color="red" strokeWidth={3} size={48}  />,
	zero: <Circle size={48} />
};
