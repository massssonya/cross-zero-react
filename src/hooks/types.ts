import { TMarker } from "./usePlayerMoveContext";

export type TOption = string[];

export interface ISquareItem {
	id: string;
	squareMarker: TMarker;
}

export interface IWinOptions {
    items: ISquareItem[];
    col: number;
    numValueInRow: number;
    numMarkers: number
}

