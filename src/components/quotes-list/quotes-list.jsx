import React, { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Row } from "../row/row";

import { changeData, currentData, currentPhilosopher, dataCollection, initializeData, setCurrentPhilosopher } from "../../utils/staticDataUtils";
import { OPTIONS } from "../../constants/constants";

import { scrollToMemorizedRow, resetSearch, scrollToFirstRow, search } from "../../utils/utils";
import "./quotes-list.css"
import Select from "../select/select";
import { changeQuotesData, getPhilosopherFullName } from "./utils/utils";

function QuotesList({ width, height }) {
    const listRef = useRef()
    const [searchText, setSearchText] = useState('');
    const [triggerChange, setTriggerChange] = useState(0);

    const performSearch = useCallback(() => {
        search(searchText)
        scrollToFirstRow(listRef)
    }, [searchText, listRef])

    useEffect(() => {
        let lastReadPhilosopher = localStorage.getItem('lastReadPhilosopher');

        if (lastReadPhilosopher === undefined || lastReadPhilosopher === "undefined") lastReadPhilosopher = OPTIONS[0].value;

        console.log("lastReadPhilosopher", lastReadPhilosopher, "OPTIONS[0].value", OPTIONS[0].value)
        setCurrentPhilosopher(lastReadPhilosopher);

        if (lastReadPhilosopher) {
            changeData(dataCollection[lastReadPhilosopher])
        }
        else {
            initializeData()
        }

        setTriggerChange(!triggerChange)
        scrollToMemorizedRow(listRef)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const philosopherFullName = getPhilosopherFullName();

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
                            setSearchText('')
                            changeQuotesData(value);
                            setTriggerChange(!triggerChange)
                            scrollToMemorizedRow(listRef)
                        }} />
                </div>
            </div>

            { searchText !== "" ? <span>Search Results: {searchText}</span> : null}

            { philosopherFullName !== undefined && <List
                className="List"
                height={height}
                itemCount={currentData.length}
                itemSize={600}
                width={width}
                ref={listRef}
                itemData={{ searchText, triggerChange, philosopherFullName }}
            >
                {Row}
            </List>}
        </>
    )
}

export default QuotesList;