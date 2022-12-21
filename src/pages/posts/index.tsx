import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './styles.module.scss'
import { prismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom'
import Link from 'next/link';

type Post = {
    slug: string,
    title: string,
    summary: string,
    updatedAt: string
}

interface PostProps {
    posts: Post[]
}

export default function Posts({posts}: PostProps) {
    
    return (
        <>
            <Head>
                <title>Posts | IgNews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.summary}</p>
                        </Link>
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

    const posts = publications.map(publication => {
        return {
            slug: publication.uid,
            title: RichText.asText(publication.data.title),
            summary: publication.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(publication.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            posts
        },
        revalidate: 60 * 60 * 24
    }
}