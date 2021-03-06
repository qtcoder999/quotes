import React from "react";
import { FixedSizeList as List } from "react-window";
import { currentData } from "../../utils/staticDataUtils";
import { Row } from "../row/row";
import "./quotes-list.css";
import { getPhilosopherFullName } from "./utils/utils";

function QuotesList({ listRef, width, height, searchText, triggerChange }) {

    const philosopherFullName = getPhilosopherFullName();

    return (
        <>
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