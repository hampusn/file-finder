# Filsökaren

Skriptmodul framtagen för att redaktörer enkelt ska kunna hitta vart filer har laddats upp. Främst användbart när man har laddat upp en fil på en sida som man vid ett senare tillfälle inte hittar.

## Installation

1. Ladda ner [zip-arkivet för det här projektet][1].
2. Ladda upp filerna `file-finder-server.js` och `file-finder.vm` i filarkivet för ditt hus.
3. Lägg ut en [skriptmodul][2] på en sida.
4. Under fliken *JavaScript* pekar du ut filen `file-finder-server.js` som du laddade upp i steg 2.
5. Efter det gör du likadant under fliken *Velocity* men pekar då ut filen `file-finder.vm`.

## Utseendeanpassning via Envision

Den här skriptlösningen använder stilklasser från [SiteVisions nya ramverk Envision][3] som följer med i **SiteVision 4.3**. Har du en tidigare version av SiteVision kan du ladda upp stilmallen `envision.css` som du hittar i mappen *envision* i zip-arkivet. Se sedan till att stilmallen laddas in på sidan med skriptmodulen med hjälp av funktionen [Lokala CSS-tillägg][4].

[1]: https://api.github.com/repos/hampusn/file-finder/zipball
[2]: https://help.sitevision.se/SiteVision_4_0/scriptHelp.html
[3]: http://envisionui.io/
[4]: https://help.sitevision.se/SiteVision_4_0/localCSSAssetsHelp.html