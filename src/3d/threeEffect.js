import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/all'
import imagesLoaded from 'imagesloaded'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene()

    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xeeeeee, 0)

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      100,
      2000
    )

    this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI)

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 0, 600)
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.time = 0

    this.isPlaying = true

    this.images = [...document.querySelectorAll('.threed')]

    this.currentScroll = 0
    this.currentSpeed = 0
    const preloadImages = new Promise((resolve) => {
      imagesLoaded(
        document.querySelectorAll('.threed'),
        { background: true },
        resolve
      )
    })
    // this.pageTransition()
    // this.pageTransition()
    let allDone = [preloadImages]
    Promise.all(allDone).then(() => {
      this.addObjects()
      this.initializeImageStore()
      this.setPosition()
      this.setImageScale()
      this.resize()
      this.setupResize()
      this.smoothScroll()
      this.createComposer()
      this.lenis.on('scroll', ({ scroll, velocity }) => {
        ScrollTrigger.update()
        this.currentScroll = scroll / 900
        this.currentSpeed = velocity
        // console.log(velocity)
        // console.log({ scroll, limit, velocity, direction, progress })
      })
      this.render()
    })

    // this.settings();
  }

  settings() {
    // let that = this
    this.settings = {
      progress: 0,
    }
    this.gui = new dat.GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01)
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.setImageScale()
  }
  initializeImageStore() {
    this.imageStore = this.images.map((img) => {
      let rect = img.getBoundingClientRect()

      let geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

      let loader = new THREE.TextureLoader()
      loader.setCrossOrigin('')
      let texture = loader.load(img.currentSrc)
      texture.needsUpdate = true
      let material = new THREE.MeshBasicMaterial({
        map: texture,
      })

      let mesh = new THREE.Mesh(geometry, material)
      mesh.scale.set(rect.width, rect.height)

      let image = {
        img: img,
        mesh: mesh,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }

      this.scene.add(mesh) // << sposta la proprietà qui

      return image
    })
  }

  setImageScale() {
    this.imageStore.forEach((image) => {
      let rect = image.img.getBoundingClientRect()
      let { top, left, width, height } = rect

      image.top = top
      image.left = left
      image.width = width
      image.height = height

      image.mesh.scale.set(width, height, 1)
      image.mesh.position.set(
        left - this.width / 2 + width / 2,
        this.currentScroll - top + this.height / 2 - height / 2
      )
    })
  }

  setPosition() {
    this.imageStore.forEach((img) => {
      let rect = img.img.getBoundingClientRect()
      img.mesh.position.x = rect.left - this.width / 2 + rect.width / 2
      img.mesh.position.y =
        this.currentScroll - rect.top + this.height / 2 - rect.height / 2
    })
  }
  smoothScroll() {
    this.lenis = new Lenis({
      smoothTouch: true,
      duration: 2,
    })
  }
  addObjects() {
    // let that = this
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      fragmentShader: `
        void main() {
        gl_FragColor = vec4(1., 0.0, 1., 1.);
      }
      `,
    })

    this.geometry = new THREE.PlaneGeometry(200, 300, 1, 1)

    this.plane = new THREE.Mesh(this.geometry, this.material)
    // this.scene.add(this.plane)
  }

  createComposer() {
    this.composer = new EffectComposer(this.renderer)
    this.RenderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.RenderPass)

    // var counter = 0.0

    this.myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        scrollSpeed: { value: null },
        time: { value: this.time },
      },
      vertexShader: `
      varying vec2 vUv;
        void main () {
          vUv = uv;
          gl_Position = projectionMatrix
          * modelViewMatrix
          *vec4( position, 1.0);
        }
      `,
      fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      uniform float scrollSpeed;
      uniform float time;
      float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
      void main () {
        vec2 newUV = vUv;
        vec4 t = texture2D( tDiffuse, newUV);
        vec3 color = vec3(t.r, t.g, t.b);

        float fade = smoothstep(0.3, 0., newUV.y);
        newUV.x -= (vUv.x - 0.5)*0.1*fade*scrollSpeed*0.5;
        gl_FragColor = texture2D(tDiffuse, newUV);

      }
      `,
    }

    this.myEffect2 = {
      uniforms: {
        tDiffuse: { value: null },
        scrollSpeed: { value: null },
        time: { value: this.time },
      },
      vertexShader: `
      varying vec2 vUv;
        void main () {
          vUv = uv;
          gl_Position = projectionMatrix
          * modelViewMatrix
          *vec4( position, 1.0);
        }
      `,
      fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      uniform float scrollSpeed;
      uniform float time;
      float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
      void main () {
        vec2 newUV = vUv;
        vec4 t = texture2D(tDiffuse, newUV);
        vec3 color = vec3(t.r, t.g, t.b);

        //noise
        float val = hash(vUv + time)*0.13;

        gl_FragColor = vec4(color + vec3(val), .01);

      }
      `,
    }

    this.custompass = new ShaderPass(this.myEffect)
    this.custompass1 = new ShaderPass(this.myEffect2)
    this.custompass.renderToScreen = true
    this.custompass1.renderToScreen = true

    this.composer.addPass(this.custompass)
    // this.composer.addPass(this.custompass1)
  }

  stop() {
    this.isPlaying = false
  }

  play() {
    if (!this.isPlaying) {
      this.render()
      this.isPlaying = true
    }
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05
    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render.bind(this))
    this.custompass.uniforms.scrollSpeed.value = this.currentSpeed
    this.custompass.uniforms.time.value = this.time
    this.custompass1.uniforms.time.value = this.time * 0.011
    this.lenis.raf(this.time * 300)
    this.setPosition()
    // this.renderer.render(this.scene, this.camera)
    this.composer.render()
  }
}
