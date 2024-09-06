import { useState, createContext, ReactNode } from "react";

export type TMarker = "cross" | "zero" | "";

interface IPlayerMoveContext {
    marker: TMarker;
    handleChangeMarker: () => void;
}


const PlayerMoveContext = createContext<IPlayerMoveContext>(
    {
        marker: "cross",
        handleChangeMarker() { () => { return } }
    }
);

const PlayerMoveProvider = ({ children }: { children: ReactNode }) => {
    const [marker, setMarker] = useState<TMarker>("cross")

    const handleChangeMarker = () => {
        setMarker(marker === "cross" ? 'zero' : 'cross');
    }

    return (
        <PlayerMoveContext.Provider value={{ marker, handleChangeMarker }}>
            {children}
        </PlayerMoveContext.Provider>
    );
};

export { PlayerMoveContext, PlayerMoveProvider };
