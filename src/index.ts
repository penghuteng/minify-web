#!/usr/bin/env node
"use strict"

import { Command } from 'commander'
import packageJson from "../package.json"
import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import cssmin from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import path from 'path'
import fs from 'fs'

const program = new Command()

program
  .option("-D, --dir <Folder>", "Want minify folder", "src")
  .option("-O, --out <Folder>", "Output folder", "dist")
  .version(`${packageJson.version}`, '-V, --version')
  .usage("<command> [options]")

program.parse(process.argv)

const options = program.opts()

let outdir = options.out
let rootdir = options.dir

if (!outdir.startsWith("/")) {
  outdir = path.join(process.cwd(), outdir)
}
if (!rootdir.startsWith("/")) {
  rootdir = path.join(process.cwd(), rootdir)
}
if (!fs.existsSync(rootdir)) {
  console.error(`Folder not found: ${rootdir}`)
  console.error()
  if(options.dir === "src"){
    console.error("You can set the -D or --dir setting and directory")
  }
  console.error()
  process.exit(1)
}

function deleteFolderRecursive(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子文件夹
        deleteFolderRecursive(curPath);
      } else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}
deleteFolderRecursive(outdir)

gulp.task("minify-html", () => {
  return gulp.src(path.join(rootdir, "**/*.html"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(outdir))
})

gulp.task("minify-css", () => {
  return gulp.src(path.join(rootdir, "**/*.css"))
    .pipe(cssmin())
    .pipe(gulp.dest(outdir))
})

gulp.task("minify-js", () => {
  return gulp.src(path.join(rootdir, "**/*.js"))
    .pipe(uglify())
    .pipe(gulp.dest(outdir))
})

gulp.task("copy-file", () => {
  return gulp.src(path.join(rootdir, "**/*.!(html|css|js)"), { removeBOM: false })
    .pipe(gulp.dest(outdir))
})

gulp.task("default",
  gulp.series(
    "minify-html", "minify-js", "minify-css", "copy-file"
  )
)

gulp.series("default")(function () { })
