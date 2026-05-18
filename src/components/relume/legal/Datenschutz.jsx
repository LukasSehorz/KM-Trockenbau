"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

export function Datenschutz() {
  const sectionRef = useRef(null);

  const browserLinks = [
    { label: "Chrome: Cookies in Chrome löschen, aktivieren und verwalten", href: "https://support.google.com/chrome/answer/95647?tid=311126108" },
    { label: "Safari: Verwalten von Cookies und Websitedaten mit Safari", href: "https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311126108" },
    { label: "Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben", href: "https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311126108" },
    { label: "Internet Explorer: Löschen und Verwalten von Cookies", href: "https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=311126108" },
    { label: "Microsoft Edge: Löschen und Verwalten von Cookies", href: "https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=311126108" },
  ];

  function renderItem(item, key) {
    if (typeof item === "string") {
      return <p key={key} className="font-body text-base leading-relaxed text-white/75">{item}</p>;
    }
    if (item && item.list) {
      return (
        <ul key={key} className="list-disc pl-6 space-y-2 font-body text-base leading-relaxed text-white/75 marker:text-[#7BBFB8]/60">
          {item.list.map((li, i) => <li key={i}>{li}</li>)}
        </ul>
      );
    }
    if (item && item.sub) {
      return <h3 key={key} className="font-heading text-base font-bold uppercase tracking-[0.18em] text-white/90 mt-4">{item.sub}</h3>;
    }
    if (item && item.strong) {
      return <p key={key} className="font-body text-base font-semibold text-white">{item.strong}</p>;
    }
    if (item && item.browserLinks) {
      return (
        <ul key={key} className="space-y-2 font-body text-base leading-relaxed">
          {browserLinks.map((l, i) => (
            <li key={i}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[#7BBFB8] hover:text-white underline transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      );
    }
    if (item && item.mixed) {
      return (
        <p key={key} className="font-body text-base leading-relaxed text-white/75">
          {item.mixed.map((part, i) =>
            typeof part === "string"
              ? part
              : <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">{part.label}</a>
          )}
        </p>
      );
    }
    return null;
  }

  const sections = [
    {
      id: "datenschutz",
      title: "Datenschutz",
      body: [
        { mixed: [
          "Wir haben diese Datenschutzerklärung (Fassung 06.11.2019-311126108) verfasst, um Ihnen gemäß der Vorgaben der ",
          { href: "https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679&tid=311126108", label: "Datenschutz-Grundverordnung (EU) 2016/679" },
          " zu erklären, welche Informationen wir sammeln, wie wir Daten verwenden und welche Entscheidungsmöglichkeiten Sie als Besucher dieser Webseite haben.",
        ]},
        "Leider liegt es in der Natur der Sache, dass diese Erklärungen sehr technisch klingen, wir haben uns bei der Erstellung jedoch bemüht die wichtigsten Dinge so einfach und klar wie möglich zu beschreiben.",
      ],
    },
    {
      id: "automatische-datenspeicherung",
      title: "Automatische Datenspeicherung",
      body: [
        "Wenn Sie heutzutage Webseiten besuchen, werden gewisse Informationen automatisch erstellt und gespeichert, so auch auf dieser Webseite.",
        "Wenn Sie unsere Webseite so wie jetzt gerade besuchen, speichert unser Webserver (Computer auf dem diese Webseite gespeichert ist) automatisch Daten wie",
        { list: [
          "die Adresse (URL) der aufgerufenen Webseite",
          "Browser und Browserversion",
          "das verwendete Betriebssystem",
          "die Adresse (URL) der zuvor besuchten Seite (Referrer URL)",
          "den Hostname und die IP-Adresse des Geräts von welchem aus zugegriffen wird",
          "Datum und Uhrzeit",
        ]},
        "in Dateien (Webserver-Logfiles).",
        "In der Regel werden Webserver-Logfiles zwei Wochen gespeichert und danach automatisch gelöscht. Wir geben diese Daten nicht weiter, können jedoch nicht ausschließen, dass diese Daten beim Vorliegen von rechtswidrigem Verhalten eingesehen werden.",
        { mixed: [
          "Die Rechtsgrundlage besteht nach ",
          { href: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679&from=DE&tid=311126108", label: "Artikel 6 Absatz 1 f DSGVO" },
          " (Rechtmäßigkeit der Verarbeitung) darin, dass berechtigtes Interesse daran besteht, den fehlerfreien Betrieb dieser Webseite durch das Erfassen von Webserver-Logfiles zu ermöglichen.",
        ]},
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      body: [
        "Unsere Website verwendet HTTP-Cookies um nutzerspezifische Daten zu speichern.",
        "Im Folgenden erklären wir, was Cookies sind und warum Sie genutzt werden, damit Sie die folgende Datenschutzerklärung besser verstehen.",
        { sub: "Was genau sind Cookies?" },
        "Immer wenn Sie durch das Internet surfen, verwenden Sie einen Browser. Bekannte Browser sind beispielsweise Chrome, Safari, Firefox, Internet Explorer und Microsoft Edge. Die meisten Webseiten speichern kleine Text-Dateien in Ihrem Browser. Diese Dateien nennt man Cookies.",
        'Eines ist nicht von der Hand zu weisen: Cookies sind echt nützliche Helferlein. Fast alle Webseiten verwenden Cookies. Genauer gesprochen sind es HTTP-Cookies, da es auch noch anderer Cookies für andere Anwendungsbereiche gibt. HTTP-Cookies sind kleine Dateien, die von unserer Website auf Ihrem Computer gespeichert werden. Diese Cookie-Dateien werden automatisch im Cookie-Ordner, quasi dem „Hirn“ Ihres Browsers, untergebracht. Ein Cookie besteht aus einem Namen und einem Wert. Bei der Definition eines Cookies müssen zusätzlich ein oder mehrere Attribute angegeben werden.',
        'Cookies speichern gewisse Nutzerdaten von Ihnen, wie beispielsweise Sprache oder persönliche Seiteneinstellungen. Wenn Sie unsere Seite wieder aufrufen, übermittelt Ihr Browser die „userbezogenen“ Informationen an unsere Seite zurück. Dank der Cookies weiß unsere Website, wer Sie sind und bietet Ihnen Ihre gewohnte Standardeinstellung. In einigen Browsern hat jedes Cookie eine eigene Datei, in anderen wie beispielsweise Firefox sind alle Cookies in einer einzigen Datei gespeichert.',
        'Es gibt sowohl Erstanbieter Cookies als auch Drittanbieter-Cookies. Erstanbieter-Cookies werden direkt von unserer Seite erstellt, Drittanbieter-Cookies werden von Partner-Webseiten (z.B. Google Analytics) erstellt. Jedes Cookie ist individuell zu bewerten, da jedes Cookie andere Daten speichert. Auch die Ablaufzeit eines Cookies variiert von ein paar Minuten bis hin zu ein paar Jahren. Cookies sind keine Software-Programme und enthalten keine Viren, Trojaner oder andere „Schädlinge“. Cookies können auch nicht auf Informationen Ihres PCs zugreifen.',
        "So können zum Beispiel Cookie-Daten aussehen:",
        { list: [
          "Name: _ga",
          "Ablaufzeit: 2 Jahre",
          "Verwendung: Unterscheidung der Webseitenbesucher",
          "Beispielhafter Wert: GA1.2.1326744211.152311126108",
        ]},
        "Ein Browser sollte folgende Mindestgrößen unterstützen:",
        { list: [
          "Ein Cookie soll mindestens 4096 Bytes enthalten können",
          "Pro Domain sollen mindestens 50 Cookies gespeichert werden können",
          "Insgesamt sollen mindestens 3000 Cookies gespeichert werden können",
        ]},
        { sub: "Welche Arten von Cookies gibt es?" },
        "Die Frage welche Cookies wir im Speziellen verwenden, hängt von den verwendeten Diensten ab und wird in der folgenden Abschnitten der Datenschutzerklärung geklärt. An dieser Stelle möchten wir kurz auf die verschiedenen Arten von HTTP-Cookies eingehen.",
        "Man kann 4 Arten von Cookies unterscheiden:",
        { strong: "Unbedingt notwendige Cookies" },
        "Diese Cookies sind nötig, um grundlegende Funktionen der Website sicherzustellen. Zum Beispiel braucht es diese Cookies, wenn ein User ein Produkt in den Warenkorb legt, dann auf anderen Seiten weitersurft und später erst zur Kasse geht. Durch diese Cookies wird der Warenkorb nicht gelöscht, selbst wenn der User sein Browserfenster schließt.",
        { strong: "Funktionelle Cookies" },
        "Diese Cookies sammeln Infos über das Userverhalten und ob der User etwaige Fehlermeldungen bekommt. Zudem werden mithilfe dieser Cookies auch die Ladezeit und das Verhalten der Website bei verschiedenen Browsern gemessen.",
        { strong: "Zielorientierte Cookies" },
        "Diese Cookies sorgen für eine bessere Nutzerfreundlichkeit. Beispielsweise werden eingegebene Standorte, Schriftgrößen oder Formulardaten gespeichert.",
        { strong: "Werbe-Cookies" },
        "Diese Cookies werden auch Targeting-Cookies genannt. Sie dienen dazu dem User individuell angepasste Werbung zu liefern. Das kann sehr praktisch, aber auch sehr nervig sein.",
        "Üblicherweise werden Sie beim erstmaligen Besuch einer Webseite gefragt, welche dieser Cookiearten Sie zulassen möchten. Und natürlich wird diese Entscheidung auch in einem Cookie gespeichert.",
        { sub: "Wie kann ich Cookies löschen?" },
        "Wie und ob Sie Cookies verwenden wollen, entscheiden Sie selbst. Unabhängig von welchem Service oder welcher Website die Cookies stammen, haben Sie immer die Möglichkeit Cookies zu löschen, nur teilweise zuzulassen oder zu deaktivieren. Zum Beispiel können Sie Cookies von Drittanbietern blockieren, aber alle anderen Cookies zulassen.",
        "Wenn Sie feststellen möchten, welche Cookies in Ihrem Browser gespeichert wurden, wenn Sie Cookie-Einstellungen ändern oder löschen wollen, können Sie dies in Ihren Browser-Einstellungen finden:",
        { browserLinks: true },
        "Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren Browser so einrichten, dass er Sie immer informiert, wenn ein Cookie gesetzt werden soll. So können Sie bei jedem einzelnen Cookie entscheiden, ob Sie das Cookie erlauben oder nicht.",
        'Die Vorgangsweise ist je nach Browser verschieden. Am besten ist es Sie suchen die Anleitung in Google mit dem Suchbegriff „Cookies löschen Chrome“ oder „Cookies deaktivieren Chrome“ im Falle eines Chrome Browsers oder tauschen das Wort „Chrome“ gegen den Namen Ihres Browsers, z.B. Edge, Firefox, Safari aus.',
        { sub: "Wie sieht es mit meinem Datenschutz aus?" },
        'Seit 2009 gibt es die sogenannten „Cookie-Richtlinien“. Darin ist festgehalten, dass das Speichern von Cookies eine Einwilligung des Website-Besuchers (also von Ihnen) verlangt. Innerhalb der EU-Länder gibt es allerdings noch sehr unterschiedliche Reaktionen auf diese Richtlinien. In Deutschland wurden die Cookie-Richtlinien nicht als nationales Recht umgesetzt. Stattdessen erfolgte die Umsetzung dieser Richtlinie weitgehend in § 15 Abs.3 des Telemediengesetzes (TMG).',
        { mixed: [
          "Wenn Sie mehr über Cookies wissen möchten und vor technischen Dokumentationen nicht zurückscheuen, empfehlen wir ",
          { href: "https://tools.ietf.org/html/rfc6265", label: "https://tools.ietf.org/html/rfc6265" },
          ', dem Request for Comments der Internet Engineering Task Force (IETF) namens „HTTP State Management Mechanism“.',
        ]},
      ],
    },
    {
      id: "speicherung",
      title: "Speicherung persönlicher Daten",
      body: [
        "Persönliche Daten, die Sie uns auf dieser Website elektronisch übermitteln, wie zum Beispiel Name, E-Mail-Adresse, Adresse oder andere persönlichen Angaben im Rahmen der Übermittlung eines Formulars oder Kommentaren im Blog, werden von uns gemeinsam mit dem Zeitpunkt und der IP-Adresse nur zum jeweils angegebenen Zweck verwendet, sicher verwahrt und nicht an Dritte weitergegeben.",
        "Wir nutzen Ihre persönlichen Daten somit nur für die Kommunikation mit jenen Besuchern, die Kontakt ausdrücklich wünschen und für die Abwicklung der auf dieser Webseite angebotenen Dienstleistungen und Produkte. Wir geben Ihre persönlichen Daten ohne Zustimmung nicht weiter, können jedoch nicht ausschließen, dass diese Daten beim Vorliegen von rechtswidrigem Verhalten eingesehen werden.",
        "Wenn Sie uns persönliche Daten per E-Mail schicken – somit abseits dieser Webseite – können wir keine sichere Übertragung und den Schutz Ihrer Daten garantieren. Wir empfehlen Ihnen, vertrauliche Daten niemals unverschlüsselt per E-Mail zu übermitteln.",
        { mixed: [
          "Die Rechtsgrundlage besteht nach ",
          { href: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679&from=DE&tid=311126108", label: "Artikel 6 Absatz 1 a DSGVO" },
          " (Rechtmäßigkeit der Verarbeitung) darin, dass Sie uns die Einwilligung zur Verarbeitung der von Ihnen eingegebenen Daten geben. Sie können diesen Einwilligung jederzeit widerrufen – eine formlose E-Mail reicht aus, Sie finden unsere Kontaktdaten im Impressum.",
        ]},
      ],
    },
    {
      id: "rechte",
      title: "Rechte laut Datenschutzgrundverordnung",
      body: [
        "Ihnen stehen laut den Bestimmungen der DSGVO grundsätzlich die folgende Rechte zu:",
        { list: [
          "Recht auf Berichtigung (Artikel 16 DSGVO)",
          'Recht auf Löschung („Recht auf Vergessenwerden“) (Artikel 17 DSGVO)',
          "Recht auf Einschränkung der Verarbeitung (Artikel 18 DSGVO)",
          "Recht auf Benachrichtigung – Mitteilungspflicht im Zusammenhang mit der Berichtigung oder Löschung personenbezogener Daten oder der Einschränkung der Verarbeitung (Artikel 19 DSGVO)",
          "Recht auf Datenübertragbarkeit (Artikel 20 DSGVO)",
          "Widerspruchsrecht (Artikel 21 DSGVO)",
          "Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung — einschließlich Profiling — beruhenden Entscheidung unterworfen zu werden (Artikel 22 DSGVO)",
        ]},
        { mixed: [
          "Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich an die ",
          { href: "https://www.bfdi.bund.de/DE/Datenschutz/Ueberblick/MeineRechte/Artikel/BeschwerdeBeiDatenschutzbehoereden.html?tid=311126108", label: "Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI)" },
          " wenden.",
        ]},
      ],
    },
    {
      id: "auswertung",
      title: "Auswertung des Besucherverhaltens",
      body: [
        "In der folgenden Datenschutzerklärung informieren wir Sie darüber, ob und wie wir Daten Ihres Besuchs dieser Website auswerten. Die Auswertung der gesammelten Daten erfolgt in der Regel anonym und wir können von Ihrem Verhalten auf dieser Website nicht auf Ihre Person schließen.",
        "Mehr über Möglichkeiten dieser Auswertung der Besuchsdaten zu widersprechen erfahren Sie in der folgenden Datenschutzerklärung.",
      ],
    },
    {
      id: "tls",
      title: "TLS-Verschlüsselung mit https",
      body: [
        { mixed: [
          "Wir verwenden https um Daten abhörsicher im Internet zu übertragen (Datenschutz durch Technikgestaltung ",
          { href: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679&from=DE&tid=311126108", label: "Artikel 25 Absatz 1 DSGVO" },
          "). Durch den Einsatz von TLS (Transport Layer Security), einem Verschlüsselungsprotokoll zur sicheren Datenübertragung im Internet können wir den Schutz vertraulicher Daten sicherstellen. Sie erkennen die Benutzung dieser Absicherung der Datenübertragung am kleinen Schlosssymbol links oben im Browser und der Verwendung des Schemas https (anstatt http) als Teil unserer Internetadresse.",
        ]},
      ],
    },
    {
      id: "google-fonts-lokal",
      title: "Google Fonts Lokal Datenschutzerklärung",
      body: [
        "Wir verwenden Google Fonts der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA) auf unserer Webseite. Wir haben die Google-Schriftarten lokal, d.h. auf unserem Webserver – nicht auf den Servern von Google – eingebunden. Dadurch gibt es keine Verbindung zu Server von Google und somit auch keine Datenübertragung bzw. Speicherung.",
        { sub: "Was sind Google Fonts?" },
        { mixed: [
          "Google Fonts (früher Google Web Fonts) ist ein interaktives Verzeichnis mit mehr als 800 Schriftarten, die die ",
          { href: "https://de.wikipedia.org/wiki/Google_LLC?tid=311126108", label: "Google LLC" },
          " zur freien Verwendung bereitstellt. Mit Google Fonts könnte man die Schriften nutzen, ohne sie auf den eigenen Server hochzuladen. Doch um diesbezüglich jede Informationsübertragung zum Google-Server zu unterbinden, haben wir die Schriftarten auf unseren Server heruntergeladen. Auf diese Weise handeln wir datenschutzkonform und senden keine Daten an Google Fonts weiter.",
        ]},
        { mixed: [
          "Anders als andere Web-Schriften erlaubt uns Google uneingeschränkten Zugriff auf alle Schriftarten. Wir können also unlimitiert auf ein Meer an Schriftarten zugreifen und so das Optimum für unsere Webseite rausholen. Mehr zu Google Fonts und weiteren Fragen finden Sie auf ",
          { href: "https://developers.google.com/fonts/faq?tid=311126108", label: "https://developers.google.com/fonts/faq?tid=311126108" },
          ".",
        ]},
      ],
    },
    {
      id: "google-fonts",
      title: "Google Fonts Datenschutzerklärung",
      body: [
        "Wir verwenden Google Fonts der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA) auf unserer Webseite.",
        "Für die Verwendung von Google-Schriftarten müssen Sie sich nicht anmelden bzw. ein Passwort hinterlegen. Weiters werden auch keine Cookies in Ihrem Browser gespeichert. Die Dateien (CSS, Schriftarten/Fonts) werden über die Google-Domains fonts.googleapis.com und fonts.gstatic.com angefordert. Laut Google sind die Anfragen nach CSS und Schriften vollkommen getrennt von allen anderen Google-Diensten. Wenn Sie ein Google-Konto haben, brauchen Sie keine Sorge haben, dass Ihre Google-Kontodaten, während der Verwendung von Google Fonts, an Google übermittelt werden. Google erfasst die Nutzung von CSS (Cascading Style Sheets) und der verwendeten Schriftarten und speichert diese Daten sicher. Wie die Datenspeicherung genau aussieht, werden wir uns noch im Detail ansehen.",
        { sub: "Was sind Google Fonts?" },
        { mixed: [
          "Google Fonts (früher Google Web Fonts) ist ein interaktives Verzeichnis mit mehr als 800 Schriftarten, die die ",
          { href: "https://de.wikipedia.org/wiki/Google_LLC?tid=311126108", label: "Google LLC" },
          " zur freien Verwendung bereitstellt.",
        ]},
        "Viele dieser Schriftarten sind unter der SIL Open Font License veröffentlicht, während andere unter der Apache-Lizenz veröffentlicht wurden. Beides sind freie Software-Lizenzen. Somit können wir sie frei verwenden, ohne dafür Lizenzgebühren zu zahlen.",
        { sub: "Warum verwenden wir Google Fonts auf unserer Webseite?" },
        "Mit Google Fonts können wir auf der eigenen Webseite Schriften nutzen, und müssen sie nicht auf unserem eigenen Server hochladen. Google Fonts ist ein wichtiger Baustein, um die Qualität unserer Webseite hoch zu halten. Alle Google-Schriften sind automatisch für das Web optimiert und dies spart Datenvolumen und ist speziell für die Verwendung bei mobilen Endgeräten ein großer Vorteil. Wenn Sie unsere Seite besuchen, sorgt die niedrige Dateigröße für eine schnelle Ladezeit.",
        "Des Weiteren sind Google Fonts sogenannte sichere Web Fonts. Unterschiedliche Bildsynthese-Systeme (Rendering) in verschiedenen Browsern, Betriebssystemen und mobilen Endgeräten können zu Fehlern führen. Solche Fehler können teilweise Texte bzw. ganze Webseiten optisch verzerren. Dank des schnellen Content Delivery Network (CDN) gibt es mit Google Fonts keine plattformübergreifenden Probleme.",
        "Google Fonts unterstützt alle gängigen Browser ( Google Chrome, Mozilla Firefox, Apple Safari, Opera) und funktioniert zuverlässig auf den meisten modernen mobilen Betriebssystemen, einschließlich Android 2.2+ und iOS 4.2+ (iPhone, iPad, iPod).",
        'Wir verwenden die Google Fonts also, damit wir unser gesamtes Online-Service so schön und einheitlich wie möglich darstellen können. Nach dem Art. 6 Abs. 1 f lit. F DSGVO stellt das bereits ein „berechtigtes Interesse“ an der Verarbeitung von personenbezogenen Daten dar. Unter „berechtigtem Interesse“ versteht man in diesem Fall sowohl rechtliche als auch wirtschaftliche oder ideelle Interessen, die vom Rechtssystem anerkannt werden.',
        { sub: "Welche Daten werden von Google gespeichert?" },
        'Wenn Sie unsere Webseite besuchen, werden die Schriften über einen Google-Server nachgeladen. Durch diesen externen Aufruf werden Daten an die Google-Server übermittelt. So erkennt Google auch, dass Sie bzw. Ihre IP-Adresse unsere Webseite besucht. Die Google Fonts API wurde entwickelt, um die Erfassung, Speicherung und Verwendung von Endnutzerdaten auf das zu reduzieren, was für eine effiziente Bereitstellung von Schriften nötig ist. API steht übrigens für „Application Programming Interface“ und dient unter anderem als Datenübermittler im Softwarebereich.',
        "Google Fonts speichert CSS- und Font-Anfragen sicher bei Google und ist somit geschützt. Durch die gesammelten Nutzungszahlen kann Google die Beliebtheit der Schriften feststellen. Die Ergebnisse veröffentlicht Google auf internen Analyseseiten, wie beispielsweise Google Analytics. Zudem verwendet Google auch Daten des eigenen Web-Crawlers, um festzustellen, welche Webseiten Google-Schriften verwenden. Diese Daten werden in der BigQuery-Datenbank von Google Fonts veröffentlicht. BigQuery ist ein Webservice von Google für Unternehmen, die große Datenmengen bewegen und analysieren wollen.",
        "Zu bedenken gilt allerdings noch, dass durch jede Google Font Anfrage auch Informationen wie IP-Adresse, Spracheinstellungen, Bildschirmauflösung des Browsers, Version des Browsers und Name des Browsers automatisch an die Google-Server übertragen werden. Ob diese Daten auch gespeichert werden, ist nicht klar feststellbar bzw. wird von Google nicht eindeutig kommuniziert.",
        { sub: "Wie lange und wo werden die Daten gespeichert?" },
        "Anfragen für CSS-Assets speichert Google einen Tag lang auf Ihren Servern, die hauptsächlich außerhalb der EU angesiedelt sind. Das ermöglicht uns, mithilfe eines Google-Stylesheets die Schriftarten zu nutzen. Ein Stylesheet ist eine Formatvorlage, über die man einfach und schnell z.B. das Design bzw. die Schriftart einer Webseite ändern kann.",
        "Die Font-Dateien werden bei Google ein Jahr gespeichert. Google verfolgt damit das Ziel, die Ladezeit von Webseiten grundsätzlich zu verbessern. Wenn Millionen von Webseiten auf die gleichen Schriften verweisen, werden sie nach dem ersten Besuch zwischengespeichert und erscheinen sofort auf allen anderen später besuchten Webseiten wieder. Manchmal aktualisiert Google Schriftdateien, um die Dateigröße zu reduzieren, die Abdeckung von Sprache zu erhöhen und das Design zu verbessern.",
        { sub: "Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?" },
        "Jene Daten, die Google für einen Tag bzw. ein Jahr speichert können nicht einfach gelöscht werden. Die Daten werden beim Seitenaufruf automatisch an Google übermittelt. Um diese Daten vorzeitig löschen zu können, müssen Sie den Google-Support auf",
        { mixed: [
          { href: "https://support.google.com/?hl=de&tid=311126108", label: "https://support.google.com/?hl=de&tid=311126108" },
        ]},
        "kontaktieren. Datenspeicherung verhindern Sie in diesem Fall nur, wenn Sie unsere Seite nicht besuchen.",
        { mixed: [
          "Anders als andere Web-Schriften erlaubt uns Google uneingeschränkten Zugriff auf alle Schriftarten. Wir können also unlimitiert auf ein Meer an Schriftarten zugreifen und so das Optimum für unsere Webseite rausholen. Mehr zu Google Fonts und weiteren Fragen finden Sie auf ",
          { href: "https://developers.google.com/fonts/faq?tid=311126108", label: "https://developers.google.com/fonts/faq?tid=311126108" },
          ".",
        ]},
        "Dort geht zwar Google auf datenschutzrelevante Angelegenheiten ein, doch wirklich detaillierte Informationen über Datenspeicherung sind nicht enthalten.",
        { mixed: [
          "Es ist relativ schwierig (beinahe unmöglich), von Google wirklich präzise Informationen über gespeicherten Daten zu bekommen. Welche Daten grundsätzlich von Google erfasst werden und wofür diese Daten verwendet werden, können Sie auch auf ",
          { href: "https://policies.google.com/privacy?hl=de&tid=311126108", label: "https://www.google.com/intl/de/policies/privacy/" },
          " nachlesen.",
        ]},
      ],
    },
    {
      id: "google-maps",
      title: "Google Maps Datenschutzerklärung",
      body: [
        "Wir benützen auf unserer Website Google Maps der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA). Mit Google Maps können wir Standorte visuell besser darstellen und damit unser Service verbessern. Durch die Verwendung von Google Maps werden Daten an Google übertragen und auf den Google-Servern gespeichert. Hier wollen wir nun genauer darauf eingehen, was Google Maps ist, warum wir diesen Google-Dienst in Anspruch nehmen, welche Daten gespeichert werden und wie Sie dies unterbinden können.",
        { sub: "Was ist Google Maps?" },
        "Google Maps ist ein Online-Kartendienst der Firma Google Inc. Mit Google Maps können Sie im Internet über einen PC oder über eine App genaue Standorte von Städten, Sehenswürdigkeiten, Unterkünften oder Unternehmen suchen. Wenn Unternehmen auf Google My Business vertreten sind, werden neben dem Standort noch weitere Informationen über die Firma angezeigt.",
        "Um die Anfahrtsmöglichkeit anzuzeigen, können Kartenausschnitte eines Standorts per HTML-Code in eine Website eingebunden werden. Google Maps zeigt die Erdoberfläche als Straßenkarte oder als Luft- bzw. Satellitenbild an. Dank der Street View Bilder und den qualitativ hochwertigen Satellitenbildern sind sehr genaue Darstellungen möglich.",
        { sub: "Warum verwenden wir Google Maps auf unserer Website?" },
        "All unsere Bemühungen auf dieser Seite verfolgen das Ziel, Ihnen eine nützliche und sinnvolle Zeit auf unserer Website zu bieten. Durch die Einbindung von Google Maps können wir Ihnen die wichtigsten Informationen zu diversen Standorten liefern. Dank Google Maps sehen Sie auf einen Blick wo wir unseren Firmensitz haben.",
        "Die Wegbeschreibung zeigt Ihnen immer den besten bzw. schnellsten Weg zu uns. Sie können den Anfahrtsweg für Routen mit dem Auto, mit öffentlichen Verkehrsmitteln, zu Fuß oder mit dem Fahrrad abrufen. Für uns ist die Bereitstellung von Google Maps Teil unseres Kundenservice.",
        { sub: "Welche Daten werden von Google Maps gespeichert?" },
        "Damit Google Maps ihren Dienst vollständig anbieten kann, muss das Unternehmen Daten von Ihnen aufnehmen und speichern. Dazu zählen unter anderem die eingegebenen Suchbegriffe, Ihre IP-Adresse und die Breiten- bzw. Längenkoordinaten. Benutzen Sie die Routenplaner-Funktion wird auch die eingegebene Startadresse gespeichert.",
        "Diese Datenspeicherung passiert allerdings auf den Webseiten von Google Maps. Wir können Sie darüber nur informieren, aber keinen Einfluss nehmen. Da wir Google Maps in unsere Website eingebunden haben, setzt Google mindestens ein Cookie (Name: NID) in Ihrem Browser. Dieses Cookie speichert Daten über Ihr Userverhalten. Google nutzt diese Daten in erster Linie, um eigene Dienste zu optimieren und individuelle, personalisierte Werbung für Sie bereitzustellen.",
        "Folgendes Cookie wird aufgrund der Einbindung von Google Maps in Ihrem Browser gesetzt:",
        { list: [
          "Name: NID",
          "Ablaufzeit: nach 6 Monaten",
          'Verwendung: NID wird von Google verwendet, um Werbeanzeigen an Ihre Google-Suche anzupassen. Mit Hilfe des Cookies „erinnert“ sich Google an Ihre am häufigsten eingegebenen Suchanfragen oder Ihre frühere Interaktion mit Anzeigen. So bekommen Sie immer maßgeschneiderte Werbeanzeigen. Das Cookie enthält eine einzigartige ID, die Google benutzt, persönliche Einstellungen des Users für Werbezwecke zu sammeln.',
          "Beispielwert: 188=h26c1Ktha7fCQTx8rXgLyATyITJ311126108",
        ]},
        "Anmerkung: Wir können bei den Angaben der gespeicherten Daten keine Vollständigkeit gewährleisten. Speziell bei der Verwendung von Cookies sind Veränderungen bei Google nie auszuschließen. Um das Cookie NID zu identifizieren, wurde eine eigene Testseite angelegt, wo ausschließlich Google Maps eingebunden war.",
        { sub: "Wie lange und wo werden die Daten gespeichert?" },
        "Die Google-Server stehen in Rechenzentren auf der ganzen Welt. Die meisten Server befinden sich allerdings in Amerika. Aus diesem Grund werden Ihre Daten auch vermehrt in den USA gespeichert.",
        "Hier können Sie genau nachlesen wo sich die Google-Rechenzentren befinden:",
        { mixed: [
          { href: "https://www.google.com/about/datacenters/inside/locations/?hl=de", label: "https://www.google.com/about/datacenters/inside/locations/?hl=de" },
        ]},
        "Die Daten verteilt Google auf verschiedenen Datenträgern. Dadurch sind die Daten schneller abrufbar und werden vor etwaigen Manipulationsversuchen besser geschützt. Jedes Rechenzentrum hat auch spezielle Notfallprogramme. Wenn es zum Beispiel Probleme bei der Google-Hardware gibt oder eine Naturkatastrophe die Server beeinträchtigt, bleiben die Daten mit hoher Wahrscheinlich dennoch geschützt.",
        "Manche Daten speichert Google für einen festgelegten Zeitraum. Bei anderen Daten bietet Google lediglich die Möglichkeit, diese manuell zu löschen. Weiters anonymisiert das Unternehmen auch Informationen (wie zum Beispiel Werbedaten) in Serverprotokollen, indem sie einen Teil der IP-Adresse und Cookie-Informationen nach 9 bzw.18 Monaten löschen.",
        { sub: "Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?" },
        "Mit der 2019 eingeführten automatischen Löschfunktion von Standort- und Aktivitätsdaten werden Informationen zur Standortbestimmung und Web-/App-Aktivität – abhängig von Ihrer Entscheidung – entweder 3 oder 18 Monate gespeichert und dann gelöscht.",
        'Zudem kann man diese Daten über das Google-Konto auch jederzeit manuell aus dem Verlauf löschen. Wenn Sie Ihre Standorterfassung vollständig verhindern wollen, müssen Sie im Google-Konto die Rubrik „Web- und App-Aktivität“ pausieren. Klicken Sie „Daten und Personalisierung“ und dann auf die Option „Aktivitätseinstellung“. Hier können Sie die Aktivitäten ein- bzw. ausschalten.',
        "In Ihrem Browser können Sie weiters auch einzelne Cookies deaktivieren, löschen oder verwalten. Je nach dem welchen Browser Sie verwenden, funktioniert dies auf unterschiedliche Art und Weise. Die folgenden Anleitungen zeigen, wie Sie Cookies in Ihrem Browser verwalten:",
        { browserLinks: true },
        "Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren Browser so einrichten, dass er Sie immer informiert, wenn ein Cookie gesetzt werden soll. So können Sie bei jedem einzelnen Cookie entscheiden, ob Sie es erlauben oder nicht.",
        { mixed: [
          "Google ist aktiver Teilnehmer beim EU-U.S. Privacy Shield Framework, wodurch der korrekte und sichere Datentransfer persönlicher Daten geregelt wird. Mehr Informationen dazu finden Sie auf ",
          { href: "https://www.privacyshield.gov/participant?id=a2zt0000000TO6hAAG", label: "https://www.privacyshield.gov/participant?id=a2zt0000000TO6hAAG" },
          ".",
        ]},
        { mixed: [
          "Wenn Sie mehr über die Datenverarbeitung von Google erfahren wollen, empfehlen wir Ihnen die hauseigene Datenschutzerklärung des Unternehmens unter ",
          { href: "https://policies.google.com/privacy?hl=de", label: "https://policies.google.com/privacy?hl=de" },
          ".",
        ]},
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".legal-eyebrow", {
        y: 22, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".legal-heading", {
        y: 36, opacity: 0, duration: 0.9, ease: "expo.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[5%] pt-32 pb-20 md:pt-40 md:pb-28 [&_a]:text-[#7BBFB8] [&_a]:underline [&_a:hover]:text-white [&_a]:transition-colors"
      style={{ backgroundColor: "#0D2020" }}
    >
      <div className="container max-w-3xl">

        {/* Heading */}
        <div className="mb-14 md:mb-20">
          <div className="legal-eyebrow flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ background: "#7BBFB8" }} />
            <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#7BBFB8]">
              Rechtliches
            </p>
          </div>
          <h1
            className="legal-heading font-heading font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Datenschutzerklärung
          </h1>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-14">
          {sections.map((sec) => (
            <div key={sec.id} id={sec.id}>
              <h2 className="mb-5 font-heading text-2xl font-bold tracking-tight text-[#7BBFB8]">
                {sec.title}
              </h2>
              <div className="flex flex-col gap-4">
                {sec.body.map((item, i) => renderItem(item, i))}
              </div>
            </div>
          ))}

          {/* Source */}
          <div className="pt-8 border-t border-white/10">
            <p className="font-body text-sm text-white/40 leading-relaxed">
              Quelle: Erstellt mit dem{" "}
              <a href="https://www.adsimple.de/datenschutz-generator/" target="_blank" rel="noopener noreferrer">
                Datenschutz Generator
              </a>{" "}
              von AdSimple in Kooperation mit{" "}
              <a href="https://www.hashtagmann.de/" target="_blank" rel="noopener noreferrer">
                hashtagmann.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
