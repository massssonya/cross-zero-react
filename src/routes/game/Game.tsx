import { useContext } from "react";
import { GameField } from "../../components/GameField/GameField";
import { Layout } from "../../components/layout/Layout";
import { PlayerMoveProvider, PlayerMoveContext } from "../../hooks/usePlayerMoveContext"
import { markers } from "../../constants/Markers"
import styles from "./Game.module.css";




export const GameLayout = () => {
    return (
        <PlayerMoveProvider>
            <Layout position="full">
                <Game />
            </Layout>
        </PlayerMoveProvider>
    )
}

const Game = () => {
    const { marker } = useContext(PlayerMoveContext)
    return (
        <>
            <header className={styles.header}>
                <h2 className={styles["right-text"]}>Ход игрока: <span>{marker && markers[marker]}</span></h2>
            </header>
            <GameField col={3} />
        </>
    )
}