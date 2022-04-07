# prekyba

Reikalavimai:
SQL Server Management Studio
SQL Server 2019
VisualStudio Code
.Net 6
Node.js

Prieš pradedant diegimą rekomenduojama ištrinti iš ./api folderio bin ir obj aplankalus.
Turint kompiuteryje suinstaliuotas reikalingas programas, VisualStudio Code Terminale ( Ctrl + ` ) rašomos šios komandos tolesniam diegimui:

API folderyje:
dotnet add package Microsoft.EntityFrameworkCore

dotnet add package Microsoft.EntityFrameworkCore.SqlServer

dotnet tool install --global dotnet-ef

dotnet add package Microsoft.EntityFrameworkCore.Design

dotnet build

dotnet run

SHOP folderyje:
npm install
npm i -g typescript
npm i -g @angular/cli
ng add @angular/material
ng serve

Duomenų bazę galima pasiekti https://localhost:7285/swagger 
Advanced > Continue
