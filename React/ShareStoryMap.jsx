import React from 'react';
import debug from 'sabio-debug';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ShareStoryMap(props) {
    const _logger = debug.extend('ShareStoryMap');
    _logger('Share Story Map Logger is Working');
    _logger('props', props);

    const navigate = useNavigate();

    const aStory = props.story;

    const onClickEdit = (e) => {
        e.preventDefault();
        const nav1 = { type: 'STORY_UPDATE', payload: aStory };
        navigate(`/sharestory/${aStory.id}/`, { state: nav1 });
    };

    return (
        <div className="mentoring-story-container">
            <div className="mentoring-story-title-container">
                <div className="mentory-story-title">
                    {aStory.name}

                    {props.user.id === props.story.createdBy && (
                        <button onClick={onClickEdit} type="button" className="btn btn-dark sseditbutton">
                            Edit
                        </button>
                    )}
                </div>
            </div>
            <div className="share-story-content">
                <div className="mentory-story-content-container col-6">
                    <div className="mentoring-story-image-container">
                        {aStory.files?.map((file, i) => (
                            <img
                                key={`share-story-image-${i}-${file.name}`}
                                src={file.url}
                                alt={file.name}
                                className="story-image-container2"
                            />
                        ))}
                    </div>
                </div>
                <div className="mentorying-story-content-container1">{aStory.story}</div>
            </div>
        </div>
    );
}

ShareStoryMap.propTypes = {
    story: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        createdBy: PropTypes.number.isRequired,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                name: PropTypes.string,
            })
        ).isRequired,

        story: PropTypes.string.isRequired,
    }),
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
};
export default ShareStoryMap;
