import React from "react";
import OPTIONS from "../../static/philosophers-data";
import { currentPhilosopher } from "../../utils/staticDataUtils";
import { scrollToMemorizedRow } from "../../utils/utils";
import { changeQuotesData } from "../quotes-list/utils/utils";
import Select from "../select/select";
import { WordLengthSearch } from "../wordLengthSearch/wordLengthSearch";
import "./header.css";

export function Header({ listRef, setSearchText, searchText, setTriggerChange, triggerChange, start, end, setStart, setEnd }) {
    const props = { start, end, setStart, setEnd }
    return (
        <>
            <div className="row">
                <div className="column">
                    <WordLengthSearch listRef={listRef} setTriggerChange={setTriggerChange} triggerChange={triggerChange}
                        {...props}
                    />
                    {/* <button
                        onClick={
                            () => {
                                resetSearch();
                                setSearchText('')
                                scrollToMemorizedRow(listRef)
                            }}>
                        Home
                    </button> */}
                </div>
                <div className="column">
                    <input
                        className="wordSearch"
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
                            setStart(1)
                            setEnd("")

                            setSearchText('')

                            changeQuotesData(value);
                            setTriggerChange(!triggerChange)
                            scrollToMemorizedRow(listRef)
                        }} />
                </div>
            </div>

        </>
    )
}