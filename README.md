# Demo av Big list of Naughty Strings - faggruppemøte Sikkerhet + Bunnsolide Webløsninger

## Gjør følgende
1. Last ned Postman (https://www.postman.com/downloads/)
2. Klon repo (https://github.com/bekk/BLNS)
   1. Naviger til repo og kjør `npm install` og `npm run dev`
3. Se video for hvordan kjøre collections (https://www.youtube.com/watch?v=q7rkPG0f6Gc)
4. Skriv test i Postman for POST-request mot http://localhost:5173/api - Alle requestene vil by default gi 200 OK, men oppgaven deres blir å validere input mot et tenkt scenario (tenk FLRT) og responder med 400 Bad Request dersom dataene ikke validerer mot deres regler.
   1. Se her https://learning.postman.com/docs/writing-scripts/test-scripts/ for hvordan skrive tester i Postman
   2. 5. En del av testene vil feile med 500-feil. Det er din/deres jobb å validere/sanitere input slik at ikke serveren krasjer
5. Gjør manuell testing mot skjema dere finner her http://localhost:5173
	1. Husk: Det er ingen fasit. Prøv dere frem.
	2. Koden er satt opp til å rendre verdi man sender inn via skjema. Det er en dårlig idé, men gjøres her for å bevise et poeng.
6. Slett Postman hvis dere ikke vil ha det på maskinen lenger

### Annet

* Se video om XSS https://youtu.be/PPzn4K2ZjfY?si=fR0T_qAaUYH2cXVK
* Video som forklarer "korrekt" bruk av alert ved XSS-testing: https://youtu.be/KHwVjzWei1c?si=k6Wn7jFkTkZpWLG8

## Development

Run the Vite dev server:

```shellscript
npm run dev
```