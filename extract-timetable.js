// Extrahierte Daten aus den Timetable-Bildern
const festivalData = {
  days: [
    {
      name: "Samstag",
      date: "2023-05-27", // Beispieldatum, bitte anpassen
      stages: [
        {
          name: "Olymp Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "BEACHBAG" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "REWI" },
            { time: "19:00", artist: "BENNETT" },
            { time: "20:00", artist: "CHANGE OVER" },
            { time: "21:00", artist: "SCOOTER LIVE" },
            { time: "22:00", artist: "CHANGE OVER" },
            { time: "23:00", artist: "HBZ" },
            { time: "00:00", artist: "VINI VICI" },
            { time: "01:00", artist: "MANDY" },
            { time: "02:00", artist: "SUB ZERO PROJECT" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Minos Tent",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "T78" },
            { time: "20:00", artist: "I HATE MODELS" },
            { time: "21:00", artist: "" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "STELLA BOSSI" },
            { time: "00:00", artist: "CHARLIE SPARKS" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "?????????" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Nox Stage",
          acts: [
            { time: "14:00", artist: "VILLAIN" },
            { time: "15:00", artist: "NOTHING BUT LOVE" },
            { time: "16:00", artist: "ALFRED HEINRICHS" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "FRONTLINER" },
            { time: "19:00", artist: "THE PURGE" },
            { time: "20:00", artist: "VERTILE" },
            { time: "21:00", artist: "MAXTREME: OPSM MAXIM" },
            { time: "22:00", artist: "ROOLER" },
            { time: "23:00", artist: "RIOT SHIFT VS TOZA" },
            { time: "00:00", artist: "MUTILATOR" },
            { time: "01:00", artist: "MORTIS VS THE SMILER" },
            { time: "02:00", artist: "NOISEFLOW" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Forest Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "SONNENSYSTEME" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "SPACEDRIVER" },
            { time: "18:00", artist: "LOST IDENTITY" },
            { time: "19:00", artist: "" },
            { time: "20:00", artist: "FORMAT:B" },
            { time: "21:00", artist: "" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "MILA STERN" },
            { time: "00:00", artist: "" },
            { time: "01:00", artist: "MOONBOOTICA" },
            { time: "02:00", artist: "AKA AKA" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Hade Cage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "FOOLIK" },
            { time: "17:00", artist: "HU" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "OLIVER KOLETZKI" },
            { time: "20:00", artist: "CALLUSH" },
            { time: "21:00", artist: "" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "CARV" },
            { time: "00:00", artist: "DJ YARAK" },
            { time: "01:00", artist: "LESSSS" },
            { time: "02:00", artist: "REBEKAH" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Onos Stage",
          acts: [
            { time: "14:00", artist: "SCHWEISS-BRENNER" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "PARACEK" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "JUSTIN TIMBERLATE B2B ELOTRANCE" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "CLEOPARD2000 B2B DAVYBOI" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "" },
            { time: "00:00", artist: "" },
            { time: "01:00", artist: "SOMEWHEN" },
            { time: "02:00", artist: "TRANCEMASTER KRAUSE" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Medusa Jungle",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "FALEX & DECHANT" },
            { time: "19:00", artist: "TRIP-TAMINE" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "MORTEN GRANAU" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "QUEROX" },
            { time: "00:00", artist: "INTERACTIVE NOISE" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "KLOPFGEISTER" },
            { time: "03:00", artist: "" }
          ]
        }
      ]
    },
    {
      name: "Freitag",
      date: "2023-05-26", // Beispieldatum, bitte anpassen
      stages: [
        {
          name: "Olymp Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "DOMENICO RONDINELLI" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "LOVRA" },
            { time: "20:00", artist: "BORIS BREJCHA" },
            { time: "21:00", artist: "" },
            { time: "22:00", artist: "FISHER LIVE" },
            { time: "23:00", artist: "DEBORAH DE LUCA" },
            { time: "00:00", artist: "" },
            { time: "01:00", artist: "ARMIN VAN BUUREN" },
            { time: "02:00", artist: "KEVIN DE VRIES" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Minos Tent",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "ALICEA" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "LAUREN MIA" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "MORITZ HOFBAUER LIVE" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "KALTE LIEBE LIVE" },
            { time: "00:00", artist: "ALIGNMENT" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "" },
            { time: "03:00", artist: "HOLY PRIEST" }
          ]
        },
        {
          name: "Nox Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "RAPTYRE" },
            { time: "18:00", artist: "TEKNOCLASH" },
            { time: "19:00", artist: "VILLAIN" },
            { time: "20:00", artist: "JAY REEVE PRESENTS POWERESS" },
            { time: "21:00", artist: "RADICAL REDEMPTION" },
            { time: "22:00", artist: "THE STRAIKERZ" },
            { time: "23:00", artist: "KROWDEXX PRESS THE MOMENT" },
            { time: "00:00", artist: "DUAL DAMAGE" },
            { time: "01:00", artist: "DR DONK" },
            { time: "02:00", artist: "LIL TEXAS" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Forest Stage",
          acts: [
            { time: "14:00", artist: "DERON" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "SHIMZA" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "BONTAN" },
            { time: "20:00", artist: "BYORN" },
            { time: "21:00", artist: "HUGEL" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "RON FLATTER" },
            { time: "00:00", artist: "" },
            { time: "01:00", artist: "KAUFMANN" },
            { time: "02:00", artist: "" },
            { time: "03:00", artist: "MEHR IS MEHR" }
          ]
        },
        {
          name: "Hade Cage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "GROSSOMODO" },
            { time: "16:00", artist: "DAVID STRASSER" },
            { time: "17:00", artist: "CULTBRO" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "B2" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "NOVAH" },
            { time: "22:00", artist: "NUSHA" },
            { time: "23:00", artist: "MISCHLUFT" },
            { time: "00:00", artist: "WINSON" },
            { time: "01:00", artist: "VENDEX" },
            { time: "02:00", artist: "" },
            { time: "03:00", artist: "LEE ANN ROBERTS" }
          ]
        },
        {
          name: "Onos Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "JANIS ZIELINSKI" },
            { time: "19:00", artist: "MIKA HEGGEMANN" },
            { time: "20:00", artist: "RAD BOOMBOX" },
            { time: "21:00", artist: "OTTA" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "" },
            { time: "00:00", artist: "JUSTIN JAY B2B OLLIE LISHMAN" },
            { time: "01:00", artist: "AFEM SYKO" },
            { time: "02:00", artist: "MJA" },
            { time: "03:00", artist: "ADRIÁN MILLS" }
          ]
        },
        {
          name: "Medusa Jungle",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "MRTI" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "JEAN MARIE" },
            { time: "19:00", artist: "HIDDEN SECRET" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "PRIBE" },
            { time: "22:00", artist: "FABIO FUSCO" },
            { time: "23:00", artist: "" },
            { time: "00:00", artist: "PHAXE" },
            { time: "01:00", artist: "AUDIOMATIC" },
            { time: "02:00", artist: "HATIKWA" },
            { time: "03:00", artist: "" }
          ]
        }
      ]
    },
    {
      name: "Sonntag",
      date: "2023-05-28", // Beispieldatum, bitte anpassen
      stages: [
        {
          name: "Olymp Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "DJ TEA" },
            { time: "16:00", artist: "KAY C" },
            { time: "17:00", artist: "NOEL HOLLER" },
            { time: "18:00", artist: "DIE GEBRÜDER BRETT" },
            { time: "19:00", artist: "CHANGE OVER" },
            { time: "20:00", artist: "FINCH LIVE" },
            { time: "21:00", artist: "CHANGE OVER" },
            { time: "22:00", artist: "ALLE FARBEN" },
            { time: "23:00", artist: "MAUSIO" },
            { time: "00:00", artist: "NEELIX" },
            { time: "01:00", artist: "DA TWEEKAZ" },
            { time: "02:00", artist: "MAXTREME" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Minos Tent",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "ROMAN WEBER" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "SCHROTTHAGEN" },
            { time: "19:00", artist: "" },
            { time: "20:00", artist: "ELLEN ALLIEN" },
            { time: "21:00", artist: "" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "SAM PAGANINI" },
            { time: "00:00", artist: "AMELIE LENS" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "" },
            { time: "03:00", artist: "KOBOSIL" }
          ]
        },
        {
          name: "Nox Stage",
          acts: [
            { time: "14:00", artist: "MC ROBS" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "LEXXY CHAINZ" },
            { time: "18:00", artist: "LUMEX" },
            { time: "19:00", artist: "NAMARA" },
            { time: "20:00", artist: "HYSTA" },
            { time: "21:00", artist: "ANGERFIST" },
            { time: "22:00", artist: "N-VITRAL" },
            { time: "23:00", artist: "DEADLY GUNS" },
            { time: "00:00", artist: "DIMITRI K" },
            { time: "01:00", artist: "UNICORN ON K" },
            { time: "02:00", artist: "" },
            { time: "03:00", artist: "PELE & SHAWNECY" }
          ]
        },
        {
          name: "Forest Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "MARI KABEL" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "ELECTRONIC ELEPHANT HYBRID" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "FKA.M4A" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "FRITZ KALKBRENNER" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "MISS MONIQUE" },
            { time: "00:00", artist: "AGENTS OF TIME" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Hade Cage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "NORMAN WALTER" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "VIDO" },
            { time: "18:00", artist: "JOHANNES SCHUSTER B2B IN VERRUF" },
            { time: "19:00", artist: "" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "" },
            { time: "22:00", artist: "ODYMEL" },
            { time: "23:00", artist: "KUKO" },
            { time: "00:00", artist: "CLOUDY" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "4EJOU LIVE" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Onos Stage",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "THE MUFFIN MAN" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "DJ HYPERDRIVE B2B ÜBERKIKZ" },
            { time: "18:00", artist: "" },
            { time: "19:00", artist: "" },
            { time: "20:00", artist: "" },
            { time: "21:00", artist: "OMIKI" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "VEGAS" },
            { time: "00:00", artist: "PRADA2000" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "KRAMA" },
            { time: "03:00", artist: "" }
          ]
        },
        {
          name: "Medusa Jungle",
          acts: [
            { time: "14:00", artist: "" },
            { time: "15:00", artist: "" },
            { time: "16:00", artist: "" },
            { time: "17:00", artist: "" },
            { time: "18:00", artist: "NINO LOCKSEN" },
            { time: "19:00", artist: "" },
            { time: "20:00", artist: "RANJI" },
            { time: "21:00", artist: "" },
            { time: "22:00", artist: "" },
            { time: "23:00", artist: "" },
            { time: "00:00", artist: "DURS" },
            { time: "01:00", artist: "" },
            { time: "02:00", artist: "" },
            { time: "03:00", artist: "" }
          ]
        }
      ]
    }
  ]
};

// Ausgabe des JSON-Objekts
console.log(JSON.stringify(festivalData, null, 2));
