document.addEventListener("DOMContentLoaded", function () {
  // конечная дата, например 1 июля 2021
  let deadline = (function (y, m, d) {
    return new Date(y, m - 1, d)
  })(2023, 02, 14)
  // id таймера
  let timerId = null

  // Заполнение прогресс Бара
  let progressBarV = document.querySelector("progress")
  let today = new Date()
  //Количество миллисекунд в одном дне
  msPerDay = 24 * 60 * 60 * 1000
  //Высчитываем количество дней
  daysLeft = Math.round((deadline.getTime() - today.getTime()) / msPerDay)
  dayname = ""
  ds = "" + daysLeft
  //Вырезаем последнею цифру
  dd = parseInt(ds.substr(ds.length - 1))
  //Выводим надпись в документ
  if (daysLeft > 0) {
    progressBarV.setAttribute("value", 365 - daysLeft)
  }
  // ########################

  // склонение числительных
  function declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ]
  }
  // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
  function countdownTimer() {
    const diff = deadline - new Date()
    if (diff <= 0) {
      clearInterval(timerId)
      document.getElementById("text-id").innerHTML = "Happy Birthday!!!"

      // let textInvisible = document.querySelector('timer')

      document.getElementById("timer-id").setAttribute("class", "invisible")
      document.getElementById("progress-id").setAttribute("class", "invisible")
    }

    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0
    $days.textContent = days < 10 ? "0" + days : days
    $hours.textContent = hours < 10 ? "0" + hours : hours
    $minutes.textContent = minutes < 10 ? "0" + minutes : minutes
    $seconds.textContent = seconds < 10 ? "0" + seconds : seconds
    $days.dataset.title = declensionNum(days, ["day", "days", "days"])
    $hours.dataset.title = declensionNum(hours, ["hour", "hours", "hours"])
    $minutes.dataset.title = declensionNum(minutes, [
      "minute",
      "minutes",
      "minutes",
    ])
    $seconds.dataset.title = declensionNum(seconds, [
      "second",
      "seconds",
      "seconds",
    ])
  }
  // получаем элементы, содержащие компоненты даты
  const $days = document.querySelector(".timer__days")
  const $hours = document.querySelector(".timer__hours")
  const $minutes = document.querySelector(".timer__minutes")
  const $seconds = document.querySelector(".timer__seconds")
  // вызываем функцию countdownTimer
  countdownTimer()
  // вызываем функцию countdownTimer каждую секунду
  timerId = setInterval(countdownTimer, 1000)
})
