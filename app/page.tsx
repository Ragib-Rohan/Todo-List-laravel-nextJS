"use client";
import Image from "next/image";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsPencil, BsPlusCircle, BsXOctagonFill } from "react-icons/bs";
import Axios from "@/app/lib/axios";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    fetchTodos();
  }, []);

  const [todos, setTodos] = useState([]);
  const [input_to_do, set_input_to_do] = useState("");
  const [edit_to_do, set_edit_to_do] = useState("");
  const [msg, set_msg] = useState("");

  function fetchTodos() {
    Axios.get("/api/todos/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_input_to_do(e.target.value);
  };
  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("task_name", input_to_do);
    formData.append("is_done", "0");
    let url = "/api/todos/";
    if (edit_to_do != "") {
      formData.append("edit_id", edit_to_do);
      url = "/api/todos/" + edit_to_do;
      formData.append("_method", "PUT");
    }

    Axios.post(url, formData)
      .then((response) => {
        set_input_to_do("");
        fetchTodos();
        set_msg(response.data);
      })
      .catch((error) => {
        console.log("Error Sending Data: ", error);
      });
  };

  function editTodo(id: React.ChangeEvent<HTMLInputElement>) {
    set_edit_to_do(id);
    todos.map((item) => {
      if (item.id == id) {
        set_input_to_do(item.task_name);
      }
    });
  }

  function deleteTodo(id: React.ChangeEvent<HTMLInputElement>) {
    let text = "This task will be Deleted.";
    if (confirm(text) == true) {
      let params = { _method: "delete" };
      Axios.post("/api/todos/" + id, params).then((response) => {
        setTodos("");
        fetchTodos();
        set_edit_to_do("");
        set_msg(response.data);
      });
    }
  }

  function check_box(item_id, item_flag) {
    let text = "This task will consider as Complete.";
    if (confirm(text) == true) {
      var param = { item_id: item_id, is_done: !item_flag };
      Axios.post("/api/todos_check/" + item_id).then((response) => {
        setTodos("");
        fetchTodos();
        set_edit_to_do("");
        set_msg(response.data);
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className="text-[40px] text-teal-500 mb-10">To Do List</h1>
      <h3 className="text-[20px] text-green-500 mb-3">{msg}</h3>
      <form
        className="w-full max-w-sm mb-10"
        method="POST"
        onSubmit={submitForm}
      >
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700  leading-tight focus:outline-none"
            name="input_to_do"
            value={input_to_do}
            type="text"
            placeholder="Enter To Do"
            title="Enter To Do item"
            onChange={titleChange}
            aria-label="Full name"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            <AiFillPlusCircle />
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                SL NO
              </th>
              <th scope="col" className="px-6 py-3">
                Task
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos &&
              todos.map((item, i) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50
                  S dark:hover:bg-gray-600"
                  key={i + 1}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name="checkbox"
                      checked={Number(item["completed_flag"])}
                      onChange={() => check_box(item.id, item.completed_flag)}
                      value={item["completed_flag"]}
                    />
                  </td>

                  <td className="px-6 py-4">{i + 1}</td>
                  <td
                    className={
                      item.completed_flag == 1
                        ? "line-through px-6 py-4"
                        : "px-6 py-4"
                    }
                  >
                    {item["task_name"]}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-between">
                    <button
                      title="Edit"
                      onClick={() => editTodo(item.id)}
                      className="font-medium text-green-600 dark:text-green-500 hover:underline"
                    >
                      <BsPencil />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => deleteTodo(item.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      <BsXOctagonFill />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
