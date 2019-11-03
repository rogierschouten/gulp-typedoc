
const fs = require("fs");
const cp = require("child_process");

cp.execSync("rm -Rf node_modules")
const file = fs.readFileSync("package.json")
const content = JSON.parse(file)
const dependencies = content.dependencies;
content.dependencies = undefined;
const devDependencies = content.devDependencies;
content.devDependencies = undefined;
fs.writeFileSync("package.json", JSON.stringify(content, undefined, 2));

function run(cmd) {
	cp.execSync(cmd, { cwd: __dirname, stdio: ["inherit", "inherit", "inherit"]})
}

run(`npm install ${Object.keys(dependencies).join(" ")}`);
run(`npm install -D ${Object.keys(devDependencies).join(" ")}`);
