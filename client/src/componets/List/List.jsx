import React from "react";
import "./List.css";

export const List = ({
    Delete,
    allData,
    show,
    edit,
    editHandleChange,
    editText,
    editDataStore,
    editDataCancel,
    textMark,
}) => {
    return (
        <>
            {allData.map((item, index) => (
                <div className="list-container" key={index}>
                    {item.crossLine ? (
                        <del  className="renderItem" onClick={() => textMark(item.id,false)}>
                            {item.text}
                        </del>
                    ) : (
                        <p className="renderItem" onClick={() => textMark(item.id,true)}>
                            {item.text}
                        </p>
                    )}

                    <img src="https://static.thenounproject.com/png/1416596-200.png" alt="" onClick={() => edit(index)} />
                    <img
                        src="https://icons.veryicon.com/png/o/business/simple-linear-icon-icon/delete-332.png"
                        alt="abc"
                        onClick={() => Delete(item.id)}
                    />
                </div>
            ))}
            {show && (
                <div className="list-bottom">
                    <input
                        type="text"
                        placeholder="Editing Current Todo Item"
                        value={editText}
                        onChange={editHandleChange}
                    />
                    <button className="save-button" onClick={editDataStore}>
                        SAVE
                    </button>
                    <button className="cancel-button" onClick={editDataCancel}>
                        CANCEL
                    </button>
                </div>
            )}
        </>
    );
};
