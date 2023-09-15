import React, { useState, useEffect } from "react";
import Hero from "../../components/hero";
import { getPets } from "../../api/petfinder";
import Pet from "../../components/pet";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const petNameToFind = searchParams.get("name");
  const petTypeToFind = searchParams.get("type");
  const petGenderToFind = searchParams.get("gender");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function getPetsData() {
      const petsData = await getPets(petTypeToFind, petNameToFind, petGenderToFind);

      setPets(petsData);
    }

    getPetsData();
  }, [petNameToFind, petTypeToFind, petGenderToFind]);

  return (
    <div className="page">
      <Hero displayText={`Results for ${petNameToFind}`} />

      <h3>Pets available for adoption near you</h3>

      <main>
        <div className="grid">
          {pets.map((pet) => (
            <Pet animal={pet} key={pet.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
