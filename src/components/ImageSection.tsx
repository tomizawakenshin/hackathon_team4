interface ImageSectionProps {
  src: string;
  alt: string;
  width: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ src, alt, width }) => {
  return (
    <div className="flex justify-center">
      <img src={src} alt={alt} className={`${width}`} />
    </div>
  );
};

export default ImageSection;
