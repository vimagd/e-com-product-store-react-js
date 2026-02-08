/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import "./SideBarOption.scss";
import xSVG from '../../../assets/svg/x.svg';
import { useDispatch, useSelector } from "react-redux";
import { addfilterData, clearAllfilterData, getFilterArray, removefilterData, toggleFilter } from "../../../state/features/filter.slice";
import squareImg from "../../../assets/svg/square.svg";
import checkSquareImg from "../../../assets/svg/check-square.svg";
import { useParams } from "react-router-dom";


const SideBarOption = () => {

    let { ele } = useParams();

    let getAllSelected = useSelector(getFilterArray);
    const dispatch = useDispatch();

    const colorTilesArr = [
        {
            "background": "#000000",
            "filterColor": "Black"
        },
        {
            "border": "1px solid black",
            "background": "#FFFFFF",
            "filterColor": "White"
        },
        {
            "background": "#2D9D78",
            "filterColor": "Lochinvar"
        },
        {
            "background": "#FDBA5E",
            "filterColor": "Koromiko"
        },
        {
            "background": "#336DFF",
            "filterColor": "Dodger Blue"
        },
        {
            "background": "#E34850",
            "filterColor": "Mandy"
        },
        {
            "background": "#6408D3",
            "filterColor": "Electric Violet"
        },
        {
            "background": "#F9009A",
            "filterColor": "Hollywood Cerise"
        },
        {
            "background": "#EB7327",
            "filterColor": "Tango"
        },
        {
            "background": "transparent linear-gradient(180deg, #AF52FF 0%, #7950E8 16%, #4F5ADA 29%, #57CB76 43%, #EBC250 56%, #FF8810 69%, #E32F0F 83%, #BF1919 100%)",
            "filterColor": "Linear Gradient"
        },
    ]

    const [listOfItems, setListOfItems] = useState([
        { id: 101, name: 'X-Small', isChecked: false, section: "Size" },
        { id: 102, name: 'Small', isChecked: false, section: "Size" },
        { id: 103, name: 'Medium', isChecked: false, section: "Size" },
        { id: 104, name: 'Large', isChecked: false, section: "Size" },
        { id: 105, name: 'X-Large', isChecked: false, section: "Size" },
        { id: 106, name: 'Outdoor', isChecked: false, section: "Style" },
        { id: 107, name: 'Casual', isChecked: false, section: "Style" },
        { id: 108, name: 'Athleisure', isChecked: false, section: "Style" },
        { id: 109, name: 'Running', isChecked: false, section: "Style" },
        { id: 110, name: 'Active', isChecked: false, section: "Style" },
        { id: 111, name: 'Calvin Klein', isChecked: false, section: "Brand" },
        { id: 112, name: 'Dolce & Gabbana', isChecked: false, section: "Brand" },
        { id: 113, name: 'Miu Miu', isChecked: false, section: "Brand" },
        { id: 114, name: 'Prada', isChecked: false, section: "Brand" },
        { id: 115, name: 'Rag & Bone', isChecked: false, section: "Brand" },
        { id: 116, name: 'Gucci', isChecked: false, section: "Brand" },
        { id: 117, name: 'Chanel', isChecked: false, section: "Brand" },
        { id: 118, name: 'Salvatore Ferragamo', isChecked: false, section: "Brand" },
        { id: 119, name: 'Marni', isChecked: false, section: "Brand" },
        { id: 120, name: 'Dior', isChecked: false, section: "Brand" },
        { id: 121, name: 'Electronics', isChecked: false, section: "Catagory" },
        { id: 122, name: 'Jewelery', isChecked: false, section: "Catagory" },
        { id: 123, name: 'Men', isChecked: false, section: "Catagory" },
        { id: 124, name: 'Women', isChecked: false, section: "Catagory" },
        { id: 125, name: 'Favourite', isChecked: false, section: "Favourite" },
    ]);

    useEffect(() => {
        let items = [...listOfItems]
        listOfItems.forEach((o, i) => {
            items[i].isChecked = getAllSelected.includes(o.name) ? true : false;
        });
        setListOfItems(items);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAllSelected]);

    const toggleFilterMethod = () => {
        dispatch(toggleFilter(false));
    }

    const removeSelectedData = (par) => {
        setListOfItems(listOfItems.map(o => {
            o.isChecked = o.name === par ? false : o.isChecked;
            return o
        }));
        dispatch(removefilterData(par));
    }

    const addSelectedData = (par) => {

        if (!colorTilesArr.some(o => par === o.filterColor) ||
            (colorTilesArr.some(o => par === o.filterColor) && !getAllSelected.includes(par))) {
            dispatch(addfilterData(par));
        }
        else {
            removeSelectedData(par);
        }
    }

    const clearAllSelectedData = () => {

        setListOfItems(listOfItems.map(o => {
            o.isChecked = o.isChecked ? false : o.isChecked;
            return o
        }));

        dispatch(clearAllfilterData());
    }

    const updateListOfItems = (itemIndex, newsChecked) => {
        const updatedListOfItems = [...listOfItems];
        updatedListOfItems[itemIndex].isChecked = newsChecked;
        setListOfItems(updatedListOfItems);
        updatedListOfItems[itemIndex].isChecked ?
            addSelectedData(updatedListOfItems[itemIndex].name) :
            removeSelectedData(updatedListOfItems[itemIndex].name);
    }

    return (<>
        <main className="main-filter">

            <section className="filter-title-section">
                <p className="filter-title-label">Filters</p>
                <div className="filter-close">
                    <img  src={xSVG} className='icon-x' alt="Icon x" onClick={toggleFilterMethod} />
                </div>
            </section>

            <section className="filter-tag-section">
                {getAllSelected.map((o, i) => {
                    return (<div className="filter-tag-dynamic" key={i}>
                        <div className="filter-tag-delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14.828" viewBox="0 0 14.828 14.828" style={{ cursor: "pointer", position: "relative", top: "2px", left: "3px" }} onClick={() => removeSelectedData(o)}>
                                <g id="x" transform="translate(-4.586 -4.586)">
                                    <line id="Line_624" dataname="Line 624" x1="12" y2="12" transform="translate(6 6)" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <line id="Line_625" dataname="Line 625" x2="12" y2="12" transform="translate(6 6)" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg>
                        </div>
                        <div className="filter-tag-select">{o}</div>
                    </div>)
                })}
                {getAllSelected.length !== 0 ? <p className="filter-tag-clear-all" onClick={() => clearAllSelectedData()}>Clear all</p> : ""}
            </section>

            <hr className="hr-divider" />

            <p className="filter-title">Catagory</p>
            <section className="cat-section">
                {
                    listOfItems.map((o, i) => {
                        if (o.section === 'Catagory' && (ele === o.name || ele === 'All'))
                            return (
                                <label key={o.id} >{o.isChecked ?
                                    <img  src={checkSquareImg} className="check-box" alt="square-icon" onClick={() => updateListOfItems(i, !o.isChecked)} /> :
                                    <img  src={squareImg} className="check-box" alt="square-icon" onClick={() => updateListOfItems(i, !o.isChecked)} />} {o.name}
                                </label>
                            )
                    })

                }
            </section>

            <hr className="hr-divider" />

            <p className="filter-title">Saved For Later</p>
            <section className="cat-section">
                {
                    listOfItems.map((o, i) => {
                        if (o.section === 'Favourite')
                            return (
                                <label key={o.id} >{o.isChecked ?
                                    <img  src={checkSquareImg} className="check-box" alt="square-icon" onClick={() => updateListOfItems(i, !o.isChecked)} /> :
                                    <img  src={squareImg} className="check-box" alt="square-icon" onClick={() => updateListOfItems(i, !o.isChecked)} />} {o.name}
                                </label>
                            )
                    })

                }
            </section>

            <hr className="hr-divider" />
        </main>
    </>)

}

export default SideBarOption