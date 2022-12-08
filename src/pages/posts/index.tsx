import Head from 'next/head';
import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | IgNews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>12 de março de 2022</time>
                        <strong>Creating a new Repo</strong>
                        <p>informações do post para leitura</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2022</time>
                        <strong>Creating a new Repo</strong>
                        <p>informações do post para leitura</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2022</time>
                        <strong>Creating a new Repo</strong>
                        <p>informações do post para leitura</p>
                    </a>
                </div>
            </main>
        </>
    );
}