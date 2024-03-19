import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      console.log(responseJSON)
      

      setDetails({
        data: responseJSON
      })
    })()

  },[id]);

  if(details.data){
    return (
      <>
      <div>
        <h1>Detalhes do item</h1>
        <ul>
          
              <img src={details.data.sprites.front_default} alt=''/>
         
          <li>{details.data.name}</li>
          <li>{details.data.height}</li>
          <li>{details.data.weight}</li>
        </ul>
      </div>
      </>
    )
  }


}