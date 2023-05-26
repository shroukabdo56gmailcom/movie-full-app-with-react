import axios from "axios";
import React, { useEffect, useState } from "react";
import Movies from "../Movies/Movies";
import TV from "../TV/TV";
import People from "../People/People";

export default function Home() {
  return (
    <div>
      <Movies/>
      <TV/>
      <People/>
    </div>
  );
}
