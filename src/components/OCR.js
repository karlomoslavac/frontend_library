import React, { useState } from 'react';

function OCR({ textId }) {
  const [scannedText, setScannedText] = useState('');

  const handleOCR = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/texts/${textId}/ocr`, {
        method: 'POST',
      });
      const data = await response.json();
      setScannedText(data.text);
    } catch (error) {
      console.error('Greška prilikom OCR-a:', error);
      alert('Došlo je do greške prilikom skeniranja teksta.');
    }
  };

  return (
    <div>
      <button onClick={handleOCR}>Skeniraj tekst</button>
      {scannedText && (
        <div>
          <h3>Digitalizirani tekst:</h3>
          <p>{scannedText}</p>
        </div>
      )}
    </div>
  );
}

export default OCR;
