class Animation {
  isActive: boolean
  fps: number
  step: () => void

  constructor(step: () => void, fps: number) {
    this.isActive = false
    this.fps = 1000 / fps
    this.step = step
  }

  start() {
    const getFrame = () => {
      let start = Date.now()

      const onFrame = () => {
        if (!this.isActive) {
          return
        }

        if (Date.now() - start > this.fps) {
          this.step()
          getFrame()
        } else {
          window.requestAnimationFrame(onFrame)
        }
      }

      onFrame()
    }

    this.isActive = true
    getFrame()
  }

  stop() {
    this.isActive = false
  }

  animate(shouldRun: boolean) {
    if (shouldRun) {
      this.start()
    } else {
      this.stop()
    }
  }
}

export default Animation
