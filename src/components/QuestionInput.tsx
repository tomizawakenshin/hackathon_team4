interface QuestionInputProps {
  question: string;
  setQuestion: (value: string) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ question, setQuestion }) => {
  return (
    <div className="flex flex-col">
      <label className="text-xl font-semibold" htmlFor="question">
        問題を出そう！
      </label>
      <textarea
        id="question"
        className="p-2 mt-2 font-semibold text-center bg-yellow-300 rounded-lg resize-none w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="問い！"
      ></textarea>
    </div>
  );
};

export default QuestionInput;
