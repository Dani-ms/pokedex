import { useState, useEffect } from 'react';

type Results = { 
  isLoading?: boolean,
  error ?: 'connection-failure' | 'api-failure',
  data?: {
    limit: number,
    offset: number,
    total: number,
    rows:Array<{
      name: string,
      url: string
    }>
  }
}

export function ManyPageResultsProvider(){
  const [results, setResults] = useState<Results>({ isLoading:false});

  useEffect( () => {
    (async () => {
      let response: Response;

      const limit = 10;
      const offset = 0;
      
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append('limit', limit.toString());
      urlSearchParams.append('offset', offset.toString());
      
      try {
        response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?${urlSearchParams.toString()}`,
          {
            method: "GET",        
          })
      } catch (err) {
        setResults({
          error: 'connection-failure'
        })

        return;
      }

      if (response.status !== 200) {
        setResults({
          error: 'api-failure'
        })

        return;
      }
      
      const responseJSON = await response.json() as {
        count: number,
        result:Array<{
          name: string,
          url: string
        }>
      }

      setResults({
        data: {
          limit,
          offset,
          total: responseJSON.count,
          rows: responseJSON.result
        }
      })
    })()

  }, []);

  return <></>
}