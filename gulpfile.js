const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const include = require("gulp-include");
const uglify = require("gulp-uglify");
const twig = require("gulp-twig");
const data = require("gulp-data");
const plumber = require("gulp-plumber");
const htmlbeautify = require("gulp-html-beautify");
const inject = require("gulp-inject");
const replace = require("gulp-string-replace");
const browserSync = require("browser-sync").create();
const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");
const del = require("del");
const jsonMerger = require("json-merger");

const OUT = "dist";
const ASSETS = "assets";
const TMP = ".gulp-cache";

function mergeData() {
  const files = glob.sync("src/components/**/*.json").filter(file => fs.statSync(file).size > 0);
  if (fs.existsSync("src/data.json")) files.unshift("src/data.json");
  if (files.length) fs.writeFileSync("src/data.json", JSON.stringify(jsonMerger.mergeFiles(files), null, 2));
}
function templates() {
  mergeData();
  return gulp.src("src/layouts/*.twig")
    .pipe(plumber())
    .pipe(data(() => JSON.parse(fs.readFileSync("src/data.json", "utf8"))))
    .pipe(twig({ namespaces: { components: "src/components", images: "src/images/ico" } }))
    .pipe(replace(/(["'(])images\//g, "$1/assets/images/"))
    .pipe(htmlbeautify({ max_preserve_newlines: 1, indentSize: 2, indent_with_tabs: true }))
    .pipe(gulp.dest(OUT));
}
function index() {
  return gulp.src("src/layouts/index.html")
    .pipe(inject(gulp.src([OUT + "/*.html", "!" + OUT + "/index.html"], { read: false }), {
      transform(filepath) {
        const name = path.basename(filepath);
        return '<li class="list-group-item"><a class="btn btn-link" href="' + name + '">' + name + '</a></li>';
      }
    }))
    .pipe(gulp.dest(OUT));
}
function sassBuild() {
  return gulp.src("src/scss/styles.scss")
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(gulp.dest(TMP));
}
function css() {
  return gulp.src([TMP + "/styles.css", "src/css/legacy/hc-home.css", "src/css/legacy/hc-redesign.css", "src/css/legacy/hc-polish.css", "src/css/legacy/hc-fixes.css", "src/css/legacy/hc-tables.css", "src/css/legacy/hc-roster.css", "src/css/legacy/hc-roster-tweaks.css", "src/css/legacy/hc-standings.css", "src/css/legacy/hc-select.css", "src/css/legacy/hc-subpages.css", "src/css/legacy/hc-editorial.css", "src/css/legacy/hc-matches.css", "src/css/legacy/hc-brand.css", "src/css/legacy/hc-partners.css"], { allowEmpty: true })
    .pipe(concat("style.css"))
    .pipe(replace(/\.\.\/fonts\//g, "../../assets/fonts/"))
    .pipe(replace(/\.\.\/images\//g, "../../assets/images/"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(OUT + "/css"))
    .pipe(browserSync.stream());
}
function scripts() {
  return gulp.src("src/js/scripts.js")
    .pipe(include())
    .pipe(uglify())
    .pipe(gulp.dest(OUT + "/js"));
}
function images() {
  return gulp.src("src/images/**/*", { base: "src/images", allowEmpty: true }).pipe(gulp.dest(ASSETS + "/images"));
}
function fonts() {
  return gulp.src("src/fonts/**/*", { base: "src/fonts", allowEmpty: true }).pipe(gulp.dest(ASSETS + "/fonts"));
}
function favicon() {
  return gulp.src("src/favicon/**/*", { base: "src/favicon", allowEmpty: true }).pipe(gulp.dest(ASSETS + "/favicon"));
}
function clean() { return del([OUT, ASSETS, TMP]); }
function serve(done) {
  browserSync.init({ server: { baseDir: "." }, startPath: "/dist/index.html", notify: false });
  done();
}
function reload(done) { browserSync.reload(); done(); }
function watch() {
  gulp.watch(["src/scss/**/*.scss", "src/components/**/*.scss", "src/css/legacy/**/*.css"], gulp.series(sassBuild, css));
  gulp.watch(["src/js/**/*.js", "src/components/**/*.js"], gulp.series(scripts, reload));
  gulp.watch(["src/layouts/**/*.{twig,html}", "src/components/**/*.{twig,json}"], gulp.series(templates, index, reload));
  gulp.watch("src/images/**/*", gulp.series(images, reload));
  gulp.watch("src/fonts/**/*", gulp.series(fonts, reload));
  gulp.watch("src/favicon/**/*", gulp.series(favicon, reload));
}
const build = gulp.series(clean, gulp.parallel(gulp.series(templates, index), gulp.series(sassBuild, css), scripts, images, fonts, favicon));
gulp.task("build", build);
gulp.task("default", gulp.series(build, gulp.parallel(watch, serve)));
