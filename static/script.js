const logsContainer = document.getElementsByClassName('logs-container')[0]
const clearLogsButton = document.getElementById('clear-logs')
const loadingIndicator = document.getElementById('loading-indicator')

// Initialize a WebSocket connection using Socket.IO
const socket = new io()

socket.on('connect', function () {
  // Log the socket connection ID
  console.log(`Socket Connected ID: ${socket.id}`)
})

// Listen for incoming packets and display them in the logs container
if (logsContainer) {
  socket.on('packet:received', function (packet) {
    // remove loading-indicator
    loadingIndicator.style.display !== 'none'
      ? (loadingIndicator.style.display = 'none')
      : ''

    // Create an HTML element for the packet log
    const packetHTML = `<p>${packet}</p>`

    // Append the packet log to the logs container
    logsContainer.insertAdjacentHTML('beforeend', packetHTML)

    // Auto-scroll to the latest packet
    logsContainer.scrollTop = logsContainer.scrollHeight
  })
}

if (clearLogsButton)
  clearLogsButton.addEventListener('click', function () {
    logsContainer.innerHTML = ''
  })
