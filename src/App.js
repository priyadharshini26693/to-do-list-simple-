import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import Additem from "./Additem";
import Searchitem from "./Searchitem";
import apiRequest from "./apiRequest";
import Login from "./Login";
import Register from "./Register";

function App() {
  const API_URL = "http://localhost:3000/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        console.log(response);
        if (!response.ok) throw Error("data not received");
        const listItems = await response.body.items.json();
        // const listItems =
        //   [
        //     {
        //       id: 1,
        //       checked: false,
        //       item: "earn money",
        //     },
        //     {
        //       id: 2,
        //       checked: true,
        //       item: "save money",
        //     },
        //     {
        //       id: 3,
        //       checked: false,
        //       item: "grow money",
        //     },
        //   ];

        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => fetchItems(), 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);
    //localStorage.setItem("todo_list", JSON.stringify(listItems))

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    //localStorage.setItem("todo_list", JSON.stringify(listItems))

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    // we should give the information which should be changed
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    //localStorage.setItem("todo_list", JSON.stringify(listItems))

    const deleteOptions = { method: "DELETE" };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <Register />
          <Login onLogin={handleLogin} />
        </>
      ) : (
        <App user={currentUser} onLogout={handleLogout} />
      )}

      <div className="App">
        <Header title="To do List" />
        <Additem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <Searchitem search={search} setSearch={setSearch} />
        <main>
          {isLoading && <p>Loading items...</p>}
          {fetchError && (
            <p style={{ color: "red" }}> {`error: ${fetchError}`}</p>
          )}
          {!fetchError && !isLoading && (
            <Content
              items={items.filter((item) =>
                item.item.toLowerCase().includes(search.toLowerCase())
              )}
              setItems={setItems}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          )}
        </main>
        <Footer length={items.length} />
      </div>
    </div>
  );
}

export default App;
