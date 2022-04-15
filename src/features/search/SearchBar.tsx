import React, { useEffect, useState } from 'react';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import ResultsList from './ResultsList';
import SearchResult from './SearchResult';

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const type:string = "people";

  // Queries the DB only when the first character is typed into search bar. The results are then stored in initialResults (for further filtering) until the search bar is cleared (by backspacing, for instance)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  useEffect(() => {
    if (input !== "") {
      console.log(input);

      const getSearch = async () => {
        const resp = await reverbClientWithAuth.get(`/api/search?query=${input}`);
        console.log(resp);
        if (resp.status.toString()[0] === "2" && resp.data.responses.length)
          setResults(resp.data.responses);
        else
          setResults([]);
      }

      getSearch();
    }
  }, [input]);

  return (
    <div id='search-container'>
      {console.log(results)}
      <input
        placeholder="Search for People"
        aria-label="search-input"
        aria-describedby="basic-addon1"
        value={input}
        onChange={handleChange}
      />
      {input && <ResultsList results={results} type={type} />}
    </div>
  );
}
