import {Html, Head, Main, NextScript} from 'next/document'

/* como nao tem como mexer na raiz do HTML, cria esse arquivo para poder adicionar fontes etc
atente-se para as TAGS, que sao importadas do NEXT*/
export default function Document(){
  return(
    <Html>
      <Head>

      {/* Nao esqueca de colocar tudo em CamelCase e passar valores
      voce nao esta em um arq HTML normal */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />


      </Head>
      <body className='bg-gray-900 bg-app bg-no-repeat bg-cover'>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}