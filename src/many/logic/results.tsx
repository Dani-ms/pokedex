import { useState, useEffect, createContext, ReactNode, useMemo, useContext } from 'react';
import { throwError } from './throw-error';

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

type ResultContextType = {
  results: Results
}
const ResultContext = createContext<ResultContextType | null>(null);

export function ManyPageResultsProvider(props: { children: ReactNode }){
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
        results:Array<{
          name: string,
          url: string
        }>
      }


      setResults({
        data: {
          limit,
          offset,
          total: responseJSON.count,
          rows: responseJSON.results
        }
      })
    })()

  }, []);

  const value = useMemo( () => { 
    return {results}
  }, [results])

  return <ResultContext.Provider value={value}>
    {props.children}
  </ResultContext.Provider>
}

export function useManyPageResults(){
  return useContext(ResultContext) || throwError()
}