import { ManyPageResultsProvider, useManyPageResults } from "./logic/results";
import { Results } from "./components/results";
import LoadingImg from '../assets/loading.gif'

function _ManyPage() {
  const { results, setOffset } = useManyPageResults();

  
  if(results.isLoading) {
    return (
     
      <img src={LoadingImg} alt= "loading"/>
    )
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
      <Results
      limit={results.data.limit}
      offset={results.data.offset}
      total={results.data.total}
      rows={results.data.rows}
      setOffset={setOffset}
      />
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