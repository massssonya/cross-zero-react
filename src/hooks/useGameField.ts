import { useState } from "react";
import { TMarker } from "./usePlayerMoveContext";

interface ISquareItem {
    id: string;
    squareMarker: TMarker
}

export const useGameField = (col:number) => {
    let items:ISquareItem[] = []
    for (let i = 1; i <= col * col; i++) {
        items.push({ id: `square_${i}`, squareMarker: "" });
    }

    const [squares, setSquares] = useState<ISquareItem[]>(items)

    const handleChangeSquare = (id: string, squareMarker: TMarker) => {
        const newSquares = squares.map((square) => {
            if (square.id === id) {
                return { ...square, squareMarker: squareMarker };
            }
            return square;
        });
        setSquares(newSquares);
    }

    return {squares, handleChangeSquare}
}