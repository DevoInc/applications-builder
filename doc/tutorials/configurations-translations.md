The translations of the texts within the applications are available, and the
language to be displayed is captured from the Devo platform.

The main class to this task, is implemented in _Devo Applications Builder_ in
the [I18n](I18n.html) class.
The translations consist of json files, with a key-value object of the
translations to be applied.
The _key_ is the text to be translated and the _value_ is the translation.
If a language is not found, by default, the written text is displayed.

These files must be stored within the `src/i18n/` directory and each file
should be named in ISO format. For example, `es_ES.json`.

Example of a Spanish language translation file (`src/i18n/es_ES.json`):

```json
{
  "TAB 1": "PESTAÑA 1",
  "Section 1": "Sección 1",
  "Widget 1": "Widget 1",
  "Section 2": "Sección 2",
  "Widget 2": "Widget 2",
  "TAB 2": "PESTAÑA 2",
  "Option A": "Opción A",
  "Option B": "Opción B"
}
```

In addition, those files need to be loaded in the `src/app.js` file.

```javascript
bootstrap.langs({
  es_ES: require("./i18n/es_ES.json"),
});
```

To use translations in html file, just wrap the text in `${__("Text to be translated")}`.

```javascript
<section class="lt-vapp-section" id="section11">
  <h3 class="lt-vapp-section-title">${__("Section 1")}</h3>
  ...
  <div class="lt-vapp-widget-graphic inner-padding">
    <select>
      <option>${__("Option A")}</option>
      <option>${__("Option B")}</option>
    </select>
  </div>
</section>
```
