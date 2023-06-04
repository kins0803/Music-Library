import { useEffect, useState } from 'react'
import Gallery from './Components/Gallery'
import SearchBar from './Components/SearchBar'

function App() {
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const API_URL = `https://itunes.apple.com/search?term=${encodeURI(search)}`
        console.log(API_URL)
        const response = await fetch(API_URL)
        const data = await response.json()
        console.log(data)
        if (data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Not Found')
        }
      }

      if (search) fetchData()
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

    return (
        <div>
            <SearchBar handleSearch={handleSearch}/>
            {message}
            <Gallery data={data} />
        </div>
    )
}

export default App