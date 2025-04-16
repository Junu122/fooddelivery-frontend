import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../../assets/assets";
const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div className="explore-menu " id="explore-menu">
      <h1>explore our menu</h1>
      <p className="explore-menu-text">
        Lets explore the menu and see our variety of dishes and taste without
        limits
      </p>
      <div className="explore-menu-list">
        {menu_list.map((list, index) => {
          return (
            <div
              onClick={() => {
                setcategory(list.menu_name
                );
              }}
              className="explore-menu-list-item"
              key={index}
            >
              <img
                className={category == list.menu_name ? "active" : ""}
                src={list.menu_image}
                alt=""
              />
              <p>{list.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
