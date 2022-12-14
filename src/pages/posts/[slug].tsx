import { GetServerSideProps } from "next"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { RichText } from "prismic-dom"
import { prismicClient } from "../../services/prismic"
import styles from "./post.module.scss"

interface PostProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updatedAt: string
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{__html: post.content}}
                    />
                </article>
            </main>
        </>
    )
}

interface NewSessionProps extends Session {
    activeSubscription: string | null
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req }) as NewSessionProps
    const { slug } = params
    
    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const response = await prismicClient.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        }
    }
}