import {  useState } from "react";
import { TMarker } from "./usePlayerMoveContext";
import { ISquareItem } from "./types";
import { useWinOptions } from "./useWinOptions";

export const useGameField = (col: number) => {
	const numMarkers = col == 3 ? 3 : 4;
	const numValueInRow = col - numMarkers + 1;
	let items: ISquareItem[] = [];
	for (let i = 1; i <= col * col; i++) {
		items = [...items, { id: `square_${i}`, squareMarker: "" }];
	}
	const [squares, setSquares] = useState<ISquareItem[]>(items);
	const winOptions = useWinOptions({ items, col, numValueInRow, numMarkers })

	function handleChangeSquare(id: string, squareMarker: TMarker) {
		const newSquares = squares.map((square) => {
			if (square.id === id) {
				return { ...square, squareMarker: squareMarker };
			}
			return square;
		});
		setSquares(newSquares);
	}

	// function checkWinner(marker: string){
	// 	squares.
	// }
	

	return { squares, handleChangeSquare };
};
