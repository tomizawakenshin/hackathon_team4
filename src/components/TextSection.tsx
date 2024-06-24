interface TextSectionProps {
  mainText: string;
  subText: string;
  description: string;
}

const TextSection: React.FC<TextSectionProps> = ({
  mainText,
  subText,
  description,
}) => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold my-8">{mainText}</h1>
      <p className="text-3xl font-bold mb-1">{subText}</p>
      <p className="text-xl font-semibold mt-2 mb-4">{description}</p>
    </div>
  );
};

export default TextSection;
