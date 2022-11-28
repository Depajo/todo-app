import "./App.css";

function Lisaa() {
  const inputHandler = (event) => {
    console.log(event.target.value);
  };

  const buttonHandler = (event) => {};

  return (
    <div className="content">
      <div className="container-1">
        <label>ID</label>
        <input type={"text"} onChange={inputHandler} />
        <label>Tehtävä</label>
        <input type={"text"} onChange={inputHandler} />
        <label>Kategoria</label>
        <input type={"text"} onChange={inputHandler} />
        <button value={"Lisää"} onChange={inputHandler}>
          Lisää
        </button>
      </div>
    </div>
  );
}

export default Lisaa;
