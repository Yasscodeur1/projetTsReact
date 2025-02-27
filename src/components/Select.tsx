import { ChangeEvent } from "react";

interface Select {
  input: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedSkills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
}


const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.toLowerCase());
  };

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => [...prevSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

const Select = ({
  input,
  onChange,
  selectedSkills,
  addSkill,
  removeSkill,
}: SelectProps) => {
  return (
    <div>
      {/* Champ de saisie */}

      {/* Liste des compétences sélectionnées */}
      <div className="mb-4 border p-2 rounded flex flex-wrap gap-2 bg-gray-100">
        {selectedSkills.length > 0 ? (
          selectedSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() => removeSkill(skill)} // Cliquer pour supprimer
            >
              {skill} ✖
            </span>
          ))
        ) : (
          <p className="text-gray-400">
            Cliquez sur une compétence pour filtrer...
          </p>
        )}
      </div>
    </div>
  );
};

export default Select;

