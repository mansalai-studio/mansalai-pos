import slugify from 'slugify';

class Slug {
    public static generate = (name: string): string => {
        return slugify(name, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
          })
    }
}

export default Slug