import { ManyPageResultsProvider, useManyPageResults } from "./logic/results";

function _ManyPage() {
  const { results } = useManyPageResults();

  if(results.isLoading) {
    return
  }

  if (results.error) {
    return(
      <div>
        <p> Result Error </p>
      </div>
    )
  }

  if(results.data) {
    return(
      <>
      <div>
        <h1> Pokedex</h1>
        <ul>
          <li>
            {results.data.total}
          </li>
          {results.data.rows.map( (row, index) => {
            return <li key={index}>
              
                <a href={row.url}>{row.name}</a>
              </li>
            
          }
            
           
          )}
        </ul>
      </div>
      </>
    )
  }
} 

export function ManyPage(){

  return(
    <ManyPageResultsProvider>
     
      <_ManyPage />
    
    </ManyPageResultsProvider>
  
  )
}