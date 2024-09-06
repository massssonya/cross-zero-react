
import { useContext, useState } from 'react';
import { PlayerMoveContext, TMarker } from "../../hooks/usePlayerMoveContext";
import { markers } from "../../constants/Markers"
import { useGameField } from '../../hooks/useGameField';

interface IGameField {
    col: number
}

export const GameField = ({ col }: IGameField) => {
    const {squares, handleChangeSquare} = useGameField(col);


    return (
        <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        grid gap-[10px]`}
            style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}>
            {squares.map(square =>
                <Square
                    key={square.id}
                    id={square.id}
                    squareMarker={square.squareMarker}
                    handleChangeSquare={(id, marker) => handleChangeSquare(id, marker)} />)
            }
        </div>
    )
}

interface ISquare {
    id: string;
    squareMarker: TMarker;
    handleChangeSquare: (id: string, marker: TMarker) => void
}

const Square = ({ id, handleChangeSquare, squareMarker }: ISquare) => {
    const [disabled, setDisabled] = useState(false);
    const { marker, handleChangeMarker } = useContext(PlayerMoveContext)

    const handleClick = () => {
        setDisabled(true);
        handleChangeMarker();
        handleChangeSquare(id, marker);
    };

    return (
        <button
            id={id}
            onClick={handleClick}
            disabled={disabled}
            className={`flex border-4 border-indigo-500 
                        sm:px-4 sm:py-3 px-2 py-2 
                        sm:w-[80px] sm:h-[80px] w-[50px] h-[50px] 
                        ${!disabled ? "hover:bg-neutral-200" : ""}`}>
            {squareMarker && markers[squareMarker]}
        </button>
    )
}