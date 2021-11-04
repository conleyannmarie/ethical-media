// Submit button
const btn = document.querySelector(".submit-rating");

// Thanksmsg
const thanksmsg = document.querySelector(".thanks-msg");

//Star rating
const starRating = document.querySelector(".star-input");

// Success msg show/hide
btn.onclick = () => {
  starRating.style.display = "none";
  thanksmsg.style.display = "table";
  return false;
};

import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";

let svg = createAvatar(style, {});
