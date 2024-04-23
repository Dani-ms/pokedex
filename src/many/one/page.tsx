import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


type Details = { 
  isLoading?: boolean,
  error ?: 'connection-failure' | 'api-failure',
  data?: {
    name: string,
    weight: number,
    height:number,
    abilities:Array<{
      name: string,
      url: string
    }>,
    species:Array<{
      name: string,
      url: string
    }>,
    sprites: {
      back_default: string,
      back_shiny: string,
      front_default:string
    },
    base_experience: number,
  }
}

export function OnePage(){

  const [details, setDetails] = useState<Details>({ isLoading:false});
  const { name: id } = useParams<{ name: string }>(); 
  const navigate = useNavigate();

  useEffect( () => {
    (async () => {
      setDetails({ isLoading: true })

      let response: Response;

      try {
        response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
          {
            method: "GET",        
          })
      } catch (err) {
        setDetails({
          error: 'connection-failure'
        })

        return;
      }

      if (response.status !== 200) {
        setDetails({
          error: 'api-failure'
        })

        return;
      }
      
     
      const responseJSON = await response.json()
      
      

      setDetails({
        data: responseJSON
      })
    })()

  },[id]);

  if(details.data){
    return (
      <>
      <div>
        <div className="display-flex center">
          <button onClick={() => navigate(-1)}>
            Voltar        
          </button>
          <h1>Detalhes do item</h1>
        </div>
        
        
        <ul>
          
            <img src={details.data.sprites.front_default} alt={details.data.name} />
         
          <h1>{details.data.name}</h1>
          <p>Height: {details.data.height} kg</p>
          <p>Weight: {details.data.weight} </p>
          <p>Experience: {details.data.base_experience} </p>
        </ul>
      </div>
      </>
    )
  }


}