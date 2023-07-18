document.addEventListener('DOMContentLoaded', function () {
  const btnValue = document.getElementById('input-data');
  btnValue.value = "2";
  document.querySelector('.rating-circle[value="1"]').click();
});

const ratingCircles = document.querySelectorAll('.rating-circle');
ratingCircles.forEach(circle => {
  circle.addEventListener('click', function (event) {
    ratingCircles.forEach(circle => {
      circle.style.backgroundColor = '';
      circle.style.border = '';
      circle.style.opacity = '';
    });

    const btnValue = document.getElementById('input-data');
    btnValue.value = this.value; 

    this.style.backgroundColor = 'yellow';
    this.style.border = '2px solid black';
    this.style.opacity = '1';

    event.preventDefault();
  });
});
