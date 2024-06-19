interface SubmitButtonProps {
  isFormValid: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isFormValid }) => {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={!isFormValid}
        className={`mt-2 w-full max-w-28 px-4 py-2 font-semibold text-white rounded-full ${isFormValid ? "bg-red-300" : "bg-gray-400"}`}
      >
        出題!
      </button>
    </div>
  );
};

export default SubmitButton;
