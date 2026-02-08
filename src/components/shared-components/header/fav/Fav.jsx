import React from "react";
import { useNavigate } from "react-router-dom";
import { addfilterData, clearAllfilterData } from "../../../../state/features/filter.slice";
import { useDispatch } from "react-redux";


const Fav = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickFav = () => {       
        dispatch(clearAllfilterData());

        ["Electronics", "Jewelery", "Men", "Women", "Favourite"].forEach((o) => {
            dispatch(addfilterData(o));
        });
        
        navigate("/products/All");
    }

    return (<>
        <svg className="header-fav-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 22.903 20.232" onClick={onClickFav}>
            <path id="heart" d="M20.84,4.61a5.5,5.5,0,0,0-7.78,0L12,5.67,10.94,4.61a5.5,5.5,0,0,0-7.78,7.78l1.06,1.06L12,21.23l7.78-7.78,1.06-1.06a5.5,5.5,0,0,0,0-7.78Z" transform="translate(-0.549 -1.998)" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
    </>)

}

export default Fav