import { ReactNode } from "react";
import "./Layout.css"

type TPosition = "center" | "full";

interface IProps {
    children: React.ReactNode;
    position?: TPosition;
  }

export const Layout = ({children, position}:IProps ) => {
    return(<div className={`${position} container`}>{children}</div>)
}