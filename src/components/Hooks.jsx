import React from "react";

function Hooks(props) {
  const [color, setColor] = React.useState("blue");
  const [size, setSize] = React.useState("100");

  

  return (
    <React.Fragment>
      <div
        style={{ backgroundColor: color, height: size+"px", width: size+"px" }}
      ></div>
      <input type="color" onChange={(event) => setColor(event.target.value)} />
      <input type="number" onChange={(event) => setSize(event.target.value)} />
    </React.Fragment>
  );
}

export default Hooks;
