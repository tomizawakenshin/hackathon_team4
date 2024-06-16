interface QuestionInputProps {
  question: string;
  setQuestion: (value: string) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ question, setQuestion }) => {
  return (
    <div className="flex flex-col">
      <label className="text-xl" htmlFor="question">
        問題を入力してください:
      </label>
      <textarea
        id="question"
        className="p-2 mt-2 border border-gray-700 rounded-md resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="問題を入力してください"
      ></textarea>
    </div>
  );
};

export default QuestionInput;