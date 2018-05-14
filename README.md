# Filsökaren

Skriptmodul framtagen för att redaktörer enkelt ska kunna hitta vart filer har laddats upp. Främst användbart när man har laddat upp en fil på en sida som man vid ett senare tillfälle inte hittar.

![Exempel](docs/example.png "Exempel")

## Installation

1. Ladda ner och packa upp [det här zip-arkivet][1].
2. Ladda upp filerna `file-finder-server.js` och `file-finder.vm` i filarkivet för ditt hus. *Förslagsvis skapar du upp en egen mapp för den här funktionen så du har filerna samlade.*
3. Lägg ut en [skriptmodul][2] på en sida.
4. Under fliken [*JavaScript*][3] pekar du ut filen `file-finder-server.js` som du laddade upp i *Steg 2*.
5. Efter det gör du likadant under fliken [*Velocity*][4] men pekar då ut filen `file-finder.vm`.

[1]: https://api.github.com/repos/hampusn/file-finder/zipball
[2]: https://help.sitevision.se/SiteVision_4_0/scriptHelp.html
[3]: https://help.sitevision.se/SiteVision_4_0/1234567.html
[4]: https://help.sitevision.se/SiteVision_4_0/velocity.html
