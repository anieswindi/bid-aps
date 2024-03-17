/** @type {<A>(arg: A) => A} */
const withRoutes = require("nextjs-routes/config")();

/** @type {() => import('next').NextConfig} */
module.exports = () => {
  const mergedConfig = Object.assign(
    withRoutes({
      typescript: {
        ignoreBuildErrors: true,
      },
    })
  );

  return mergedConfig;
};
