interface TeamHeaderProps {
    teamName: string;
    imageSrc?: string;
}

const AnswerPage_TeamHeader: React.FC<TeamHeaderProps> = ({ teamName, imageSrc }) => {
    return (
        <div>
            <span className="px-4 py-2 text-xl font-semibold absolute top-4 left-1">
                <div className="text-center pt-3">
                    <div>「{teamName}」からの</div>
                    <div>出題です！</div>

                </div>
            </span>
            <img src={imageSrc} alt="" className="absolute top-2 right-2 w-28" />
        </div>
    );
};

export default AnswerPage_TeamHeader;
