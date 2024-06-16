import QuestionForm from "@/components/QuestionForm";

const PostPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-700">
      <h1 className="text-4xl font-bold ">問題を投稿</h1>
      <QuestionForm />
    </div>
  );
};

export default PostPage;