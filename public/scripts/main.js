$("#submit_user_input").bind("click", function () {
  $('.table tbody').empty();
  $('.table').css('visibility', 'hidden');
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
      render_result(data);
    },
    error: function (error) {
      alert(error.responseText);
    }
  });
});

function render_result(data){
  $('.table').css('visibility', 'visible');
  for(let item in data){
    let score_css = 'badge-success';
    if(data[item].score <= 0.25){
      score_css = 'badge-warning';
    }
    if(data[item].score <= -0.25){
      score_css = 'badge-danger';
    }
    $('.table').append(`<tr><td>${item}</td><td><h5><span class="badge ${score_css}">${data[item].score}</h5></span></td></td><td><h5><span class="badge badge-primary">${data[item].magnitude}</span></h5></td></tr>`);
  }
}
