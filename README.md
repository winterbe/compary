# Compary [![Travic CI](https://travis-ci.org/winterbe/compary.svg?branch=master)](https://travis-ci.org/winterbe/compary)

> A library for composing complex compare-functions.

```js
persons.sort(
    compareBy(p => p.lastName)
        .thenBy(p => p.firstName)
);
```

---

<p align="center">
<strong>★★★ Like this project? <a href="https://github.com/winterbe/compary/stargazers">Leave a star</a> and <a href="https://twitter.com/winterbe_">feedback on Twitter</a>! Thanks. ★★★</strong>
</p>

---

## Getting started

Download the [latest release](https://github.com/winterbe/compary/releases) from GitHub or install Compary from [NPM](https://www.npmjs.com/package/compary):

```bash
npm install --save compary
```

Alternatively use Compary from [CDN](https://unpkg.com/compary/) by adding this to your HTML:

```html
<script src="https://unpkg.com/compary"></script>
```

## License

MIT © [Benjamin Winterberg](https://twitter.com/winterbe_)
