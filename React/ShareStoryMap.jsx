import React from 'react';
import debug from "sabio-debug"
import {useNavigate} from "react-router-dom"
import PropTypes from "prop-types"


function ShareStoryMap(props){
    const _logger = debug.extend("ShareStoryMap")
    _logger("Share Story Map Logger is Working")
    _logger("props", props)

    const navigate = useNavigate();

    const aStory = props.story

    const onClickEdit = (e) =>{
        e.preventDefault();
        navigate(`/story/edit`, {state: aStory})


    }

    return (
        <div className="mentoring-story-container">
            <div className="mentoring-story-title-container">
                <div className="mentory-story-title">
                    {aStory.name}
                   
                    <button onClick={onClickEdit} type="button" className="btn btn-dark sseditbutton">Edit</button>
                   
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
                                className="col-6"
                            />
                        ))}
                    </div>
                </div>
                <div className="mentorying-story-content-container col-6">{aStory.story}</div>
               
            </div>
        </div>
    );
}

ShareStoryMap.propTypes = {
    story: PropTypes.shape({
       name: PropTypes.string.isRequired,
       files: PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
       }).isRequired,
       story: PropTypes.string.isRequired,
    })

}
export default ShareStoryMap;
