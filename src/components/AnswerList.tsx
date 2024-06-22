interface AnswerListProps {
  answers: string[];
  handleAnswerChange: (index: number, value: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  handleAnswerChange,
}) => {
  return (
    <div className="flex flex-col mt-8">
      <p className="mb-2 text-3xl font-semibold">4つの回答を準備...</p>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            id={`answer${index}`}
            className="p-2 mb-6 h-16 text-2xl font-semibold text-center bg-yellow-300 rounded-lg resize-none w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            value={answer}
            onChange={(e) => {
              handleAnswerChange(index, e.target.value);
            }}
            placeholder={`回答${index + 1}`}
          ></input>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
