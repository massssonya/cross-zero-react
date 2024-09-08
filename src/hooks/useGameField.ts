import { useCallback, useState } from "react";
import { TMarker } from "./usePlayerMoveContext";

interface ISquareItem {
	id: string;
	squareMarker: TMarker;
}

type TOption = string[];

export const useGameField = (col: number) => {
	const numMarkers = col == 3 ? 3 : 4;
	const numValueInRow = col - numMarkers + 1;
	let items: ISquareItem[] = [];
	for (let i = 1; i <= col * col; i++) {
		items = [...items, { id: `square_${i}`, squareMarker: "" }];
	}

	function getHorizontalWinOptions(field: ISquareItem[]) {
		let options: string[][] = [];
		let iteration = 1;
		for (let i = 0; i < field.length; i = i + col) {
			let numOptions = 0;
			while (numOptions < numValueInRow) {
				let option: string[] = [];
				for (
					let j = i + numOptions;
					j < col * iteration + numOptions - numValueInRow + 1;
					j++
				) {
					option = [...option, field[j].id];
				}
				options = [...options, option];
				numOptions++;
			}
			iteration++;
		}
		return options;
	}
	function getVerticalWinOptions(field: ISquareItem[]) {
		let options: string[][] = [];
		for (let i = 0; i < col; i++) {
			let numOptions = 0;
			while (numOptions < numValueInRow) {
				let option: string[] = [];
				for (
					let j = i + numOptions;
					j < col * col + numOptions - numValueInRow + 1;
					j += col
				) {
					option = [...option, field[j].id];
				}
				options = [...options, option];
				numOptions++;
			}
		}
		return options;
	}

	function getLeftDiagonalWinOptions(field: ISquareItem[]) {
		const step = col + 1;
		let options: TOption[] = [];
		for (let i = 0; i < field.length; i = i + col) {
			let numOptions = 0;
			while (numOptions < numValueInRow) {
				let option: TOption = [];
				for (
					let j = i + numOptions;
					j < col * col + numOptions - numValueInRow + 1;
					j += col + 1
				) // let j = i+numOptions;
				// j <
				// j = j+step
				{
					option = [...option, field[j].id];
					if (option.length == numMarkers) break;
				}
				if (option.length == numMarkers) {
					options = [...options, option];
				}
				numOptions++;
			}
		}
		return options;
	}

	const winOptions = [
		getHorizontalWinOptions(items),
		getVerticalWinOptions(items)
	].reduce((acc, func) => acc.concat(func), []);

	const [squares, setSquares] = useState<ISquareItem[]>(items);

	function handleChangeSquare(id: string, squareMarker: TMarker) {
		const newSquares = squares.map((square) => {
			if (square.id === id) {
				return { ...square, squareMarker: squareMarker };
			}
			return square;
		});
		setSquares(newSquares);
	}

	// function checkHorizontal(field: ISquareItem[], length: number) {
	// 	const step = 1;
	// 	for(let i = 0; i < field.length; i++){
	// 		for()
	// 	}
	// }

	// function checkVertical() {}

	// function checkLeftDiagonal() {}

	// function checkRightDiagonal() {}

	const checkIsWinner = useCallback(
		function (field: ISquareItem[], col: number) {
			const steps = [1, -1, 0, 1 - col];

			// for (const step of steps) {
			// 	let isWinnerArr = [];
			// 	for (let i = 0; i > field.length; i + step) {

			// 	}
			// }
		},
		[squares, col]
	);

	return { squares, handleChangeSquare, checkIsWinner };
};

// function getWinOptionsHorizontal(field: ISquareItem[], length: number) {
// 	let winOptions: string[] = [];
// 	for (let i = 0; i < field.length; i++) {
// 		for (let j = i + 1; j < field.length; j++) {
// 			for (let k = j + 1; k < field.length; k++) {
// 				const winOption =
// 					field[i].squareMarker +
// 					field[j].squareMarker +
// 					field[k].squareMarker;
// 				if (winOption.length === length) {
// 					winOptions = [...winOptions, winOption];
// 				}
// 			}
// 		}
// 	}
// 	return winOptions;
// }
