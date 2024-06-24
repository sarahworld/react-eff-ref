import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [deck, setDeck] = useState("")
  const [card, setCard] = useState("")

  useEffect(() => {
    const fetchDeck = async () => {
      const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeck(res.data);
    }
    fetchDeck();
  }, [])

  const handleClick = async () => {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
    setCard(response.data.cards[0])
  }

  const handleReshuffle = async () => {
    setCard("")
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
    setDeck(response.data);
    
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Givme Card</button>
      <div className='container'>
      <img src={card.image}></img>
      </div>
      <button onClick={handleReshuffle}>Reshuffle Card</button>
    </div>
  );
}

export default App;
