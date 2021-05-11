import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
   return (
      <div>
         <Head>
            <title>Country Learning Fun</title>
            <meta
               name='description'
               content='Simple app for learning about different countries'
            />
            <link rel='icon' href='/favicon.ico' />
         </Head>
      </div>
   )
}
