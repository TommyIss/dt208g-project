# Projektuppgift i kursen DT208G, Programmering i TypeScript

## Uppgiftbeskrivning
Uppgiften handlar om att skapa en webbplats för elever som består av två sidor:
- Kurs-sida där användare kan se kurser, filtrera dem via sökfält på kurskod och kursnamn, sortera kurser i stigande eller fallande ordning enligt namn, kurskod, poäng samt ämne, och möjligt att lägga till kurser i ramschema
- Ramschema-sida där användare kan se vilka kurser som är tillagda, antalpoäng och möjlighet att ta bort en kurs 

## Min applikation
Min applikation har skapats med Angular samt TypeScript. Webbplatsen består av två undersidor:
- En för att visa kurser, söka kurser via sökfält samt genom att välja ett ämne, sortera dem i stigande eller fallande ordning beroende av namn, kurskod, poäng samt ämne, och lägga till kurs.
- En för ramschema av de tillagda kurser, och finns möjlighet för sortering samt filtrering av kurserna, se antal högskolepoäng och även möjlighet för att ta bort kurser.

Två komponenter har skapats, en för varje undersida. Routing har använts för att navigera mellan komponenterna.

Två tjänster har skapats: 
- Den ena för att hämta data från json-filen samt uppdatera kursens status när användaren lägger till en kurs eller tar bort från ramschemat.   
- Den andra för att lägga till kurser från kurs-sida till ramschema, lista ut kurserna med möjlighet att ta bort dem.

Användaren kan lägga till kursen bara en gång och kan se efter det att knappen blir inaktiverad och dess text har ändrats till "Tillagd" för undvika dubletter av kurs i ramschemat.

### Tommy Issa, tois2401