import React, { useEffect, useState } from "react";
import "./Todo.css";
import { Head } from "./Head/Head";
import { List } from "./List/List";
import axios from "axios";

const URL = "http://localhost:3001/api/todo";

export const Todo = () => {
    const [inputText, setInputText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [editText, setEditText] = useState("");
    const [allData, setAllData] = useState([]);
    const [show, setShow] = useState(false);

    const [editTodoId, setEditTodoId] = useState(0);

    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = async () => {
        try {
            const response = await axios(URL);
            console.log(response, "==response");
            setAllData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const dataStore = async (event) => {
        event.preventDefault();
        if (inputText) {
            try {
                const response = await axios(URL, {
                    method: "POST",
                    data: {
                        todo: inputText,
                    },
                });
                setAllData(response.data);
                setInputText("");
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    };

    const edit = (value) => {
        setTextIndex(value);
        setShow((prev) => !prev);
        let result = allData.find((data, index) => index == value);
        setEditTodoId(result.id);
        setEditText(result.text);
    };

    const editDataStore = async () => {
        try {
            const response = await axios(URL, {
                method: "PUT",
                data: {
                    id: editTodoId,
                    text: editText,
                    crossLine: false,
                },
            });
            setAllData(response.data);
            setEditText("");
            setShow((prev) => !prev);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const Delete = async (value) => {
        try {
            const response = await axios(URL, {
                method: "DELETE",
                data: {
                    id: value,
                },
            });
            setAllData(response.data);
        } catch (error) {}
    };

    const textMark = async (id, crossLine) => {
        try {
            const response = await axios(`${URL}/mark`, {
                method: "PUT",
                data: {
                    id: id,
                    crossLine: crossLine,
                },
            });
            setAllData(response.data);
        } catch (error) {}
    };

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const editHandleChange = (event) => {
        setEditText(event.target.value);
    };

    const editDataCancel = () => {
        setShow((prev) => !prev);
        setEditText("");
    };

    return (
        <div className="todo-main-container">
            <h3 className="head-section">Todo List</h3>
            <Head handleChange={handleChange} dataStore={dataStore} inputText={inputText} />
            <List
                allData={allData}
                Delete={Delete}
                edit={edit}
                show={show}
                editHandleChange={editHandleChange}
                editText={editText}
                editDataStore={editDataStore}
                editDataCancel={editDataCancel}
                textMark={textMark}
            />
        </div>
    );
};
