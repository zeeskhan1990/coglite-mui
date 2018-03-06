import { FuseBox, CSSPlugin, SassPlugin, Sparky, CopyPlugin, ReplacePlugin } from "fuse-box"
import { spawn } from "child_process"
import * as pjson from "./package.json"
import { palette } from "./src/app/views/theme/palette"

const DEV_PORT = 4445
const OUTPUT_DIR = "out"
const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]
const ASSETS_DIR = "src/app/assets"

const isProduction = process.env.NODE_ENV === "production"

Sparky.task("copy-html", () => {
  return Sparky.src("src/app/index.html").dest(`${OUTPUT_DIR}/$name`)
})

const preTasks = ["copy-html"]

Object.keys(palette).forEach(paletteKey => {
  const currentPalette = palette[paletteKey]
  const currentTask = `theme_${paletteKey}`
  console.log("###############################")
  console.log(currentPalette)
  console.log(currentTask)
  Sparky.task(currentTask, () => {
    return Sparky.src(`${ASSETS_DIR}/base-colors.scss`)
      .file("*.*", file => {
        file.rename(`${currentTask}.scss`)
        file.read()
        file.setContent(`
            $mdc-theme-primary: ${currentPalette.primary};
            $mdc-theme-secondary: ${currentPalette.secondary};
            $mdc-theme-background: ${currentPalette.background};
            ${file.contents}
            `)
      })
      .dest(`${ASSETS_DIR}/$name`)
  })
  preTasks.push(currentTask)
})

console.log(preTasks)

// shared task
Sparky.task("default", preTasks, () => {
  const fuse = FuseBox.init({
    homeDir: "src",
    output: `${OUTPUT_DIR}/$name.js`,
    target: "electron",
    log: isProduction,
    cache: !isProduction,
    sourceMaps: true,
    tsConfig: "tsconfig.json",
  })

  // start the hot reload server
  if (!isProduction) {
    fuse.dev({ port: DEV_PORT, httpServer: false })
  }

  // bundle the electron main code
  const desktopBundle = fuse
    .bundle("desktop")
    .target("server")
    .instructions("> [desktop/main.ts]")
    // inject in some configuration
    .plugin(
      ReplacePlugin({
        "process.env.HOMEPAGE": pjson.homepage ? `"${pjson.homepage}"` : "null",
      }),
    )

  // and watch unless we're bundling for production
  if (!isProduction) {
    desktopBundle.watch()
  }

  // bundle the electron renderer code
  const rendererBundle = fuse
    .bundle("webapp")
    .instructions("> [app/index.tsx] +fuse-box-css")
    .plugin([
      SassPlugin({ importer: true }),
      CSSPlugin({
        outFile: file => `${OUTPUT_DIR}/${file}`,
        inject: false,
      }),
    ])
    .plugin(CopyPlugin({ useDefault: false, files: ASSETS, dest: "assets", resolve: "assets/" }))

  if (!isProduction) {
    rendererBundle.watch()
    rendererBundle.hmr()
  }

  return fuse.run().then(() => {
    if (!isProduction) {
      spawn("node", [`${__dirname}/node_modules/electron/cli.js`, __dirname], {
        stdio: "inherit",
      }).on("exit", code => {
        console.log(`electron process exited with code ${code}`)
        process.exit(code)
      })
    }
  })
})
