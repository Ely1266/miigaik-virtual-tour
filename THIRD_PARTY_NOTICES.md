# Уведомления о сторонних компонентах (Third-party notices)

## Pannellum 2.5.7 — MIT

Рабочая библиотека просмотра панорам, включаемая в клиентскую сборку. Источник: https://github.com/mpetroff/pannellum и `node_modules/pannellum/COPYING` версии 2.5.7. Оригинальный текст:

```text
Copyright (c) 2011-2026 Matthew Petroff

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Инструменты разработки (не предназначены для поставки в веб-сборке)

| Компонент | Версия | Лицензия | Источник |
|---|---|---|---|
| vite | 6.4.6 | MIT | [Пакет](https://registry.npmjs.org/vite/-/vite-6.4.6.tgz) — `LICENSE.md` |
| typescript | 5.9.3 | Apache-2.0 | [Пакет](https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz) — `LICENSE.txt` |
| rollup | 4.68.4 | MIT | [Пакет](https://registry.npmjs.org/rollup/-/rollup-4.68.4.tgz) — `LICENSE.md` |
| esbuild | 0.25.12 | MIT | [Пакет](https://registry.npmjs.org/esbuild/-/esbuild-0.25.12.tgz) — `LICENSE.md` |
| picocolors | 1.1.1 | ISC | [Пакет](https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz) — `LICENSE` |
| source-map-js | 1.2.2 | BSD-3-Clause | [Пакет](https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz) — `LICENSE` |
| nanoid | 3.3.20 | MIT | [Пакет](https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz) — `LICENSE` |
| postcss | 8.5.33 | MIT | [Пакет](https://registry.npmjs.org/postcss/-/postcss-8.5.33.tgz) — `LICENSE` |
| fdir | 6.5.0 | MIT | [Пакет](https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz) — `LICENSE` |
| picomatch | 4.0.7 | MIT | [Пакет](https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz) — `LICENSE` |
| tinyglobby | 0.2.17 | MIT | [Пакет](https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz) — `LICENSE` |
| @types/estree | 1.0.10 | MIT | [Пакет](https://registry.npmjs.org/@types/estree/-/estree-1.0.10.tgz) — `LICENSE` |

Полный перечень 66 npm-пакетов с версиями и лицензиями: [docs/licenses.md](docs/licenses.md), раздел 3; машинный результат — [docs/license-scan.txt](docs/license-scan.txt). При отдельном распространении инструментов/`node_modules` сохранять их полные LICENSE, NOTICE и другие уведомления, в том числе о вложенных компонентах. Не подменять их этим списком.

Pillow и NumPy используются только скриптами подготовки изображений; конкретные версии в рабочей среде автора пока не зафиксированы. Leaflet, OpenStreetMap, реальные планы и фотографии в данной версии не включены. Условия материалов МИИГАиК и происхождение отдельных графических элементов требуют проверки, см. лицензионный паспорт.

Перед публикацией готовой статической сборки включить в распространяемый комплект этот файл (с полным текстом лицензии Pannellum) и проверить, что уведомления доступны пользователю вместе со сборкой.
