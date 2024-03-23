import { unmountComponentAtNode } from "react-dom";
import { render,act,screen} from '@testing-library/react';
//import { act  } from "react-dom/test-utils";
import App from './App';
import { ManyPageResultsProvider, useManyPageResults  } from "./many/logic/results";

let container: HTMLDivElement;


beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
   
  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    json: () => Promise.resolve({
      count: 10,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        // Add more mock Pokémon data as needed
      ],
    }),
  });
});

afterEach(() => {


  unmountComponentAtNode(container);
  container.remove();
});


describe('App', () => {
  it('renders ManyPage when navigating to root URL', async () => {
    
  act(() => {
    render(<App />);
  });
  //expect(container.textContent).toBe(" Result Error ");
  expect(screen.getByText('Result Error')).toBeInTheDocument();


  });
});

describe('ManyPageResultsProvider', () => {

    it("renders user data", async () => {
    
    

  
      act(() => {
        render(
          <ManyPageResultsProvider>
          <MockComponent />
        </ManyPageResultsProvider>
        );
      });
       
      // Assert that Pokémon data is rendered
      
      //expect(screen.getByText('Loading')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
      // Add more assertions for other Pokémon data as needed
    });
    
      
     
 
});
function MockComponent () {
  const { results } = useManyPageResults();

  if (results.isLoading) {
    return <div>Loading...</div>;
  }

  if (results.error) {
    return <div>Error: {results.error}</div>;
  }

  return (
    <ul>
      {results?.data?.rows.map(pokemon => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ul>
  );
}