import { useState, useEffect } from "react";

interface JobListing {
    id:number;
    languages:string;
    company:string;
    logo:string;
    postedAt:string;
    contract:string;
    position:string;
    location:string;

}

export default function JobFilter() {
  const [data, setData] = useState<JobListing[]>([]); // Stocke les données du JSON
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]); // Stocke les compétences sélectionnées

  useEffect(() => {
    fetch("/data.json") // 🔥 Assure-toi que le fichier est bien dans /public/
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Erreur de chargement du JSON:", error));
  }, []);

  // 🎯 Ajouter une compétence sélectionnée
  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Supprimer une compétence sélectionnée
  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  // Filtrage des entreprises en fonction des compétences sélectionnées
  const filteredJobs = selectedSkills.length === 0 
    ? data 
    : data.filter((job) => 
        selectedSkills.every((skill) => job.languages.includes(skill))
    );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* 🔹 Zone d'affichage des compétences sélectionnées */}
      <div className="mb-4 border p-2 rounded flex flex-wrap gap-2 bg-gray-100">
        {selectedSkills.length > 0 ? (
          selectedSkills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() => removeSkill(skill)} //  Cliquer pour supprimer
            >
              {skill} ✖
            </span>
          ))
        ) : (
          <p className="text-gray-400">Cliquez sur une compétence pour filtrer...</p>
        )}
      </div>

      {/* 🔹 Affichage des offres filtrées */}
      {filteredJobs.map((job) => (
        <div key={job.id} className="border p-4 mb-4 rounded shadow">
          <div className="flex items-center space-x-4">
            <img src={job.logo} alt={job.company} className="w-10 h-10" />
            <div>
              <h2 className="text-lg font-bold">{job.company}</h2>
              <h3 className="text-black">{job.position}</h3>
              <p>{job.postedAt} • {job.contract} • {job.location}</p>
            </div>
          </div>
          {/* 🔹 Affichage des compétences cliquables */}
          <div className="flex space-x-2 mt-2">
            {job.languages.map((lang, index) => (
              <button 
                key={index} 
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                onClick={() => addSkill(lang)} // 🎯 Ajouter une compétence
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
