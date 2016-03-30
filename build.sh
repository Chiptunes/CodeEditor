cd static
browserify script.js -o comp.js
cat hack.js comp.js events.js > script.dev.js
rm comp.js
