import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSuperheroById } from '../api/index';

const SuperheroDetail = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuperheroDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSuperheroById(id);
        setSuperhero(data);
      } catch (error) {
        console.error(`Error fetching superhero with ID ${id}`, error);
      }
      setIsLoading(false);
    };

    fetchSuperheroDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading superhero details...</div>;
  }

  if (!superhero) {
    return <div>Superhero not found!</div>;
  }

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl">{superhero.name}</h2>
      <img src={superhero.image.url} alt={superhero.name} className="w-full h-auto mt-2" />
      <div>
        <h3>Power Stats:</h3>
        <ul>
          {Object.entries(superhero.powerstats).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Biography:</h3>
        <p>{superhero.biography['full-name']}</p>
        <p>{superhero.biography['place-of-birth']}</p>
      </div>
      <div>
        <h3>Appearance:</h3>
        <p>{superhero.appearance['gender']}</p>
        <p>{superhero.appearance['race']}</p>
      </div>
    </div>
  );
};

export default SuperheroDetail;