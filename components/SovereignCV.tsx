<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sovereign CV - Industrial Grade</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        :root { --gold: #D4AF37; --matte-black: #1A1A1A; }
        body { font-family: 'Inter', sans-serif; background: #000; color: #fff; margin: 0; }
        .a4-page { width: 210mm; min-height: 297mm; padding: 20mm; margin: 10mm auto; background: var(--matte-black); border: 1px solid #333; position: relative; }
        .sidebar { border-right: 1px solid #333; padding-right: 20px; }
        .gold-accent { color: var(--gold); font-weight: 900; text-transform: uppercase; letter-spacing: 2px; }
        [contenteditable="true"]:focus { outline: 1px dashed var(--gold); background: rgba(212,175,55,0.05); }
        .skill-tag { border: 1px solid #444; padding: 2px 8px; font-size: 10px; text-transform: uppercase; color: var(--gold); }
        @media print { .no-print { display: none; } .a4-page { margin: 0; border: none; } }
    </style>
</head>
<body class="p-4">
    <nav class="no-print mb-8 flex justify-center gap-4">
        <button onclick="exportToPDF()" class="bg-amber-600 px-6 py-2 rounded text-xs font-bold uppercase">Export CV PDF</button>
        <button onclick="saveDocument()" class="bg-zinc-800 px-6 py-2 rounded text-xs font-bold uppercase border border-zinc-700">Permanent Save</button>
    </nav>

    <div id="cv-root" class="a4-page grid grid-cols-3 gap-8">
        <!-- Sidebar -->
        <div class="sidebar col-span-1">
            <header class="mb-12">
                <h1 class="text-3xl font-black uppercase leading-none mb-2" contenteditable="true">AMANDA<br><span class="text-amber-500">ENGINEER</span></h1>
                <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest" contenteditable="true">Sovereign Systems Architect</p>
            </header>

            <section class="mb-8">
                <h2 class="gold-accent text-xs mb-4">Contact</h2>
                <div class="text-[10px] text-zinc-400 space-y-2" contenteditable="true">
                    <p>Nairobi, Kenya</p>
                    <p>amanda.dev@dreamteq.io</p>
                    <p>+254 700 000 000</p>
                </div>
            </section>

            <section class="mb-8">
                <h2 class="gold-accent text-xs mb-4">Core Stack</h2>
                <div class="flex flex-wrap gap-2" contenteditable="true">
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">Terraform</span>
                    <span class="skill-tag">AWS</span>
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">AI/LLM</span>
                </div>
            </section>
        </div>

        <!-- Main Body -->
        <div class="col-span-2">
            <section class="mb-12">
                <h2 class="gold-accent text-sm mb-6 pb-2 border-b border-zinc-800">Professional Dossier</h2>
                <div class="text-xs text-zinc-300 leading-relaxed" contenteditable="true">
                    Expert in deploying high-resiliency cloud infrastructure and automated market intelligence agents. Specialized in the transition from legacy systems to Sovereign AI architectures.
                </div>
            </section>

            <section class="mb-12">
                <h2 class="gold-accent text-sm mb-6 pb-2 border-b border-zinc-800">Technical Milestones</h2>
                <div class="space-y-8" contenteditable="true">
                    <div>
                        <h3 class="text-white font-bold text-xs uppercase">DreamTeQ Sovereign Project</h3>
                        <p class="text-[10px] text-amber-500 mb-2">Lead Systems Architect | 2026</p>
                        <ul class="text-[11px] text-zinc-400 list-disc ml-4 space-y-1">
                            <li>Architected a 512-point automated job-hunting agent using Python and PowerShell.</li>
                            <li>Deployed an Ultra-Luxury A4 document engine with real-time Vercel sync.</li>
                            <li>Hardened local-to-cloud file monitoring systems for zero-latency updates.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <footer class="absolute bottom-10 right-20 text-[8px] text-zinc-800 uppercase tracking-[0.4em]">
                Sovereign Stack v1.0 / Portrait
            </footer>
        </div>
    </div>

    <script>
        function exportToPDF() {
            const element = document.getElementById('cv-root');
            html2pdf().set({
                margin: 0,
                filename: 'Sovereign_CV_Amanda.pdf',
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
            a.download = "Sovereign_CV_Template.html";
            a.click();
        }
    </script>
</body>
</html>
