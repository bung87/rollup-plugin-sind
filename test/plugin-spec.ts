import expect from 'expect.js';
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import sid from '../src/index'
import * as rollup from 'rollup'
import fs from 'fs'
const config = {

    input: "example.js",
    output: {
        file: "tmp/example.js",
        format: "cjs",
        sourcemap: false,
    },
    plugins: [
        resolve(),
        typescript({ tsconfig: "test/rollup.tsconfig.json" }),
        commonjs({ include: "node_modules/**" }),
        sid()
    ]
}
it('test plugin', async () => {
    // create a bundle
    const { input, plugins } = config
    const bundle = await rollup.rollup({ input, plugins });
    // generate code and a sourcemap
    // @ts-ignore
    await bundle.generate(config.output, plugins);

    // @ts-ignore
    await bundle.write(config.output);
    const res = fs.readFileSync(config.output.file).toString()
    expect(res).to.not.contain("&")
    expect(res).to.not.contain("tpl")
});