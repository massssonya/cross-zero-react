import { useState } from "react";
import { TMarker } from "./usePlayerMoveContext";
import { ISquareItem, TOption } from "./types";
import { useWinOptions } from "./useWinOptions";

export const useGameField = (col: number) => {
	const numMarkers = col == 3 ? 3 : 4;
	const numValueInRow = col - numMarkers + 1;
	let items: ISquareItem[] = [];
	for (let i = 1; i <= col * col; i++) {
		items = [...items, { id: `square_${i}`, squareMarker: "" }];
	}
	const [squares, setSquares] = useState<ISquareItem[]>(items);
	const [numClicks, setNumClicks] = useState(0);
	const winOptions = useWinOptions({ items, col, numValueInRow, numMarkers });

	function handleChangeSquare(id: string, squareMarker: TMarker) {
		setSquares((prevSquares) => {
			return prevSquares.map((square) => {
				if (square.id === id) {
					return { ...square, squareMarker };
				}
				return square;
			});
		});
	}

	function checkRow(option: TOption, marker: TMarker) {
		if (
			option.every(
				(id) =>
					squares.find((square) => square.id === id)?.squareMarker === marker
			)
		) {
			return true;
		}
		return false;
	}

	function checkWinner(id: string) {
		// const square = squares.find((square) => square.id === id);
		// if(square) {
		// 	const marker = square.squareMarker;

		// }
		console.log(squares);

		// console.log(marker);
		// if (!marker) return false;
		// winOptions.forEach((option) => {
		// 	if (option.includes(id)) {
		// 		if (checkRow(option, marker)) {
		// 			return true;
		// 		}
		// 	}
		// });
	}

	return { squares, handleChangeSquare, checkWinner, numClicks, setNumClicks };
};
