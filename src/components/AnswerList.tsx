interface AnswerListProps {
  answers: string[];
  handleAnswerChange: (index: number, value: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  handleAnswerChange,
}) => {
  return (
    <div className="flex flex-col mt-5">
      <p className="mb-2 text-xl font-semibold">4つの回答を準備...</p>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            id={`answer${index}`}
            className="p-2 mb-6 font-semibold text-center bg-yellow-300 h-10 rounded-lg resize-none w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
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
