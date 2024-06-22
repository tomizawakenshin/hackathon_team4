interface QuizQuestionProps {
  question: string;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question }) => {
  return (
    <div className="text-center max-w-80">
      <h1 className="mb-6 text-3xl font-bold">問題!</h1>
      <p className="text-xl font-semibold">{question}</p>
    </div>
  );
};

export default QuizQuestion;
