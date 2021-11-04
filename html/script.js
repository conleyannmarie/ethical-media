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

// Generate avatar
const name = document.querySelector(".username");
const img = document.querySelector(".img");
const btnAvatar = document.querySelector(".btn-avatar");

btnAvatar.onclick = async (e) => {
  e.preventDefault();

  let res = await fetch("/api/users", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name: name.value }),
  });
  let data = await res.json();

  img.src = data.json();
};
// Generate avatar end
