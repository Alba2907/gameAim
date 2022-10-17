const startBtn = document.querySelector('.start') // - попробовать без айди через точку
const sreens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['aquamarine', 'hotpink', 'deepskyblue', 'blanchedalmond']


let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()  // - отменяем переход по ссылке решетка их хтмл при нажатии на кнопку начать игру
sreens[0].classList.add('up') // - делает переход к  экрану(0 в данном случае индекс)

})


timeList.addEventListener('click', event => {

    if (event.target.classList.contains('time-btn')) {
       time = parseInt(event.target.getAttribute ('data-time'))
        sreens[1].classList.add('up') // - переходиm на некст экран
        startGame()
    }  // - target  обозначает элемент по котором мы кликнули. contains проверяет если ли у этого элемента определенный класс. pasrInt чтобы перевести строку в число

})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
    score++ // - прибавляет одно очко за попадание
    event.target.remove() // - удаляет точку после попадания
    createRandomCircle() // - добавляет круг после удаление
    }
})



function startGame () {
setInterval(decreaseTime, 1000) // - выполняет через промежуток времени другую функцию. 1000 ms(1 сек)
    createRandomCircle() // - добавляет круг
    setTime(time) // - выдает сколько времени на игру
}

function decreaseTime () {
    if (time === 0) {
        finishGame ()

    } else {
        let current = --time // - так как тайм число можем вызывать оператор --
        if (current < 10) { // - если число меньше 10
            current = `0${current}`  // - добавляем 0 перед значением для красоты
        }
        setTime(current)

    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`  // -  выше одинаковые действия, но разная переменная

}



function finishGame () {
    timeEl.parentNode.classList.add('hide') // - т.к. таймел это спан,  то есть заголовок ш3. hide чтобы не было скачка
    board.innerHTML = `<div><h1>Cчет: <span class="primary">${score}</span></h1><button class="game"><span>Play again</span></button></div>`  // - добавили стиль счету
    board.classList.add('end')

    const button = document.querySelector('.game')

    button.addEventListener('click',  (event) => {
        location.reload()
        // sreens[0].classList.remove('up')
        // sreens[1].classList.remove('up')
        // time = 0
        // score = 0
    })

}



function createRandomCircle () {
    const circle = document.createElement('div')
    const size = getRandoNumber(10, 60)  // -  размер круга
    const {width, height} = board.getBoundingClientRect() // - деструктеризация
    const x = getRandoNumber(0, width - size) // - т.к. размеры борда прописаны у нас в цсс как 500 на 500, то значение х и у не могут быть равны им или более, иначе не попадут на доску
    const y = getRandoNumber(0, height - size) // - размер поля благодаря такому синтаксису будет 500 на 500, но для проверки вычитаем размер самого круга
    circle.style.top = `${y}px` // - положение круга
    circle.style.left = `${x}px`
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    const color = getRandomColor()
    circle.style.backgroundColor = color
    board.append(circle)
}

function getRandoNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min) // - ищем радномный размер для круга
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length) // - конструкция позволяет выбирать рандомный элемент по индексу массива
    return colors[index] // получаем рандомный цвет
}