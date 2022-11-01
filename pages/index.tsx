

interface HomeProps{
  count: number
}

export default function Home(props:HomeProps) {

  return (
    <h1>contagem: {props.count}</h1>
  )
}


/* fazendo com que o server consiga retornar o count mesmo se o JS da pagina seja 
desabilitado*/
export const getServerSideProps =async () => {
  const response = await fetch("http://localhost:3333/pools/count")
  const data = await response.json()
  
  console.log(data)
  return{
    props:{
      count: data.count,
    }
  }
}
