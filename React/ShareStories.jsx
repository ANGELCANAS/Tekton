import React, { useState, useEffect } from 'react';
import './sharestories.css';
import shareStoryService from '../../services/shareStoryService';
import debug from 'sabio-debug';
import Pagination from 'rc-pagination';
import locale from "rc-pagination/lib/locale/en_US";
//import { useNavigate } from 'react-router-dom';
import ShareStoryMap from './ShareStoryMap';


import "rc-pagination/assets/index.css";
// import { MdAod } from 'react-icons/md';




const _logger = debug.extend('ShareStories');


function ShareStories() {
    //const navigate = useNavigate();
    _logger('This is proof that the logger is working');
    const [arrayOfStoriesA, setArrayOfStories] = useState({arrayOfStoriesA:[], updatedArrayOfStories:[]});
    const[pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
        totalCount: 40,
        totalPages: 20
    })

    const onPageChange = (pageNumber) =>{
        setPagination((prevState) => {
            const currentPage = {...prevState}
            currentPage.pageIndex = pageNumber - 1
            return currentPage
        }) 

    }
    


    useEffect(() => {
        shareStoryService.getStory(pagination.pageIndex, pagination.pageSize).then(onGetStorySuccess).catch(onGetStoryError);
    }, [pagination.pageIndex]);

    const onGetStorySuccess = (data) => {
        let arrayOfStories = data.item.pagedItems;


        _logger('Array of sotries', arrayOfStories);


        setArrayOfStories((prevState) => {
            const aos = {...prevState}
            aos.arrayOfStoriesA = aos.arrayOfStories
            aos.updatedArrayOfStories = arrayOfStories.map(mapShareStory)
            return aos;
        });
    };

    const mapShareStory = (aStory) => {
        return(
            <ShareStoryMap
            story = {aStory}
            key = {"listA" + aStory.id}
            >
            </ShareStoryMap>
        )

    }

    const onGetStoryError = (err) => {
        _logger(err);
    };

    return (
        <div className="share-story-container">
            <div className="landing-page-title-container">
                <h1 className="landing-page-title">Share Stories</h1>
            </div>

            <div className="mentoring-summary-container">
                <h2 className="mentoring-summary-title">Why Share your story?</h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat omnis, accusamus officia hic
                    consectetur modi. Nulla architecto delectus aliquid. Illum at obcaecati perspiciatis, unde eos autem
                    praesentium deserunt rem alias repellat quam quae maxime reprehenderit culpa ipsum, ipsam sequi
                    reiciendis ab, minima ducimus ratione magni? Cupiditate vitae, voluptatem eveniet repellendus, sequi
                    soluta quod, cumque dolorem accusamus laboriosam facere enim quae.
                </p>
            </div>
            <div className="mentoring-stories-container ">{arrayOfStoriesA.updatedArrayOfStories}</div>
            <div className=''>
             <Pagination 
                    onChange={onPageChange} 
                    current={pagination.pageIndex + 1}
                    total={pagination.totalCount}
                    size={pagination.pageSize}
                    locale={locale}
                ></Pagination>
                
            </div>

                

        </div>
    );
}
export default ShareStories;
