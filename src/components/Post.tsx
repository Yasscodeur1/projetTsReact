import { useState, useEffect } from "react";
import "./Post.css";

interface JobListing {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  role: string;
  level: string;
  languages: string[];
  tools?: string[];
}

export default function Post() {
  const [data, setData] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [inputText, setInputText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFilterVisibel, setIsFilterVisibel] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error loading JSON:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour vider l'input et les compétences sélectionnées
  const handleClear = () => {
    setInputText("");
    setSelectedSkills([]);

    setIsFilterVisibel(false);
  };

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => [...prevSkills, skill]);
      setIsFilterVisibel(true); // Correction ici
    }
  };

  const removeSkill = (skill: string) => {
    const newFilters = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newFilters);

    if (newFilters.length === 0) {
      setIsFilterVisibel(false); // Correction ici
    }
  };

  // Filtrage des données basé sur les compétences sélectionnées et le texte de recherche
  const filteredData = data.filter((item) => {
    const tags = [
      item.role,
      item.level,
      ...item.languages,
      ...(item.tools || []),
    ].map((tag) => tag.toLowerCase());
    return (
      tags.some((tag) => tag.includes(inputText)) &&
      (selectedSkills.length === 0 ||
        selectedSkills.every((skill) => tags.includes(skill.toLowerCase())))
    );
  });

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Une erreur s'est produite lors du chargement des données.</p>;
  }

  return (
    <div className=" bg-emerald-50 pt-12 md:w-full">
      {isFilterVisibel && (
        <div className="select mx-20 shadow-2xl p-4 rounded flex flex-wrap justify-between items-center bg-white absolute top-10 lg:top-18 xl:top-30 2xl:top-60">
          <div className="flex flex-wrap gap-3 ">
            {selectedSkills.map((skill, index) => (
              <p
                key={index}
                className=" bg-emerald-100 text-emerald-900 font-bold pl-1.5 rounded cursor-pointer flex items-center text-sm md:text-lg"
              >
                {skill}
                <span
                  onClick={() => removeSkill(skill)}
                  className="bg-emerald-700 text-white px-3 py-1.5 rounded-e cursor-pointer ml-2 hover:bg-black"
                >
                  ✖
                </span>
              </p>
            ))}
          </div>

          <button
            onClick={handleClear}
            className="text-cyan-800 px-4 py-2 rounded-md underline font-bold text-sm md:text-xl cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
      {filteredData.map((item) => (
        <ul
          key={item.id}
          className={`flex justify-between items-center shadow-2xl p-3 m-5 my-10 mx-40 bg-white flex-wrap md:mx-20 rounded ${
            item.featured ? "border-l-4 border-emerald-700" : ""
          }`}
        >
          <li className="flex items-center gap-5 m-3 p-3 flex-wrap">
            <img className="logo" src={item.logo} alt={item.company} />
            <div className="flex flex-col gap-1.5">
              <div>
                <span className="text-emerald-800 font-bold text-xl">
                  {item.company}
                </span>
                {item.new && (
                  <span className="ml-2 text-white bg-green-700 px-2 py-1 rounded-full text-sm">
                    New
                  </span>
                )}
                {item.featured && (
                  <span className="ml-2 text-white bg-gray-900 px-2 py-1 rounded-full text-sm">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-black">{item.position}</h1>
              <p>
                {item.postedAt} • {item.contract} • {item.location}
              </p>
            </div>
          </li>
          <div className="tag flex mr-16 h-full mt-2 md:m-5">
            {[
              item.role,
              item.level,
              ...item.languages,
              ...(item.tools || []),
            ].map((tag, index) => (
              <button
                key={index}
                className=" btn px-2 h-5 cursor-pointer bg-gray-200 rounded mr-2 flex flex-wrap "
                onClick={() => addSkill(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </ul>
      ))}
    </div>
  );
}
