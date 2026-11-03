"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

const getServerDate = () => "";

const CurrentDate = () => {
  const date = useSyncExternalStore(
    subscribe,
    getDate,
    getServerDate
  );

  return <p className="text-sm">{date}</p>;
};

export default CurrentDate;