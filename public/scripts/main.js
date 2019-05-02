$("#submit_user_input").bind("click", function () {
  $('#text_analysis').val('');
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
      $('#text_analysis').val(JSON.stringify(data));
    },
    error: function (error) {
      alert(error.responseText);
    }
  });
});
