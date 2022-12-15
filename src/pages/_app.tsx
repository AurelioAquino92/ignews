import { AppProps } from "next/app"
import { Header } from "../components/Header"
import '../styles/global.scss'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import Link from "next/link"
import { PrismicProvider } from "@prismicio/react"
import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from '../../prismicio'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
      <PrismicPreview repositoryName={repositoryName}>
        <NextAuthProvider session={pageProps.session}>
          <Header/>
          <Component {...pageProps} />
        </NextAuthProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
}

export default MyApp
