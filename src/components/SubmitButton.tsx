const SubmitButton: React.FC = () => {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="mt-4 w-full max-w-40 px-4 py-2 text-white bg-blue-500 rounded"
      >
        投稿
      </button>
    </div>
  );
};

export default SubmitButton;
