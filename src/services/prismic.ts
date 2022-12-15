import * as prismic from '@prismicio/client'

const routes = [
    {
      type: 'publication',
      path: '/posts',
    },
  ]

const repoName = 'ignews-aurelio'
const endpoint = prismic.getEndpoint(repoName)
export const prismicClient = prismic.createClient(
    endpoint, 
    {
        routes,
        fetch,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
)

