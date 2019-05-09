$("#submit_user_input").bind("click", function () {
  $('.table tbody').empty();
  let data = {
    "text": $("#user_text").val()
  }
  $.ajax({
    data: data,
    url: '/analyze_text',
    type: "POST",
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      render_google_result(data, "google");
      render_aws_result(data, "aws");
    },
    error: function (error) {
      alert(error.responseText);
    }
  });
});

function render_google_result(data, key) {
  for (let item in data[key]) {
    let score_css = 'badge-success';
    if (data[key][item].score <= 0.25) {
      score_css = 'badge-warning';
    }
    if (data[key][item].score <= -0.25) {
      score_css = 'badge-danger';
    }
    $(`#table_${key}`).append(`<tr><td>${item}</td><td><h5><span class="badge ${score_css}">${data[key][item].score}</h5></span></td><td><h5><span class="badge badge-primary">${data[key][item].magnitude}</span></h5></td></tr>`);
  }
}

function render_aws_result(data, key) {
  console.log(data);
  $(`#table_${key}`).append(`<tr><td><h5><span class="badge badge-success">${data[key].SentimentScore.Positive}</h5></span></td><td><h5><span class="badge badge-danger"">${data[key].SentimentScore.Negative}</h5></span></td><td><h5><span class="badge badge-info"">${data[key].SentimentScore.Neutral}</h5></span></td></tr>`);
}
