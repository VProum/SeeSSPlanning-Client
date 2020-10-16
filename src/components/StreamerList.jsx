import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const StreamerList = (props) => {
  function ClickHandler(event) {
    console.log(event.currentTarget);
  }

  {
    console.log(props);
  }
  return (
    <div>
      {props.userList.map((item, i) => (
        <GridListTile key={item._id} id={item._id} onClick={ClickHandler}>
          <img src={item.avatar} alt="blur"></img>
          <GridListTileBar title={item.nickname} />
        </GridListTile>
      ))}
    </div>
  );
};

export default StreamerList;
