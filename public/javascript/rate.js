async function rateFormHandler(event) {
  event.preventDefault();
  const about_rating = document
    .querySelector('textarea[name="rating-body"]')
    .value.trim();
  const user_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const rated_by = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const name = document
    .querySelector('input[name="category-name"]')
    .value.trim();
  const rating = document
    .querySelector('input[name="rating"]:checked')
    .value.trim();

  if (name) {
    const response = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        name,
        user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetch("/api/categories").then(function (response) {
        if (response.ok) {
          response.json().then(async (data) => {
            await postRating(data, about_rating, rated_by, rating);
            document.location.reload();
          });
        }
      });
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".rating-form")
  .addEventListener("submit", rateFormHandler);

async function postRating(data, about_rating, rated_by, rating) {
  let rating_for = data.length;
  await fetch("/api/ratings", {
    method: "POST",
    body: JSON.stringify({
      rated_by,
      rating_for,
      rating,
      about_rating,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
