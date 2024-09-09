import { useCallback } from "react";
import { ISquareItem, TOption, IWinOptions } from "./types";

export const useWinOptions = ({
	items,
	col,
	numValueInRow,
	numMarkers
}: IWinOptions) => {
	const getHorizontalWinOptions = useCallback(
		function (field: ISquareItem[]) {
			let options: TOption[] = [];
			let iteration = 1;
			for (let i = 0; i < field.length; i = i + col) {
				let numOptions = 0;
				while (numOptions < numValueInRow) {
					let option: TOption = [];
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
		},
		[col, numValueInRow]
	);

	const getVerticalWinOptions = useCallback(
		function (field: ISquareItem[]) {
			let options: TOption[] = [];
			for (let i = 0; i < col; i++) {
				let numOptions = 0;
				while (numOptions < numValueInRow) {
					let option: TOption = [];
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
		},
		[col, numValueInRow]
	);

	const getDiagonalWinOptions = useCallback(
		function (field: ISquareItem[]) {
			const diagonals = [
				{ step: col + 1, init: 0 },
				{ step: col - 1, init: numMarkers - 1 }
			];
			let options: TOption[] = [];
			diagonals.forEach((diagonal) => {
				for (let i = diagonal.init; i < field.length; i = i + col) {
					let numOptions = 0;
					while (numOptions < numValueInRow) {
						let option: TOption = [];
						for (
							let j = i + numOptions;
							j <= i + numOptions + diagonal.step * (numMarkers - 1);
							j = j + diagonal.step
						) {
							if (field[j] !== undefined) {
								option = [...option, field[j].id];
							}
						}
						if (option.length == numMarkers) {
							options = [...options, option];
						}
						numOptions++;
					}
				}
			});
			return options;
		},
		[col, numValueInRow, numMarkers]
	);

	const winOptions = [
		getHorizontalWinOptions(items),
		getVerticalWinOptions(items),
		getDiagonalWinOptions(items)
	].reduce((acc, func) => acc.concat(func), []);

	return winOptions;
};
