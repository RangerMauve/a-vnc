/* global AFRAME */

let VNC_INSTANCE_INDEX = 0

AFRAME.registerComponent('vnc', {
  schema: {
    url: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    target: { type: 'string' },
  },

  async init () {
  	console.log('Beginning connection', this.data)
    const {
      url,
      username,
      password,
      target,
    } = this.data

    this.vncIndex = VNC_INSTANCE_INDEX++

    const element = document.createElement('div')

    element.style = `display: none;`

    this.el.appendChild(element)
		const {default:RFB} = await import('https://novnc.com/noVNC/core/rfb.js')

    this.rfb = new RFB(element, url, { username, password, target })

    const canvas = this.rfb._canvas

    canvas.id = `vnc-canvas-${this.vncIndex}`

		this.rfb.addEventListener('connect', () => {
		setTimeout(() => {
			this.el.setAttribute('material', {
				src: `#${canvas.id}`,
				width: 800,
				height: 600
			})
		}, 5000)
		})
  },
})
