import 'styles/ViewBoxes.scss';

const NewsBox = ({ newsBoxMessage }: {
    newsBoxMessage: string
}) => {

    return (
        <div
            className="viewBox newsBox"
        >
            {newsBoxMessage}
        </div>
    );
};

export default NewsBox;