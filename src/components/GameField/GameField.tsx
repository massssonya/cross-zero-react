import { useContext, useEffect, useState } from "react";
import { PlayerMoveContext, TMarker } from "../../hooks/usePlayerMoveContext";
import { markers } from "../../constants/Markers";
import { useGameField } from "../../hooks/useGameField";
import { TOption } from "../../hooks/types";

interface IGameField {
	col: number;
}

export const GameField = ({ col }: IGameField) => {
	const [currentId, setCurrentId] = useState("");
	const [winOptions, setWinOptions] = useState<TOption>([]);
	const {
		squares,
		handleChangeSquare,
		checkWinner,
		numClicks,
		setNumClicks,
		numMarkers,
		handleAllDisabled
	} = useGameField(col);
	const handleChangeClick = (id: string) => {
		setNumClicks(numClicks + 1);
		setCurrentId(id);
	};
	useEffect(() => {
		if (numClicks > numMarkers + 1) {
			const winner = checkWinner(currentId);
			if (winner) {
				setWinOptions(winner);
				handleAllDisabled();
			}
		}
	}, [currentId, numClicks, numMarkers]);
	return (
		<div
			className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        grid gap-[10px]`}
			style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}
		>
			{squares.map((square) => (
				<Square
					key={square.id}
					id={square.id}
					squareMarker={square.squareMarker}
					handleChangeSquare={(id, marker) => handleChangeSquare(id, marker)}
					handleChangeClick={handleChangeClick}
					isWinner={winOptions.includes(square.id)}
					isDisabled={square.disabled}
				/>
			))}
		</div>
	);
};

interface ISquare {
	id: string;
	squareMarker: TMarker;
	handleChangeSquare: (id: string, marker: TMarker) => void;
	handleChangeClick: (id: string) => void;
	isWinner: boolean;
	isDisabled: boolean;
}

const Square = ({
	id,
	handleChangeSquare,
	squareMarker,
	handleChangeClick,
	isWinner,
	isDisabled
}: ISquare) => {
	const { marker, handleChangeMarker } = useContext(PlayerMoveContext);
	function handleClick() {
		handleChangeMarker();
		handleChangeSquare(id, marker);
		handleChangeClick(id);
	}

	const winStyle = isWinner ? "border-red-500" : "border-indigo-500";

	return (
		<button
			id={id}
			onClick={handleClick}
			disabled={isDisabled}
			className={`flex items-center
						border-4 ${winStyle}
                        sm:px-4 sm:py-3 px-2 py-2
                        sm:w-[80px] sm:h-[80px] w-[50px] h-[50px]
                        ${!isDisabled ? "hover:bg-neutral-200" : ""}`}
		>
			{squareMarker && markers[squareMarker]}
		</button>
	);
};
