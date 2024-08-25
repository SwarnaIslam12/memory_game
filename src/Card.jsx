import React, { useState } from "react";

const Card = ({ foods, score, best, clickSuccess, clickFailed }) => {
  const checkStatus = (tmp) => {
    if (tmp.status === true) {
      clickFailed();
    } else {
      const newFoods = foods.map((food) => {
        if (food.id === tmp.id) {
          tmp.status = true;
          return tmp;
        }
        return food;
      });
      clickSuccess(newFoods);
    }
  };
  return (
    <>
      <div
        className="text-end header"
        style={{ position: "absolute", top: "0px", right: "0px", left: 0 }}
      >
        <h2 class="text-end">Score: {score}</h2>
        <h2 class="text-end">Best score: {best}</h2>
      </div>
      <div
        className=""
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {foods.map((food) => {
          return (
            <>
              <img
                className="r-2"
                src={food.url}
                style={{ width: "200px", margin: "20px" }}
                onClick={() => {
                  checkStatus(food);
                }}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Card;
