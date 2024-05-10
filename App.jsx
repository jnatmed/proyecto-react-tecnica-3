import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`


export function App() {

    /**
     * aca puede ir el useState
     * y luego el useEffect
     * donde el useEffect va a usar los estados de useState
     */

    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    useEffect(()=>{

        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": "DEMO-API-KEY"
          });
          
          var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
          };
          
          fetch(CAT_ENDPOINT_RANDOM_FACT, requestOptions)
            .then(response => response.json())
            .then(data => {
                const {description} = data[0].breeds[0]            
                setFact(description)

                const threeFirstWords = description.split(' ', 3).join(' ')
                console.log(threeFirstWords)

                fetch(`https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`)
                    .then(response => response.json())
                    .then(res => {
                        const {url} = res[0]
                        setImageUrl(url)
                    } )

            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <main>
            <h1>App de gatitos </h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`Image extrated using the first three words for ${fact}`} />}
            
        </main>

    )
}