<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sovereign Career Roadmap v1.0 [Portrait]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        :root { --gold: #D4AF37; --matte-black: #1A1A1A; --industrial-gray: #2D2D2D; }
        body { font-family: 'Inter', sans-serif; background: #000; color: #fff; }
        .a4-page { width: 210mm; min-height: 297mm; padding: 20mm; margin: 10mm auto; background: var(--matte-black); border: 1px solid #333; position: relative; box-shadow: 0 0 50px rgba(0,0,0,0.5); overflow: hidden; }
        [contenteditable="true"]:focus { outline: 1px dashed var(--gold); background: rgba(212,175,55,0.05); }
        .gold-emboss { color: var(--gold); text-transform: uppercase; letter-spacing: 4px; text-shadow: 2px 2px 0px rgba(0,0,0,1), 3px 3px 0px rgba(212,175,55,0.3); font-weight: 900; }
        .industrial-border { border-left: 4px solid var(--gold); padding-left: 20px; background: linear-gradient(90deg, rgba(212,175,55,0.05) 0%, transparent 100%); }
        .page-break { page-break-after: always; }
        .alert-warning { position: fixed; top: 10px; right: 10px; background: #ef4444; color: white; padding: 10px; border-radius: 4px; display: none; z-index: 100; }
        @media print { body { background: none; } .a4-page { margin: 0; border: none; box-shadow: none; } .no-print { display: none; } }
    </style>
</head>
<body class="p-4">
    <div id="warning-box" class="alert-warning">?? CONTENT OVERFLOW: Text exceeds A4 limits. Switch to Summary mode.</div>

    <nav class="no-print bg-zinc-900 p-4 sticky top-0 z-50 flex gap-4 justify-center border-b border-zinc-800">
        <button onclick="saveDocument()" class="bg-green-600 px-6 py-2 rounded text-xs font-bold uppercase transition">SAVE LOCAL</button>
        <button onclick="exportToPDF()" class="bg-amber-600 hover:bg-amber-500 px-6 py-2 rounded text-xs font-bold uppercase transition">EXPORT PDF</button>
        <button onclick="toggleDepth()" class="border border-zinc-700 px-6 py-2 rounded text-xs font-bold uppercase hover:bg-zinc-800">TOGGLE FULL/SUMMARY</button>
    </nav>

    <div id="document-root">
        <div class="a4-page" id="page-1">
            <header class="flex justify-between items-start mb-12">
                <div>
                    <h1 class="gold-emboss text-5xl">Sovereign</h1>
                    <p class="text-zinc-500 font-bold tracking-widest uppercase">Career Architecture v1.0</p>
                </div>
                <div class="text-right text-[10px] text-zinc-600">
                    <p>REF: DREAMTEQ-2026-ALPHA</p>
                    <p>LOC: NAIROBI / LUSAKA</p>
                </div>
            </header>

            <section class="industrial-border mb-8">
                <h2 class="text-2xl font-bold mb-2">01. EXECUTIVE SUMMARY</h2>
                <div id="main-content" contenteditable="true" class="text-zinc-300 leading-relaxed text-sm">
                    Analysis complete. Detected 2 high-yield gaps. Primary target: Cloud Systems Architect in Nairobi, KE. This roadmap reflects a 512-point data injection from the Sovereign Hunter Agent. Our analysis shows a significant opportunity in the integration of industrial-grade IoT for agribusiness monitoring across the Rift Valley.
                </div>
            </div>

            <section class="grid grid-cols-2 gap-8 mt-12 mb-12">
                <div class="bg-zinc-800/50 p-6 border border-zinc-700">
                    <h3 class="text-amber-500 font-bold mb-4 uppercase text-xs">Market Scarcity Index</h3>
                    <div class="w-full bg-zinc-700 h-2 rounded-full overflow-hidden">
                        <div class="bg-amber-500 h-full w-[88%]"></div>
                    </div>
                    <p class="text-[10px] mt-2 text-zinc-500">88.4% Match with regional demand</p>
                </div>
                <div class="bg-zinc-800/50 p-6 border border-zinc-700">
                    <h3 class="text-amber-500 font-bold mb-4 uppercase text-xs">AI Proficiency</h3>
                    <div class="w-full bg-zinc-700 h-2 rounded-full overflow-hidden">
                        <div class="bg-amber-500 h-full w-[100%]"></div>
                    </div>
                    <p class="text-[10px] mt-2 text-zinc-500">Tier 1 Sovereign Integration</p>
                </div>
            </div>

            <div class="border-2 border-dashed border-zinc-800 h-64 flex flex-col items-center justify-center relative overflow-hidden bg-zinc-900/50 mb-12">
                <span class="text-zinc-600 text-xs uppercase mb-2 tracking-[0.5em]">VISUAL A: THE DATA FOUNDRY</span>
                <div class="opacity-10 text-4xl font-black italic text-zinc-500">NANO BANANA 2</div>
            </div>

            <footer class="absolute bottom-10 left-20 right-20 flex justify-between text-[10px] text-zinc-700 border-t border-zinc-800 pt-4">
                <span>PROPRIETARY DATA: DREAMTEQ SOVEREIGN</span>
                <span>PAGE 01 / Portrait</span>
            </footer>
        </div>
    </div>

    <script>
        let isFull = true;
        const originalText = document.getElementById('main-content').innerText;

        function toggleDepth() {
            const content = document.getElementById('main-content');
            isFull = !isFull;
            content.innerText = isFull ? originalText : "Brief: Nairobi/Lusaka career trajectory focused on high-yield industrial technical gaps.";
            checkHeight();
        }

        function checkHeight() {
            const doc = document.getElementById('page-1');
            const warning = document.getElementById('warning-box');
            if (doc.scrollHeight > doc.clientHeight) {
                warning.style.display = 'block';
            } else {
                warning.style.display = 'none';
            }
        }

        function exportToPDF() {
            const element = document.getElementById('document-root');
            html2pdf().set({
                margin: 0,
                filename: 'Sovereign_Roadmap_Portrait.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, backgroundColor: '#1A1A1A' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(element).save();
        }

        function saveDocument() {
            const html = document.documentElement.outerHTML;
            const blob = new Blob([html], {type: "text/html"});
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "Sovereign_Roadmap_Live.html";
            a.click();
        }

        document.getElementById('main-content').addEventListener('input', checkHeight);
    </script>
</body>
</html>
