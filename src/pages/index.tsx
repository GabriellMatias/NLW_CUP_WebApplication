import Image from 'next/image'
import appPreviewImg from '../assets/app_nlw_cup.png'
import logoImg from  '../assets/logo.svg'
import avatarUsers from '../assets/avatar_users.png'
import checkImg from '../assets/icon_check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps{
  poolCount: number
  guessCount: number
  userCount: number
}



export default function Home(props:HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function handleCreatePool(event:FormEvent){
    event.preventDefault()
  
    try{
      
    const response = await api.post('/pools', {
      title: poolTitle,
    })

    /* pegando codigo que e gerado quando cria cada bolao*/
    const {code} = response.data

    /* copiando o codigo para a area de transferencia do usuario para ele usar*/
    await navigator.clipboard.writeText(code)

    alert("Bolao Criado com Sucesso, Codigo Copiado para a Area de transferencia")
    setPoolTitle('')
    }
    catch (err){
      console.log(err)
      alert("Falha ao criar o bolao")
    }

  }

  return (
    <div className='max-w-[1124px] mx-auto grid grid-cols-2 h-screen items-center gap-28'>
      
      <main>
        <Image src={logoImg} alt=""/>

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='flex mt-10 items-center gap-2 '>
          <Image src={avatarUsers} alt=""/>
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500 '>+{props.userCount} </span>
            pessoas já estão usando
            </strong>
        </div>

        <form className='mt-10 flex gap-2' onSubmit={handleCreatePool}>
            <input className='flex-1 rounded px-6 py-4 border
             border-gray-600 bg-gray-800 text-sm text-gray-100 '
            type="text"
            required 
            placeholder='Qual nome o seu bolao' 
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
            />
            <button 
            type='submit' 
            className='bg-yellow-500 rounded px-6 py-4
             text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'>
              Criar meu Bolao
              </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <footer className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6 '>
            <Image src={checkImg} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Boloes Criados</span>
            </div>
          </div>

            <div className='w-px h-14 bg-gray-600'/>

          <div className='flex items-center gap-6 '>
            <Image src={checkImg} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </footer>
      </main>

      {/* o next faz otimizacao da imagem, por isso nao usa img e sim o componente IMAGE do next */}
      <Image 
      src={appPreviewImg} 
      alt="Dois Celulares Exibindo o Aplicativo Mobile" 
      quality={100}/>
    </div>
  )
}


/* fazendo com que o server consiga retornar o count mesmo se o JS da pagina seja 
desabilitado*/
export const getServerSideProps =async () => {
  // const poolCountResponse = await api.get("pools/count")
  // const guessCountResponse = await api.get("guesses/count")
  
 /* subistitiu o codigo a cima pois nao e perfomatico fazer duas chamadas com o awai, pois 
 uma nao depende da outra, elas sao individuais, no codigo de cima espera fazer a chamada 
 do pool e so depois faz a chamada do guess. o Promise.all resolve isso*/
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count")
  ])

  return{
    props:{
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}
