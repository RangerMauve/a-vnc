/* global AFRAME */

let VNC_INSTANCE_INDEX = 0

AFRAME.registerComponent('vnc', {
  schema: {
    url: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    target: { type: 'string' }
  },

  async init () {
    console.log('Beginning connection', this.data)
    const {
      url,
      username,
      password,
      target
    } = this.data

    this.vncIndex = VNC_INSTANCE_INDEX++

    const element = document.createElement('div')

    element.style = 'display: none;'

    this.el.appendChild(element)
    const { default: RFB } = await import('https://novnc.com/noVNC/core/rfb.js')
    const { default: Keyboard } = await import('https://novnc.com/noVNC/core/input/keyboard.js')

    this.rfb = new RFB(element, url, { username, password, target })
    this.keyboard = new Keyboard(document.body)

    const canvas = this.rfb._canvas

    canvas.id = `vnc-canvas-${this.vncIndex}`

    this.keyboard.onkeyevent = (keysym, code, down) => {
      console.log('Keyboard event', { keysym, code, down })
      this.rfb.sendKey(keysym, code, down)
    }

    this.updateMaterial = () => {
      const el = this.el
      const material = el.getObject3D('mesh').material
      if (!material.map) return
      material.map.needsUpdate = true
      window.requestAnimationFrame(this.updateMaterial)
    }
    this.rfb.addEventListener('connect', () => {
      setTimeout(() => {
        this.el.setAttribute('material', {
          src: `#${canvas.id}`,
          width: 800,
          height: 600
        })
        this.keyboard.grab()
      }, 1000)
    })
  },

  remove () {
    this.updateMaterial = () => undefined
    this.rfb.disconnect()
  }
})
