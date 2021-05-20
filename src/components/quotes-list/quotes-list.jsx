import React, { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Row } from "../row/row";

import { changeData, currentData, currentPhilosopher, dataCollection, initializeData, setCurrentPhilosopher } from "../../utils/staticDataUtils";
import { OPTIONS } from "../../constants/constants";

import { scrollToMemorizedRow, resetSearch, scrollToFirstRow, search } from "../../utils/utils";
import "./quotes-list.css"
import Select from "../select/select";
import { changeQuotesData } from "./utils/utils";

function QuotesList({ width, height }) {
    const listRef = useRef()
    const [searchText, setSearchText] = useState('');
    const [triggerChange, setTriggerChange] = useState(0);

    const performSearch = useCallback(() => {
        search(searchText)
        scrollToFirstRow(listRef)
    }, [searchText, listRef])

    useEffect(() => {
        const lastReadPhilosopher = localStorage.getItem('lastReadPhilosopher') || "NIETZSCHE";
        setCurrentPhilosopher(lastReadPhilosopher);

        if (lastReadPhilosopher) {
            changeData(dataCollection[lastReadPhilosopher])
        }
        else {
            initializeData()
        }

        setTriggerChange(!triggerChange)
        scrollToMemorizedRow(listRef)
    }, [])

    useEffect(() => {
        scrollToMemorizedRow(listRef);
    }, [listRef, triggerChange]);

    useEffect(() => {
        if (searchText === "") {
            resetSearch()
            setSearchText('')
            scrollToMemorizedRow(listRef)
        }
        else
            performSearch()

    }, [searchText, performSearch])

    return (
        <>
            <div className="row">
                <div className="column">
                    <button
                        onClick={
                            () => {
                                resetSearch();
                                setSearchText('')
                                scrollToMemorizedRow(listRef)
                            }}>
                        Home
                    </button>
                </div>
                <div className="column">
                    <input
                        type="text"
                        placeholder="Search any word"
                        value={searchText}
                        onChange={({ target: { value } }) => {
                            setSearchText(value)
                        }}
                    />
                </div>
                <div className="column">
                    <Select
                        options={OPTIONS}
                        defaultOption={currentPhilosopher}
                        onChangeHandler={({ target: { value } }) => {
                            changeQuotesData(value);
                            setTriggerChange(!triggerChange)
                            scrollToMemorizedRow(listRef)
                        }} />
                </div>
            </div>

            { searchText !== "" ? <span>Search Results: {searchText}</span> : null}

            <List
                className="List"
                height={height}
                itemCount={currentData.length}
                itemSize={100}
                width={width}
                ref={listRef}
                itemData={{ searchText, triggerChange }}
            >
                {Row}
            </List>
        </>
    )
}

export default QuotesList;