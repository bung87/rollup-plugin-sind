
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import json from '@rollup/plugin-json'
import pkg from "./package.json";

const moduleVersion = "v" + pkg.version;
const nodePlugins = [
    json(),
    resolve(),
    // string({ include: '**/*.md' }),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs({ include: ["node_modules/**","../sind/node_modules/*"] ,namedExports: { ' ../sind/node_modules/cheerio/index.js': ['load']}} ),
    cleanup(),
    filesize(),
];

const banner = "/* " + pkg.name + " " + moduleVersion + " */";
const esmBuild = {
    external: Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.peerDependencies || {})),
    input: "src/index.ts",
    output: {
        banner,
        file: pkg.module,
        format: "esm",
        sourcemap: false,
    },
    plugins: nodePlugins,
    watch: {
        clearScreen: false,
    },
};
const commonJSBuild = {
    ...esmBuild,
    plugins: nodePlugins,
    // tslint:disable-next-line: object-literal-sort-keys
    output: { file: pkg.main, format: "cjs", banner, sourcemap: false },
};

// tslint:disable-next-line:no-default-export
export default [esmBuild, commonJSBuild];
