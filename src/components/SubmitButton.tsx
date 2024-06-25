interface SubmitButtonProps {
  isFormValid?: boolean;
  handleSubmit?: () => void;
  selectedOption?: number | null;
  buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isFormValid,
  handleSubmit,
  selectedOption,
  buttonText,
}) => {
  const isDisabled =
    isFormValid !== undefined ? !isFormValid : selectedOption == null;

  return (
    <div className="flex justify-center">
      <button
        onClick={handleSubmit}
        disabled={isDisabled}
        className={`w-full max-w-36 px-4 py-2 text-2xl font-semibold text-white rounded-full ${
          isDisabled ? "bg-gray-400" : "bg-red-300"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SubmitButton;
