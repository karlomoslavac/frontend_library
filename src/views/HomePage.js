import React, { useState } from 'react';
import OCR from '../components/OCR';

function HomePage({ user }) {
  const [texts, setTexts] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddText = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('pageCount', pageCount);

    try {
      const response = await fetch('http://localhost:5000/api/texts', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Greška prilikom dodavanja sadržaja.');
      }
      const data = await response.json();
      setTexts([...texts, data]);
      setTitle('');
      setAuthor('');
      setPageCount(0);
      setImage(null);
    } catch (error) {
      console.error('Greška prilikom dodavanja sadržaja:', error);
      alert('Došlo je do greške prilikom dodavanja sadržaja.');
    }
  };

  const handleDeleteText = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/texts/${id}`, {
        method: 'DELETE',
      });
      setTexts(texts.filter((text) => text._id !== id));
    } catch (error) {
      console.error('Greška prilikom brisanja sadržaja:', error);
      alert('Došlo je do greške prilikom brisanja sadržaja.');
    }
  };

  return (
    <div>
      <h2>Dobrodošli, {user.username}!</h2>
      <h3>Unesite sadržaj:</h3>
      <form onSubmit={handleAddText}>
        <input type="text" placeholder="Naslov" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input type="number" placeholder="Broj stranice" value={pageCount} onChange={(e) => setPageCount(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Dodaj sadržaj</button>
      </form>
      {texts.map((text) => (
        <div key={text._id}>
          <h3>{text.title} - {text.author}</h3>
          <p>Broj stranice: {text.pageCount}</p>
          <img src={`http://localhost:5000/uploads/${text.image}`} alt="Slika sadržaja" style={{ maxWidth: '100%', height: 'auto' }} />
          <button onClick={() => handleDeleteText(text._id)}>Obriši sadržaj</button>
          <OCR textId={text._id} />
        </div>
      ))}
    </div>
  );
}

export default HomePage;
