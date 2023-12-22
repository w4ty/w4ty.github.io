const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(`./src${src}`, {
    widths: [300, 800, "auto"],
    formats: ["avif", "jpeg", "webp"],
    urlPath: "/images/",
    outputDir: "./public/images/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);
    eleventyConfig.addPassthroughCopy("CNAME");

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
};