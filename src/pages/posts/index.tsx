import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './styles.module.scss'
import { prismicClient } from '../../services/prismic';

interface PostProps {
    publications: {
        id: string,
        uid: string,
        href: string,
        first_publication_date: Date,
        title: string,
        text: string
    }[]
}

export default function Posts({publications}: PostProps) {
    
    return (
        <>
            <Head>
                <title>Posts | IgNews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {publications.map((publication) => (
                        <a href={publication.href}>
                            <time>12 de março de 2022</time>
                            <strong>{publication.uid}</strong>
                            <p>informações do post para leitura</p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const publications = await prismicClient.getAllByType('publication', {
        fetch: ['title', 'content'],
        pageSize: 100
    })
    return {
        props: {
            publications
        },
        revalidate: 60 * 60 * 24
    }
}