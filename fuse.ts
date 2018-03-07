import {
  FuseBox,
  CSSPlugin,
  SassPlugin,
  Sparky,
  CopyPlugin,
  ReplacePlugin,
  QuantumPlugin,
} from "fuse-box"
import { spawn } from "child_process"
import * as pjson from "./package.json"
import { palette } from "./src/app/views/theme/palette"

const DEV_PORT = 4445
const OUTPUT_DIR = "out"
const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]
const ASSETS_DIR = "./src/app/assets"

const isProduction = process.env.NODE_ENV === "production"

Sparky.task("copy-html", () => {
  return Sparky.src("src/app/index.html").dest(`${OUTPUT_DIR}/$name`)
})

const preTasks = ["copy-html"]
const materialSass = []

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
        materialSass.push(`import "./assets/${currentTask}.scss"`)
        console.log(materialSass.join("\n"))
      })
      .dest(`${ASSETS_DIR}/$name`)
  })
  preTasks.push(currentTask)
})

Sparky.task("sassImportTask", () => {
  return Sparky.src(`./src/app/index.tsx`)
    .file("*.*", file => {
      const importText = materialSass.join("\n")
      file.rename(`styled-index.tsx`)
      file.read()
      file.setContent(`
        ${importText}
        ${file.contents}
      `)
    })
    .dest(`./src/app/$name`)
})

preTasks.push("sassImportTask")

//Sparky.src(`${OUTPUT_DIR}/assets/*.scss`)

/* .file("*.*", file => {
      file.read()
      file.plugin(SassPlugin({ importer: true })).plugin(CSSPlugin({
        outFile: file => `${OUTPUT_DIR}/${file}`,
        inject: false
      }))
    }) */
/* .plugin(SassPlugin({ importer: true }))
    .plugin(CSSPlugin({
      outFile: file => `${OUTPUT_DIR}/${file}`,
      inject: false,
    })) */
//.dest(`${ASSETS_DIR}/$name`)

/* {
    outFile: file => `${OUTPUT_DIR}/${file}`,
    inject: false
  } */

/* Sparky.src(`${ASSETS_DIR}/base-csdfsadasd.scss`).next(file => SassPlugin({
    importer: true,
    includePaths:[file.filepath]
  })) */
/* .file("*.*", file => {
    file.rename(`base-colors-test.css`)
  })
  .dest(`${ASSETS_DIR}/$name`) */

/* Sparky.task("testTask", () => {
  return Sparky.src(`${ASSETS_DIR}/base-colors.scss`)
  .plugin(SassPlugin({ importer: true }))
  .plugin(CSSPlugin())
  .plugin(QuantumPlugin({css: true}))
  .dest(`${ASSETS_DIR}`)
}) */

//preTasks.push("testTask");
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

  // bundle the electron renderer code      +fuse-box-css
  const rendererBundle = fuse
    .bundle("webapp")
    .instructions("> [app/styled-index.tsx]")
    /* .plugin(
      ReplacePlugin({
        "process.env.BREAKBONE": "beak",
      })
    ) */
    .plugin([
      SassPlugin({ importer: true }),
      CSSPlugin({
        outFile: file => {
          const fileName = file.split("/").pop()
          console.log(fileName)
          return `${OUTPUT_DIR}/assets/${fileName}`
        },
        inject: false,
      }),
      //QuantumPlugin({css: true})
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
