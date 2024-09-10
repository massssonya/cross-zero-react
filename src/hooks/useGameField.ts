import { useState } from "react";
import { TMarker } from "./usePlayerMoveContext";
import { ISquareItem, TOption } from "./types";
import { useWinOptions } from "./useWinOptions";

export const useGameField = (col: number) => {
	const numMarkers = col == 3 ? 3 : 4;
	const numValueInRow = col - numMarkers + 1;
	let items: ISquareItem[] = [];
	for (let i = 1; i <= col * col; i++) {
		items = [
			...items,
			{ id: `square_${i}`, squareMarker: "", disabled: false }
		];
	}
	const [squares, setSquares] = useState<ISquareItem[]>(items);
	const [numClicks, setNumClicks] = useState(0);
	const winOptions = useWinOptions({ items, col, numValueInRow, numMarkers });

	function handleChangeSquare(id: string, squareMarker: TMarker) {
		setSquares((prevSquares) => {
			return prevSquares.map((square) => {
				if (square.id === id) {
					return { ...square, squareMarker, disabled: true };
				}
				return square;
			});
		});
	}

	function handleAllDisabled() {
		setSquares((prevSquares) => {
			return prevSquares.map((square) => {
				return { ...square, disabled: true };
			});
		});
	}

	function checkRow(option: TOption, marker: TMarker) {
		return option.every(
			(id) =>
				squares.find((square) => square.id === id)?.squareMarker === marker
		);
	}

	function checkWinner(id: string) {
		const square = squares.find((square) => square.id === id)?.squareMarker;
		if (square) {
			const option = winOptions.find((option) => checkRow(option, square));
			if (option) {
				return option;
			}

			return false;
		}
	}

	return {
		squares,
		numMarkers,
		handleChangeSquare,
		checkWinner,
		numClicks,
		setNumClicks,
		handleAllDisabled
	};
};
