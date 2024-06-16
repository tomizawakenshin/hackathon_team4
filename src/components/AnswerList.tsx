interface AnswerListProps {
  answers: string[];
  handleAnswerChange: (index: number, value: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({ answers, handleAnswerChange }) => {
  return (
    <div className="flex flex-col mt-5">
      <p className="text-xl">4つの回答を入力してください:</p>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            id={`answer${index}`}
            className="p-2 mt-2 border border-gray-700 h-10 rounded-md resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={answer}
            onChange={(e) => {
              handleAnswerChange(index, e.target.value);
            }}
            placeholder={`回答${index + 1}を入力してください`}
          ></input>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;