interface QuizOptionsProps {
  options: string[];
  selectedOption: number | null;
  setSelectedOption: (index: number) => void;
}

const QuizOptions: React.FC<QuizOptionsProps> = ({ options, selectedOption, setSelectedOption }) => {
  const buttonColors = ["bg-blue-300", "bg-red-300", "bg-yellow-300", "bg-purple-300"];

  return (
    <div className="m-12 space-y-4">
      {options.map((option, index) => (
        <div>
          <button
            key={index}
            onClick={() => {
              setSelectedOption(index);
            }}
            className={`filter relative w-40 min-w-52 rounded-lg px-2 py-4 text-2xl font-semibold transition ${buttonColors[index]} ${selectedOption === index ? "scale-90 ring ring-gray-500 brightness-90" : "scale-100"} `}
            style={{ left: `calc(${index * 40}px - 60px)` }}
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizOptions;
