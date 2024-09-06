import { Link } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import styles from "./Menu.module.css"

export const Menu = () => {
    return (
        <>
            <Layout position="center">
                <h1 className={styles.header}>
                    <p className="text-orange-500">Cross</p>
                    <p className="text-indigo-500">Zero</p>
                    <p className="text-blue-500">React</p>
                </h1>
                <div className={styles.container} >
                    <Link to="/game" className={styles.button}>Новая игра</Link>
                </div>
            </Layout>
        </>
    )
}