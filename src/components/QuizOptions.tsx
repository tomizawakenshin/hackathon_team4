interface QuizOptionsProps {
  options: string[];
  selectedOption: number | null;
  setSelectedOption: (index: number) => void;
}

const QuizOptions: React.FC<QuizOptionsProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const buttonColors = [
    "bg-blue-300",
    "bg-red-300",
    "bg-yellow-300",
    "bg-purple-300",
  ];

  return (
    <div className="flex flex-col m-12 space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedOption(index);
          }}
          className={`px-2 py-4 min-w-40 text-2xl font-semibold rounded-lg w-full transition-transform duration-300 focus:outline-none ${buttonColors[index]} ${selectedOption === index ? "scale-90 transform" : "scale-100 transform"} `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuizOptions;
