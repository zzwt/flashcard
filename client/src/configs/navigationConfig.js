import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "dashboard",
    title: "DashBoard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/dashboard",
  },
  {
    id: "decks",
    title: "Decks",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/dashboard/decks",
  },
  {
    id: "deckGroups",
    title: "Deck Groups",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/dashboard/deck-groups",
  },
];

export default navigationConfig;
