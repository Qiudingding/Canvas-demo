
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 2

autoSetCanvasSize(canvas)

listenToUser(canvas)


var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

blackpen.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  blackpen.classList.add('active')
  redpen.classList.remove('active')
  greenpen.classList.remove('active')
  bluepen.classList.remove('active')
}

redpen.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  redpen.classList.add('active')
  blackpen.classList.remove('active')
  greenpen.classList.remove('active')
  bluepen.classList.remove('active')
}
greenpen.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  blackpen.classList.remove('active')
  redpen.classList.remove('active')
  greenpen.classList.add('active')
  bluepen.classList.remove('active')
}
bluepen.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blackpen.classList.remove('active')
  bluepen.classList.add('active')
  redpen.classList.remove('active')
  greenpen.classList.remove('active')
}

thin.onclick = function(){
  lineWidth = 2
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function(){
  lineWidth = 4
  thick.classList.add('active')
  thin.classList.remove('active')
}
clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function(){
  var url = canvas.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.tarfet = '-blank'
  a.click()

}
/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.lineJoin = "round"
  context.lineCap = "round"
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
}
  // 特性检测，检测设备是否是 touch 设备
if(document.body.ontouchstart !==undefined){
    //触屏设备
  canvas.ontouchstart = function(aaa){
    var x = aaa.touches[0].clientX
    var y = aaa.touches[0].clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
}
canvas.ontouchmove = function(aaa){
  var x = aaa.touches[0].clientX
  var y = aaa.touches[0].clientY

  if (!using) {return}

  if (eraserEnabled) {
    context.clearRect(x - 5, y - 5, 10, 10)
  } else {
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }

}
canvas.ontouchend = function(){
  using = false
}
  }else{
    //非触屏设备
canvas.onmousedown = function(aaa) {
  var x = aaa.clientX
  var y = aaa.clientY
  using = true
  if (eraserEnabled) {
    context.clearRect(x - 5, y - 5, 10, 10)
  } else {
      lastPoint = {
        "x": x,
        "y": y
      }
    }
  }
canvas.onmousemove = function(aaa) {
  var x = aaa.clientX
  var y = aaa.clientY

  if (!using) {return}

  if (eraserEnabled) {
    context.clearRect(x - 5, y - 5, 10, 10)
  } else {
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }

  }
  canvas.onmouseup = function(aaa) {
    using = false
  }
}

  
